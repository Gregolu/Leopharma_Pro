const fs = require('fs');

const tsPath2 = 'src/app/pages/patients/patient-protocol/patient-protocol.component.ts';
let pTS = fs.readFileSync(tsPath2, 'utf8');
pTS = pTS.replace(/imports: \[CommonModule, FormsModule\]/, 'imports: [CommonModule, FormsModule, StudyModalComponent]');
fs.writeFileSync(tsPath2, pTS);

console.log('Fixed imports in Protocol TS');
