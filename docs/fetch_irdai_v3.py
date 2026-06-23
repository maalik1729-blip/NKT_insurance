"""
Smart IRDAI Data Fetcher v3
- Crawls IRDAI website to find actual download links
- Tries multiple known URL patterns
- Saves whatever it finds
"""
import sys, io, requests, re, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
from bs4 import BeautifulSoup

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'text/html,application/xhtml+xml,*/*;q=0.9',
    'Accept-Language': 'en-US,en;q=0.5',
    'Referer': 'https://irdai.gov.in',
}

os.makedirs("docs/fetched", exist_ok=True)

def get(url, timeout=20):
    try:
        r = requests.get(url, headers=HEADERS, timeout=timeout, allow_redirects=True)
        return r
    except Exception as e:
        print(f"  ERROR: {e}")
        return None

def find_links(html, base="https://irdai.gov.in"):
    """Find all relevant download links from HTML"""
    soup = BeautifulSoup(html, 'html.parser')
    found = []
    keywords = ['handbook', 'annual', 'statistic', 'claim', 'death', 'life', 
                'insurance', 'report', '.xlsx', '.xls', '.zip', '.csv', '.pdf']
    for a in soup.find_all('a', href=True):
        href = a['href']
        txt  = a.get_text(strip=True)
        if any(k in href.lower() or k in txt.lower() for k in keywords):
            full = href if href.startswith('http') else base + href
            found.append({'text': txt[:80], 'url': full})
    return found

# =========================================================
# Step 1: Known IRDAI pages to crawl
# =========================================================
print("=" * 60)
print("STEP 1: Crawling IRDAI Known Pages")
print("=" * 60)

pages_to_try = [
    "https://irdai.gov.in/web/guest/handbook",
    "https://irdai.gov.in/web/guest/handbook-on-indian-insurance-statistics",
    "https://irdai.gov.in/web/guest/annual-report",
    "https://irdai.gov.in/web/guest/report-and-statistics",
    "https://irdai.gov.in/web/guest/statistics",
    "https://irdai.gov.in/web/guest/life-insurance",
    "https://irdai.gov.in/web/guest/claim-data",
    "https://irdai.gov.in/web/guest/data",
    "https://irdai.gov.in/web/guest/publications1",
    "https://irdai.gov.in/web/guest/reports",
]

all_links = {}
for url in pages_to_try:
    r = get(url)
    if r and r.status_code == 200 and len(r.content) > 5000:
        links = find_links(r.text)
        if links:
            print(f"\nPage: {url}")
            for l in links[:8]:
                print(f"  [{l['text'][:50]}] -> {l['url'][:90]}")
                all_links[l['url']] = l['text']

# =========================================================
# Step 2: Try IRDAI search for handbook
# =========================================================
print("\n" + "=" * 60)
print("STEP 2: IRDAI Search API")
print("=" * 60)

search_urls = [
    "https://irdai.gov.in/web/guest/search-result?q=handbook+insurance+statistics",
    "https://irdai.gov.in/web/guest/home?_com_liferay_portal_search_web_portlet_SearchPortlet_keywords=handbook",
    "https://irdai.gov.in/c/search?q=handbook+insurance+statistics+2023",
]

for url in search_urls:
    r = get(url)
    if r and r.status_code == 200:
        links = find_links(r.text)
        if links:
            print(f"\nSearch: {url[-60:]}")
            for l in links[:5]:
                print(f"  [{l['text'][:50]}] -> {l['url'][:90]}")
                all_links[l['url']] = l['text']

# =========================================================
# Step 3: Try known document IDs in IRDAI Liferay CMS
# =========================================================
print("\n" + "=" * 60)
print("STEP 3: Trying IRDAI Document IDs")
print("=" * 60)

# IRDAI uses Liferay CMS. Documents are accessible via /documents/{siteId}/{uuid}
# The groupId for IRDAI is 37343
# Try different known document UUIDs for handbooks

