const fs = require('fs');
const tsPath = 'src/app/pages/patients/patient-detail/patient-detail.component.ts';
let ts = fs.readFileSync(tsPath, 'utf8');

// Supprimer Discussion, renommer Rapport en Dossier
ts = ts.replace(/tabs = \['Résumé', 'Monitoring', 'Suivi protocole', 'Rapport patient', 'Discussion'\];/g, "tabs = ['Résumé', 'Monitoring', 'Suivi protocole', 'Dossier patient'];");

fs.writeFileSync(tsPath, ts);
console.log('TS Tabs updated');
