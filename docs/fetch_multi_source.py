"""
Multi-source Claims Data Finder
Sources: LIC Official, IRDAI Handbook, PolicyBazaar (IRDAI aggregated), 
         Insurance Info Bureau, ET/MoneyControl (republish IRDAI data)
"""
import sys, io, requests, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
from bs4 import BeautifulSoup
import re

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
}

def get(url, timeout=20):
    try:
        r = requests.get(url, headers=HEADERS, timeout=timeout, allow_redirects=True)
        return r
    except Exception as e:
        print(f"  ERR: {e}")
        return None

def extract_numbers(text):
    """Find percentages and large numbers near claim keywords."""
    results = []
    lines = text.split('\n')
    for i, line in enumerate(lines):
        if any(k in line.lower() for k in ['claim','settlement','ratio','csr','death','paid']):
            # Get context (2 lines before and after)
            ctx = '\n'.join(lines[max(0,i-1):i+3])
            # Find percentages
            pcts = re.findall(r'\b(9[0-9]\.\d{1,2})\s*%', ctx)
            nums = re.findall(r'\b([0-9,]{4,})\b', ctx)
            if pcts or nums:
                results.append({'line': line.strip()[:100], 'pcts': pcts, 'nums': nums[:3]})
    return results

os.makedirs("docs/fetched", exist_ok=True)

# ================================================================
# SOURCE 1: LIC Official Website - Annual Reports
# ================================================================
print("=" * 65)
print("SOURCE 1: LIC Official Website (licindia.in)")
print("=" * 65)

lic_urls = [
    "https://licindia.in/en/annual-reports",
    "https://licindia.in/annual-report",
    "https://licindia.in/lic-annual-report",
    "https://licindia.in/Corporate/Disclosure/Annual-Reports",
]
for url in lic_urls:
    r = get(url)
    if r and r.status_code == 200 and len(r.content) > 10000:
        soup = BeautifulSoup(r.text, 'html.parser')
        links = [(a.get_text(strip=True)[:60], a['href']) for a in soup.find_all('a', href=True) 
                 if a.get_text(strip=True) and any(x in (a.get_text(strip=True)+a['href']).lower() 
                 for x in ['2022','2023','2024','annual','report','pdf','xlsx'])]
        if links:
            print(f"  {url}")
            for t,u in links[:8]:
                full = u if u.startswith('http') else 'https://licindia.in' + u
                print(f"    [{t}] -> {full[:90]}")
            break
    print(f"  {url}: {'OK' if r else 'FAILED'} {r.status_code if r else ''} size={len(r.content) if r else 0}")

# ================================================================
# SOURCE 2: IRDAI Handbook (has ALL years in Excel)
# ================================================================
print("\n" + "=" * 65)
print("SOURCE 2: IRDAI Handbook (Annual Excel Data)")
print("=" * 65)

handbook_urls = [
    "https://irdai.gov.in/en/handbooks",
    "https://irdai.gov.in/web/guest/handbooks",
]
for url in handbook_urls:
    r = get(url)
    if r and r.status_code == 200:
        soup = BeautifulSoup(r.text, 'html.parser')
        links = [(a.get_text(strip=True)[:70], 
                  a['href'] if a['href'].startswith('http') else 'https://irdai.gov.in' + a['href'])
                 for a in soup.find_all('a', href=True)
                 if any(x in (a.get_text(strip=True)+a['href']).lower() 
                 for x in ['.xlsx','.xls','.zip','.csv','handbook','2022','2023','2024'])]
        if links:
            print(f"  Found {len(links)} links:")
            for t,u in links[:12]:
                print(f"  [{t[:65]}] -> {u[:100]}")
            break

# ================================================================
# SOURCE 3: IRDAI Annual Report 2023-24 (recently published)
# ================================================================
print("\n" + "=" * 65)
print("SOURCE 3: IRDAI Annual Report 2023-24")
print("=" * 65)

