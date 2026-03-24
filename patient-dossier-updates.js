const fs = require('fs');
const tsPath = 'src/app/pages/patients/patient-dossier/patient-dossier.component.ts';
let ts = fs.readFileSync(tsPath, 'utf8');

// 1. Initialiser originalValue pour chaque question si manquant
ts = ts.replace(/this\.originalQuestions = JSON\.parse.*?;/g, 
`this.originalQuestions = JSON.parse(JSON.stringify(this.questions));
    this.questions.forEach(q => {
      if(q.originalValue === undefined) q.originalValue = q.value;
      q.modifiedBy = '';
      q.modifiedAt = '';
    });`);

// 2. new instance behaviour
ts = ts.replace(/createNewInstance\(\) \{[\s\S]*?this\.isEditMode = true;\n  \}/, 
`createNewInstance() {
    const newId = \`inst\${this.instances.length + 1}\`;
    const newInst = {
      id: newId,
      date: 'Aujourd\\'hui',
      followUp: 'Nouveau',
      progress: 0
    };
    this.instances.unshift(newInst);
    
    // reset all answers
    this.questions.forEach(q => {
      q.originalValue = '';
      q.value = '';
      q.modified = false;
      q.modifiedBy = '';
      q.modifiedAt = '';
    });
    
    this.selectInstance(newInst);
    this.isEditMode = true;
  }`);

// 3. selectOption missing values
ts = ts.replace(/selectOption\(q: any, opt: string\) \{[\s\S]*?q\.modified = q\.value !== q\.originalValue;\n  \}/,
`selectOption(q: any, opt: string) {
    if (!this.isEditMode) return;
    if (q.originalValue === undefined) q.originalValue = q.value;
    q.value = opt;
    q.modified = q.value !== q.originalValue;
    if (q.modified) {
      q.modifiedBy = 'Dr. Médecin';
      q.modifiedAt = new Date().toLocaleDateString('fr-FR');
    }
  }`);

// 4. Modal state additions
if(!ts.includes("showHistoryModal")) {
  ts = ts.replace(/undoChange\(q: any\) \{/g, 
  `  showHistoryModal = false;
  selectedHistoryQuestion: any = null;

  showHistory(q: any) {
    this.selectedHistoryQuestion = q;
    this.showHistoryModal = true;
  }
  
  closeHistory() {
    this.showHistoryModal = false;
    this.selectedHistoryQuestion = null;
  }

  downloadDossier() {
    window.open('assets/Dossierpatient.pdf', '_blank');
  }

  undoChange(q: any) {`);
}

// 5. save
fs.writeFileSync(tsPath, ts);
console.log("TS patched for Dossier");
