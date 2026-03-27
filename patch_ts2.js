const fs = require('fs');
const content = fs.readFileSync('src/app/pages/patients/patient-dossier/patient-dossier.component.ts', 'utf8');

const target = `  undoChange(q: any) {
    q.value = Array.isArray(q.originalValue) ? [...q.originalValue] : q.originalValue;
    q.modified = false;
  }
  }

}`;

const replacement = `  undoChange(q: any) {
    q.value = Array.isArray(q.originalValue) ? [...q.originalValue] : q.originalValue;
    q.modified = false;
  }

  markModified(q: any) {
    if (q.value !== q.originalValue) {
      q.modified = true;
      q.modifiedBy = 'Moi même (Connecté)';
      q.modifiedAt = new Date().toLocaleDateString('fr-FR');
    } else {
      q.modified = false;
    }
  }

  // ==== DONNÉES SPÉCIFIQUES POUR "État de santé général de votre main" ====
  q1Data: any = {
    q1: null,
    q2_locations: [],
    q2_main: null,
    q3: null,
    q4: null,
    q5: null,
    q6_date: '',
    q7_stepper: 0,
    q8: null,
    q9: null,
    q10: null,
    q11: []
  };

  setQ1Data(field: string, value: any) {
    if (!this.isEditMode) return;
    this.q1Data[field] = value;
  }

  toggleQ1Multi(field: string, value: string) {
    if (!this.isEditMode) return;
    const arr = this.q1Data[field];
    const idx = arr.indexOf(value);
    if (idx > -1) arr.splice(idx, 1);
    else arr.push(value);
  }

  changeStepper(delta: number) {
    if (!this.isEditMode) return;
    let n = this.q1Data.q7_stepper + delta;
    if (n < 0) n = 0;
    this.q1Data.q7_stepper = n;
  }
}
`;

if (content.includes("undoChange")) {
   let fixed = content.replace(target, replacement);
   fs.writeFileSync('src/app/pages/patients/patient-dossier/patient-dossier.component.ts', fixed);
   console.log('patched');
}
