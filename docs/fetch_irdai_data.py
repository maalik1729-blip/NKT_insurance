"""
IRDAI Life Insurance Death Claims Data Fetcher
Fetches Individual & Group Death Claims data from IRDAI website
and saves in same CSV format as existing dataset.
"""

import requests
import pandas as pd
import json
import time
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
}

# -------------------------------------------------------
# IRDAI API endpoints to try
# -------------------------------------------------------
IRDAI_ENDPOINTS = [
    "https://irdai.gov.in/api/v1/life-insurance/death-claims",
    "https://irdai.gov.in/web/guest/individual-death-claims",
    "https://irdai.gov.in/web/guest/group-death-claims",
]

# -------------------------------------------------------
# Document IDs found on IRDAI for annual reports
# -------------------------------------------------------
DOCUMENT_IDS = {
    "2022-23": "6742666",
    "2023-24": "7200000",  # approximate - will try
}


def try_irdai_api():
    """Try to fetch data from IRDAI REST API endpoints"""
    print("🔍 Trying IRDAI API endpoints...")
    
    for url in IRDAI_ENDPOINTS:
        try:
            print(f"  → Trying: {url}")
            resp = requests.get(url, headers=HEADERS, timeout=15)
            print(f"  Status: {resp.status_code}")
            if resp.status_code == 200:
                try:
                    data = resp.json()
                    print(f"  ✅ JSON data found! Keys: {list(data.keys())[:5]}")
                    return data
                except:
                    print(f"  ⚠️ Not JSON, content length: {len(resp.text)}")
        except Exception as e:
            print(f"  ❌ Error: {e}")
    return None


def try_document_detail(doc_id, year):
    """Try to get document detail page and find download links"""
    url = f"https://irdai.gov.in/document-detail?documentId={doc_id}"
    print(f"\n🔍 Fetching document {doc_id} for year {year}...")
    
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        print(f"  Status: {resp.status_code}, Size: {len(resp.text)} bytes")
        
        soup = BeautifulSoup(resp.text, "html.parser")
        
        # Find all download links
        links = soup.find_all("a", href=True)
        download_links = []
        for link in links:
            href = link.get("href", "")
            text = link.get_text(strip=True)
            if any(ext in href.lower() for ext in [".pdf", ".xlsx", ".xls", ".csv", ".zip"]):
                full_url = href if href.startswith("http") else f"https://irdai.gov.in{href}"
                download_links.append({"text": text, "url": full_url})
                print(f"  📄 Found: {text[:60]} → {full_url[:80]}")
        
        return download_links
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return []


def try_dataful_api():
    """Try Dataful API for the dataset"""
    print("\n🔍 Trying Dataful API...")
    
    # Dataful dataset IDs for IRDAI death claims
    dataset_ids = [21059, 2816, 2817, 2818]
    
    for dataset_id in dataset_ids:
        try:
            # Try API endpoint
            api_url = f"https://dataful.in/api/v1/datasets/{dataset_id}/"
            print(f"  → Trying dataset {dataset_id}: {api_url}")
            resp = requests.get(api_url, headers=HEADERS, timeout=15)
            print(f"  Status: {resp.status_code}")
            
            if resp.status_code == 200:
                data = resp.json()
                print(f"  ✅ Found! Dataset: {data.get('title', 'N/A')}")
                
                # Try to get CSV download URL
                files = data.get("files", [])
                for f in files:
                    if f.get("format", "").upper() == "CSV":
                        csv_url = f.get("url", "")
                        print(f"  📥 CSV URL: {csv_url}")
                        return csv_url
        except Exception as e:
            print(f"  ❌ Error for {dataset_id}: {e}")
    
    return None


def download_csv(url):
    """Download CSV file from URL"""
    print(f"\n📥 Downloading CSV from: {url}")
    try:
        resp = requests.get(url, headers=HEADERS, timeout=30)
        if resp.status_code == 200:
            content = resp.text
            print(f"  ✅ Downloaded! Size: {len(content)} bytes")
            print(f"  First 300 chars: {content[:300]}")
            return content
        else:
            print(f"  ❌ Status: {resp.status_code}")
    except Exception as e:
        print(f"  ❌ Error: {e}")
    return None


def try_licindia_data():
    """Try LIC India website for claims data"""
    print("\n🔍 Trying LIC India website...")
    
    urls = [
        "https://licindia.in/web/guest/claim-settlement-ratio",
        "https://licindia.in/web/guest/annual-report",
        "https://licindia.in/web/guest/investor-relations",
    ]
    
    for url in urls:
        try:
            print(f"  → Trying: {url}")
            resp = requests.get(url, headers=HEADERS, timeout=15)
            print(f"  Status: {resp.status_code}")
            if resp.status_code == 200:
                soup = BeautifulSoup(resp.text, "html.parser")
                text = soup.get_text()
                # Look for claim data patterns
                if "98" in text and ("claim" in text.lower() or "settlement" in text.lower()):
                    print(f"  ✅ Found relevant content!")
                    # Find tables
                    tables = soup.find_all("table")
                    print(f"  Tables found: {len(tables)}")
                    for i, table in enumerate(tables[:3]):
                        print(f"\n  Table {i+1}:")
                        rows = table.find_all("tr")
                        for row in rows[:5]:
                            cells = [td.get_text(strip=True) for td in row.find_all(["td", "th"])]
                            if cells:
                                print(f"    {cells}")
        except Exception as e:
            print(f"  ❌ Error: {e}")


def main():
    print("=" * 60)
    print("IRDAI Life Insurance Claims Data Fetcher")
    print("=" * 60)
    
    # Step 1: Try IRDAI API
    api_data = try_irdai_api()
    
    # Step 2: Try document detail pages
    all_links = []
    for year, doc_id in DOCUMENT_IDS.items():
        links = try_document_detail(doc_id, year)
        all_links.extend(links)
    
    # Step 3: Try Dataful API
    csv_url = try_dataful_api()
    if csv_url:
        csv_content = download_csv(csv_url)
        if csv_content:
            with open("docs/fetched_irdai_data.csv", "w", encoding="utf-8") as f:
                f.write(csv_content)
            print("\n✅ Saved to docs/fetched_irdai_data.csv")
    
    # Step 4: Try LIC India
    try_licindia_data()
    
    print("\n" + "=" * 60)
    print("Summary:")
    print(f"  Download links found: {len(all_links)}")
    for link in all_links[:10]:
        print(f"  - {link['text'][:50]} → {link['url'][:70]}")
    print("=" * 60)


if __name__ == "__main__":
    main()
