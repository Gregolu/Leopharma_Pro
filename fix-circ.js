const fs = require('fs');
const file = 'src/app/pages/patients/patient-dossier/patient-dossier.component.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/{ label: 'Saison', icon: '🌦' },\s*{ label: 'Autre', icon: '✏️' }/, 
`{ label: 'Changement de poste', icon: '🔄' },
          { label: 'Nouvelles tâches ménagères', icon: '🧹' },
          { label: 'Changement de saison', icon: '🌦' },
          { label: 'Grossesse / post-partum', icon: '🤰' },
          { label: 'Maladie / infection', icon: '🤒' },
          { label: 'Sans raison apparente', icon: '❔' },
          { label: 'Autre', icon: '✏️' }`);

fs.writeFileSync(file, code);