ar_urls = [
    "https://irdai.gov.in/en/annual-report",
    "https://irdai.gov.in/documents/37343/0/IRDAI+Annual+Report+2023-24.pdf",
    "https://irdai.gov.in/annual-report-2023-24",
    "https://irdai.gov.in/en/annual-report-2023-24",
    "https://irdai.gov.in/en/irdai-annual-report",
]
for url in ar_urls:
    r = get(url)
    if r and r.status_code == 200:
        ctype = r.headers.get('Content-Type', '')
        print(f"  {url}")
        print(f"    Status: {r.status_code} | Type: {ctype[:40]} | Size: {len(r.content):,}")
        if 'pdf' in ctype.lower() and len(r.content) > 100000:
            fname = "docs/fetched/irdai_ar_2023_24.pdf"
            with open(fname, 'wb') as f:
                f.write(r.content)
            print(f"    >> Saved PDF: {fname}")
        soup = BeautifulSoup(r.text, 'html.parser')
        dl_links = [(a.get_text(strip=True)[:60], a['href']) for a in soup.find_all('a', href=True)
                    if any(x in (a.get_text(strip=True)+a['href']).lower() 
                    for x in ['2023-24','2024','annual','report','pdf','xlsx','zip'])]
        for t,u in dl_links[:8]:
            full = u if u.startswith('http') else 'https://irdai.gov.in' + u
            print(f"    [{t}] -> {full[:90]}")

# ================================================================
# SOURCE 4: PolicyBazaar / InsuranceDekho (aggregate IRDAI data)
# ================================================================
print("\n" + "=" * 65)
print("SOURCE 4: Trusted Aggregators (IRDAI-published data)")
print("=" * 65)

agg_urls = [
    ("PolicyBazaar", "https://www.policybazaar.com/life-insurance/term-insurance/articles/claim-settlement-ratio-of-life-insurance-companies/"),
    ("BankBazaar", "https://www.bankbazaar.com/insurance/claim-settlement-ratio-of-life-insurance-companies.html"),
    ("InsuranceDekho", "https://www.insurancedekho.com/life-insurance/claim-settlement-ratio"),
    ("ET Money", "https://www.etmoney.com/insurance/life-insurance/claim-settlement-ratio"),
    ("MoneyControl", "https://www.moneycontrol.com/insurance/claim-settlement-ratio"),
]

for name, url in agg_urls:
    r = get(url, timeout=15)
    if r and r.status_code == 200 and len(r.content) > 30000:
        soup = BeautifulSoup(r.text, 'html.parser')
        text = soup.get_text(separator='\n', strip=True)
        
        # Find tables
        tables = soup.find_all('table')
        print(f"\n  {name}: {len(tables)} tables found | Size: {len(r.content):,}")
        
        for tbl in tables[:2]:
            rows = tbl.find_all('tr')
            print(f"    Table ({len(rows)} rows):")
            for row in rows[:8]:
                cells = [td.get_text(strip=True)[:20] for td in row.find_all(['td','th'])]
                if cells and any(c for c in cells):
                    print(f"      {cells[:6]}")
        
        # Find year mentions
        years_found = re.findall(r'202[2-6]-?(?:23|24|25|26)', text)
        print(f"    Years mentioned: {sorted(set(years_found))}")
        
        # Find LIC CSR mentions
        lic_ctx = []
        for i, line in enumerate(text.split('\n')):
            if 'lic' in line.lower() and any(c.isdigit() for c in line):
                lic_ctx.append(line.strip()[:80])
        print(f"    LIC data lines: {lic_ctx[:5]}")
    else:
        print(f"\n  {name}: Failed/Small ({r.status_code if r else 'ERR'} | {len(r.content) if r else 0} bytes)")

# ================================================================
# SOURCE 5: LIC Annual Reports direct PDF
# ================================================================
print("\n" + "=" * 65)
print("SOURCE 5: LIC Annual Report Data (licindia.in)")
print("=" * 65)

lic_report_urls = [
    "https://licindia.in/LIC-Data/Annual-Report",
    "https://licindia.in/web/guest/annual-report",
    "https://licindia.in/portal/web/guest/lic-annual-report",
    "https://licindia.in/Content/Reports",
]
for url in lic_report_urls:
    r = get(url, timeout=15)
    if r and r.status_code == 200 and len(r.content) > 20000:
        print(f"  URL: {url} | Size: {len(r.content):,}")
        soup = BeautifulSoup(r.text, 'html.parser')
        for a in soup.find_all('a', href=True)[:30]:
            txt = a.get_text(strip=True)
            href = a['href']
            if txt and any(x in (txt+href).lower() for x in ['2023','2024','annual','report','pdf']):
                full = href if href.startswith('http') else 'https://licindia.in' + href
                print(f"    [{txt[:50]}] -> {full[:90]}")
        break
    print(f"  {url}: {r.status_code if r else 'ERR'}")

print("\n" + "=" * 65)
print("SEARCH COMPLETE")
print("=" * 65)
