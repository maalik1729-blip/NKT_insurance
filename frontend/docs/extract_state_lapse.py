import sys, io, openpyxl
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

fpath = 'docs/fetched/handbook/extracted_2024-25/Publication of Handbook 2024-25 on IRDAI Website/Part I.xlsx'
wb = openpyxl.load_workbook(fpath, data_only=True, read_only=True)

for sname in ['5', '27']:
    ws = wb[sname]
    rows = list(ws.iter_rows(values_only=True))
    title = str(rows[0][0]) if rows else ''
    print(f'=== Sheet [{sname}] {title[:60]} ===')
    for i, row in enumerate(rows[:45]):
        clean = [str(c)[:20] if c is not None else '' for c in row[:10]]
        if any(c.strip() for c in clean):
            print(f'  R{i+1:2}: {clean}')
    print()
