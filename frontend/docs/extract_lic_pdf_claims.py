"""
Extract ALL claim types from LIC Annual Report PDFs
Targets: Maturity Claims, Survival Benefit, Death Claims, Annuity
"""
import sys, io, os, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import pdfplumber, pandas as pd

PDF_FILES = {
    '2023-24': 'docs/fetched/lic_reports/LIC_AR_2023-24.pdf',
    '2022-23': 'docs/fetched/lic_reports/LIC_AR_2022-23.pdf',
}

# Keywords to find relevant pages
CLAIM_KEYWORDS = [
    'maturity', 'survival benefit', 'death claim', 'annuity', 'settlement of claims',
    'claims paid', 'benefits paid', 'form l-39', 'form l-7',
    'individual claims', 'group claims', 'claim settlement'
]

all_extracted = []

for yr, fpath in PDF_FILES.items():
    if not os.path.exists(fpath):
        print(f'File not found: {fpath}')
        continue

    print(f'\n{"="*65}')
    print(f'Processing: LIC Annual Report {yr}')
    print(f'{"="*65}')

    try:
        with pdfplumber.open(fpath) as pdf:
            print(f'Total pages: {len(pdf.pages)}')

            # Find pages with claims data
            claim_pages = []
            for i, page in enumerate(pdf.pages):
                try:
                    text = page.extract_text() or ''
                    text_lower = text.lower()
                    if any(kw in text_lower for kw in CLAIM_KEYWORDS):
                        # Check for numeric data too
                        has_numbers = bool(re.search(r'\d{4,}', text))
                        if has_numbers:
                            claim_pages.append((i + 1, text[:200].replace('\n', ' ')))
                except:
                    pass

            print(f'Pages with claim keywords: {len(claim_pages)}')
            for pg, preview in claim_pages[:20]:
                print(f'  Page {pg:4}: {preview[:80]}')

            # Now extract tables from those pages
            print(f'\nExtracting tables from claim pages...')
            for pg_num, _ in claim_pages[:30]:
                page = pdf.pages[pg_num - 1]
                text = page.extract_text() or ''
                text_lower = text.lower()

                # Identify what this page is about
                page_type = None
                if 'maturity' in text_lower and 'claim' in text_lower:
                    page_type = 'Individual Maturity Claims'
                elif 'survival benefit' in text_lower:
                    page_type = 'Individual Survival Benefit Claims'
                elif 'death claim' in text_lower or 'individual death' in text_lower:
                    page_type = 'Individual Death Claims'
                elif 'annuity' in text_lower and 'paid' in text_lower:
                    page_type = 'Annuity/Pension Claims'
                elif 'group' in text_lower and 'claim' in text_lower:
                    page_type = 'Group Death Claims'
                elif 'benefits paid' in text_lower or 'form l' in text_lower:
                    page_type = 'Benefits Summary'

                if not page_type:
                    continue

                print(f'\n  Page {pg_num} [{page_type}]:')
                # Show key lines
                for line in text.split('\n')[:15]:
                    if re.search(r'\d{3,}', line):
                        print(f'    {line[:90]}')

                # Try table extraction
                tables = page.extract_tables()
                for ti, tbl in enumerate(tables[:3]):
                    if not tbl or len(tbl) < 2:
                        continue
                    print(f'  Table {ti+1} ({len(tbl)} rows):')
                    for row in tbl[:8]:
                        clean = [str(c)[:18] if c else '' for c in (row or [])[:8]]
                        if any(c.strip() for c in clean):
                            print(f'    {clean}')

    except Exception as e:
        print(f'Error: {e}')
        import traceback
        traceback.print_exc()

print('\nDone.')