# Try fetching the document listing for handbook folder
folder_urls = [
    # Try different folder IDs
    "https://irdai.gov.in/documents/37343/39220",
    "https://irdai.gov.in/documents/37343/39221", 
    "https://irdai.gov.in/documents/37343/100000",
    "https://irdai.gov.in/documents/37343/0",
    # Liferay WebDAV
    "https://irdai.gov.in/webdav/guest/document_library/handbook",
    "https://irdai.gov.in/api/jsonws/dlapp/get-file-entries/repository-id/37343/folder-id/0",
]

for url in folder_urls:
    r = get(url)
    if r and r.status_code == 200 and len(r.content) > 500:
        ctype = r.headers.get('Content-Type', '')
        print(f"\nURL: {url[-60:]}")
        print(f"  Status: {r.status_code} | Type: {ctype[:40]} | Size: {len(r.content)}")
        if 'json' in ctype.lower():
            print(f"  JSON Preview: {r.text[:300]}")
        elif 'xml' in ctype.lower() or 'html' not in ctype.lower():
            print(f"  Non-HTML content found!")
            fname = f"docs/fetched/irdai_folder_{url.split('/')[-1]}.dat"
            with open(fname, 'wb') as f:
                f.write(r.content)
            print(f"  Saved: {fname}")

# =========================================================
# Step 4: Try Liferay JSON API for documents
# =========================================================
print("\n" + "=" * 60)
print("STEP 4: Liferay JSON API")
print("=" * 60)

liferay_apis = [
    "https://irdai.gov.in/api/jsonws/dlapp/get-file-entries?repositoryId=37343&folderId=0&start=0&end=100",
    "https://irdai.gov.in/api/jsonws/journal.journalarticle/get-articles?groupId=37343&start=0&end=20",
    "https://irdai.gov.in/api/jsonws/document_library.dlfileentry/get-file-entries/group-id/37343/folder-id/0/start/0/end/50",
]

for url in liferay_apis:
    r = get(url)
    if r:
        print(f"\nAPI: {url[-70:]}")
        print(f"  Status: {r.status_code} | Size: {len(r.content)}")
        if r.status_code == 200:
            print(f"  Response: {r.text[:400]}")

# =========================================================
# Step 5: Check what's currently open in browser (document 6742666)
# Then look for related documents nearby
# =========================================================
print("\n" + "=" * 60)
print("STEP 5: Checking nearby document IDs on IRDAI")
print("=" * 60)

# The user had documentId=6742666 open. Let's check nearby IDs
base_id = 6742666
for offset in [0, -100, -200, -500, -1000, -2000, -5000, +100, +200]:
    doc_id = base_id + offset
    url = f"https://irdai.gov.in/document-detail?documentId={doc_id}"
    r = get(url, timeout=10)
    if r and r.status_code == 200:
        soup = BeautifulSoup(r.text, 'html.parser')
        # Get page title or heading
        title = soup.find('h1') or soup.find('h2') or soup.find('title')
        title_text = title.get_text(strip=True) if title else 'N/A'
        # Find download links
        dl_links = []
        for a in soup.find_all('a', href=True):
            href = a['href']
            if any(x in href.lower() for x in ['.pdf', '.xlsx', '.zip', '.xls', '.csv']):
                full = href if href.startswith('http') else 'https://irdai.gov.in' + href
                dl_links.append(full)
        if dl_links or (title_text and 'Document' not in title_text and len(title_text) > 5):
            print(f"\nDoc ID {doc_id}: {title_text[:60]}")
            for dl in dl_links[:3]:
                print(f"  DOWNLOAD: {dl[:100]}")
                all_links[dl] = f"DocID-{doc_id}"

# =========================================================
# Final Summary
# =========================================================
print("\n" + "=" * 60)
print("FINAL SUMMARY - All Download Links Found:")
print("=" * 60)
if all_links:
    for url, text in all_links.items():
        if any(x in url.lower() for x in ['.pdf', '.xlsx', '.xls', '.zip', '.csv']):
            print(f"  [{text[:40]}] -> {url[:100]}")
else:
    print("  No direct download links found.")
    print()
    print("  CONCLUSION: IRDAI website uses JavaScript rendering.")
    print("  Data is not accessible via direct HTTP requests.")
    print("  Browser automation (Selenium) or manual download required.")
