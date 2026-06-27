import { readFileSync } from 'fs';

const css = readFileSync('d:/Downloads/NKT_insurance/NKT_insurance-main/src/styles.css', 'utf8');
const lines = css.split('\n');

const indices = [];
lines.forEach((line, idx) => {
  if (line.includes('pointer-events')) {
    indices.push(idx);
  }
});

indices.forEach(idx => {
  console.log(`\n--- Line ${idx + 1} ---`);
  const start = Math.max(0, idx - 4);
  const end = Math.min(lines.length - 1, idx + 4);
  for (let i = start; i <= end; i++) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
});
