const fs = require('fs');
const file = 'src/app/pages/patients/patient-dossier/patient-dossier.component.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/selectOption\(q: any, opt: string\) \{[\s\S]*?(?=\n  showHistoryModal)/, 
`selectOption(q: any, opt: string) {
    if (!this.isEditMode) return;
    q.value = opt;
    this.markModified(q);
  }

  isOptionSelected(q: any, optLabel: string): boolean {
    if (Array.isArray(q.value)) {
      return q.value.includes(optLabel);
    }
    return q.value === optLabel;
  }
`);

code = code.replace(/undoChange\(q: any\) \{[\s\S]*?(?=\n\s*\})/, 
`undoChange(q: any) {
    q.value = Array.isArray(q.originalValue) ? [...q.originalValue] : q.originalValue;
    q.modified = false;
  }`);

fs.writeFileSync(file, code);
