import sys
import io
import requests
from bs4 import BeautifulSoup
import pandas as pd
import os

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
}

os.makedirs("docs/fetched", exist_ok=True)

# -------------------------------------------------------
# Approach 1: Try IRDAI document download directly
# -------------------------------------------------------
print("=" * 60)
print("Approach 1: IRDAI Document Download")
print("=" * 60)

# The IRDAI document structure uses Liferay CMS
# Documents are stored at /documents/{groupId}/{folderId}/{filename}
doc_attempts = [
    "https://irdai.gov.in/documents/37343/6742666/Handbook+on+Indian+Insurance+Statistics+2022-23.xlsx",
    "https://irdai.gov.in/documents/37343/6742666/IRDAI+Annual+Report+2022-23.xlsx",
    "https://irdai.gov.in/documents/37343/6742666/",
    "https://irdai.gov.in/documents/37343/6742666",
]

for url in doc_attempts:
    try:
        r = requests.get(url, headers=HEADERS, timeout=15, allow_redirects=True)
        ctype = r.headers.get('Content-Type', '')
        print(f"URL: {url[:80]}")
        print(f"  Status: {r.status_code} | Type: {ctype[:50]} | Size: {len(r.content)}")
        if r.status_code == 200 and len(r.content) > 5000 and 'html' not in ctype.lower():
            fname = f"docs/fetched/irdai_doc_{url.split('/')[-1]}"
            with open(fname, 'wb') as f:
                f.write(r.content)
            print(f"  SAVED: {fname}")
    except Exception as e:
        print(f"  Error: {e}")

# -------------------------------------------------------
# Approach 2: Try IRDAI Handbook ZIP
# -------------------------------------------------------
print()
print("=" * 60)
print("Approach 2: IRDAI Handbook ZIP Files")
print("=" * 60)

handbook_urls = [
    "https://irdai.gov.in/documents/37343/39220/Handbook+on+Indian+Insurance+Statistics+2022-23.zip",
    "https://irdai.gov.in/documents/37343/39220/Handbook2022-23.zip",
    "https://irdai.gov.in/documents/37343/39220/Handbook2023-24.zip",
    "https://irdai.gov.in/documents/37343/39220/Handbook+2023-24.zip",
]

for url in handbook_urls:
    try:
        r = requests.get(url, headers=HEADERS, timeout=15, allow_redirects=True)
        ctype = r.headers.get('Content-Type', '')
        print(f"URL: {url[-60:]}")
        print(f"  Status: {r.status_code} | Size: {len(r.content)}")
        if r.status_code == 200 and len(r.content) > 10000:
            fname = f"docs/fetched/handbook_{url.split('/')[-1]}"
            with open(fname, 'wb') as f:
                f.write(r.content)
            print(f"  SAVED: {fname}")
    except Exception as e:
        print(f"  Error: {e}")

# -------------------------------------------------------
# Approach 3: scrape IRDAI reports listing page
# -------------------------------------------------------
print()
print("=" * 60)
print("Approach 3: IRDAI Reports & Statistics listing")
print("=" * 60)

report_pages = [
    "https://irdai.gov.in/web/guest/report?report=annual",
    "https://irdai.gov.in/web/guest/publications?type=handbook",
    "https://irdai.gov.in/web/guest/publications",
    "https://irdai.gov.in/web/guest/annual-report-list",
]

for url in report_pages:
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        print(f"URL: {url}")
        print(f"  Status: {r.status_code} | Size: {len(r.content)}")
        if r.status_code == 200:
            soup = BeautifulSoup(r.text, 'html.parser')
            links = []
            for a in soup.find_all('a', href=True):
                href = a['href']
                txt = a.get_text(strip=True)[:50]
                if any(x in href.lower() for x in ['.xlsx', '.xls', '.zip', '.csv', 'handbook', 'annual']):
                    full = href if href.startswith('http') else 'https://irdai.gov.in' + href
                    links.append((txt, full))
            print(f"  Found {len(links)} relevant links:")
            for t, u in links[:5]:
                print(f"    [{t}] -> {u[:90]}")
    except Exception as e:
        print(f"  Error: {e}")

# -------------------------------------------------------
# Approach 4: Try Dataful direct CSV download
# -------------------------------------------------------
print()
print("=" * 60)
print("Approach 4: Dataful.in direct CSV links")
print("=" * 60)

dataful_csv_urls = [
    "https://cdn.dataful.in/datasets/21059/data.csv",
    "https://cdn.dataful.in/datasets/2816/data.csv",
    "https://storage.googleapis.com/dataful/datasets/21059/data.csv",
    "https://dataful.in/datasets/21059/download/?format=csv",
    "https://dataful.in/download/datasets/21059/?format=csv",
]

for url in dataful_csv_urls:
    try:
        r = requests.get(url, headers=HEADERS, timeout=10, allow_redirects=True)
        ctype = r.headers.get('Content-Type', '')
        print(f"URL: {url[-70:]}")
        print(f"  Status: {r.status_code} | Type: {ctype[:40]} | Size: {len(r.content)}")
        if r.status_code == 200 and len(r.content) > 1000:
            text = r.text
            if 'life_insurer' in text or 'LIC' in text or 'claims' in text.lower():
                print(f"  FOUND CSV DATA!")
                print(f"  Preview: {text[:300]}")
                fname = f"docs/fetched/dataful_{url.split('/')[-2]}.csv"
                with open(fname, 'w', encoding='utf-8') as f:
                    f.write(text)
                print(f"  SAVED: {fname}")
    except Exception as e:
        print(f"  Error: {e}")

print()
print("=" * 60)
print("Done!")
print("=" * 60)
