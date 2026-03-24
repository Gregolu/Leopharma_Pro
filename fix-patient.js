const fs = require('fs');
let file = fs.readFileSync('src/app/pages/patients/patient-detail/patient-detail.component.ts', 'utf8');

file = file.replace("import { PatientProtocolComponent } from '../patient-protocol/patient-protocol.component';", "import { PatientProtocolComponent } from '../patient-protocol/patient-protocol.component';\nimport { PatientDossierComponent } from '../patient-dossier/patient-dossier.component';");

file = file.replace("PatientProtocolComponent]", "PatientProtocolComponent, PatientDossierComponent]");

fs.writeFileSync('src/app/pages/patients/patient-detail/patient-detail.component.ts', file);
