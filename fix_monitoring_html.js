const fs = require('fs');

const htmlPath = 'src/app/pages/patients/patient-monitoring/patient-monitoring.html';
const html = fs.readFileSync(htmlPath, 'utf8');

// I will output the whole logic from this file to see it.
console.log(html);
