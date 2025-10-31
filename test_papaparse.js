import Papa from 'papaparse';
import fs from 'fs';

const filePath = './examples/test_con_errores.csv';
const csvData = fs.readFileSync(filePath, 'utf8');

const result = Papa.parse(csvData, {
    header: false, // Parse as array of arrays
    skipEmptyLines: true,
    dynamicTyping: true
});

console.log('Parsed rows:');
result.data.forEach((row, idx) => {
    console.log(`Row ${idx + 1} [${row.length} fields]:`, row);
});

if (result.errors && result.errors.length > 0) {
    console.error('Errors:', result.errors);
} else {
    console.log('No parse errors detected.');
}
