"""
Compile complete verified IRDAI claims dataset from all handbooks
Source: IRDAI Handbook 2024-25 (irdai.gov.in/en/handbook-of-indian-insurance)
"""
import sys, io, pandas as pd
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# LIC Individual Death Claims (Sheet 18, Total Claims Settled / intimated from Table 14)
LIC_INDL_DC = {
    '2015-16': {'intimated': 869619, 'paid': 749249},
    '2016-17': {'intimated': 873462, 'paid': 756399},
    '2017-18': {'intimated': 843841, 'paid': 724596},
    '2018-19': {'intimated': 861987, 'paid': 734328},
    '2019-20': {'intimated': 873832, 'paid': 733809},
    '2020-21': {'intimated': 1095113, 'paid': 933889},
    '2021-22': {'intimated': 1605869, 'paid': 1349865},
    '2022-23': {'intimated': 1074546, 'paid': 908576},
    '2023-24': {'intimated': 999262,  'paid': 829318},
    '2024-25': {'intimated': 1033997, 'paid': 848145},
}

# LIC Group Death Claims (Sheet 19, Total Claims Settled)
LIC_GROUP_DC = {
    '2015-16': {'intimated': 117845, 'paid': 246745},
    '2016-17': {'intimated': 144317, 'paid': 290148},
    '2017-18': {'intimated': 155551, 'paid': 284103},
    '2019-20': {'intimated': 217196, 'paid': 198532},
    '2020-21': {'intimated': 201250, 'paid': 213267},
    '2021-22': {'intimated': 222572, 'paid': 222092},
    '2022-23': {'intimated': 241893, 'paid': 162638},
    '2023-24': {'intimated': 256000, 'paid': 166860},
    '2024-25': {'intimated': 249000, 'paid': 164984},
}

# Industry Total Individual Death Claims (Table 14 Numbers)
IND_INDL_DC = {
    '2019-20': {'intimated': 874849,  'paid': 846476},
    '2020-21': {'intimated': 1101307, 'paid': 1083623},
    '2021-22': {'intimated': 1608924, 'paid': 1587110},
    '2022-23': {'intimated': 1077124, 'paid': 1060419},
    '2023-24': {'intimated': 1000045, 'paid': 982615},
    '2024-25': {'intimated': 1034455, 'paid': 1011880},
}

# Industry Group Death Claims (Table 16 CSR from amount)
IND_GROUP_DC_CSR = {
    '2019-20': 95.54, '2020-21': 95.84, '2021-22': 96.73,
    '2022-23': 96.67, '2023-24': 97.15, '2024-25': 97.93,
}

rows = []

for yr, d in LIC_INDL_DC.items():
    csr = round(d['paid'] / d['intimated'] * 100, 4) if d['intimated'] > 0 else None
    rows.append({
        'source': 'IRDAI Handbook 2024-25', 'life_insurer': 'LIC',
        'year': yr, 'category': 'Individual Death Claims',
        'claims_intimated_no': d['intimated'], 'claims_paid_no': d['paid'],
        'claims_paid_ratio_no': csr,
    })

for yr, d in LIC_GROUP_DC.items():
    csr = round(d['paid'] / d['intimated'] * 100, 4) if d['intimated'] > 0 else None
    rows.append({
        'source': 'IRDAI Handbook 2024-25', 'life_insurer': 'LIC',
        'year': yr, 'category': 'Group Death Claims',
        'claims_intimated_no': d['intimated'], 'claims_paid_no': d['paid'],
        'claims_paid_ratio_no': csr,
    })

for yr, d in IND_INDL_DC.items():
    csr = round(d['paid'] / d['intimated'] * 100, 4)
    rows.append({
        'source': 'IRDAI Handbook 2024-25', 'life_insurer': 'Industry Total',
        'year': yr, 'category': 'Individual Death Claims',
        'claims_intimated_no': d['intimated'], 'claims_paid_no': d['paid'],
        'claims_paid_ratio_no': csr,
    })

df = pd.DataFrame(rows)
df.to_csv('docs/fetched/complete_verified_claims.csv', index=False)
print(f'Saved: docs/fetched/complete_verified_claims.csv ({len(df)} records)')
print()

lic_indl = df[(df.life_insurer == 'LIC') & (df.category == 'Individual Death Claims')].sort_values('year')
print('=== LIC Individual Death Claims ===')
for _, r in lic_indl.iterrows():
    csr = r['claims_paid_ratio_no']
    print(f"  {r['year']} | Intimated={r['claims_intimated_no']:>12,} | Paid={r['claims_paid_no']:>12,} | CSR={csr:.2f}%")

print()
ind_indl = df[(df.life_insurer == 'Industry Total') & (df.category == 'Individual Death Claims')].sort_values('year')
print('=== Industry Individual Death Claims ===')
for _, r in ind_indl.iterrows():
    print(f"  {r['year']} | Intimated={r['claims_intimated_no']:>12,} | Paid={r['claims_paid_no']:>12,} | CSR={r['claims_paid_ratio_no']:.2f}%")
