const fs = require('fs');

const pathExp = 'src/app/pages/exportation/exportation.ts';
let exp = fs.readFileSync(pathExp, 'utf8');

const regexExp = /patientCategories:\s*ExportCategory\[\]\s*=\s*\[[\s\S]*?\];\s*(?:get|constructor)/;
const match = exp.match(regexExp);

if(match) {
    const replacement = `patientCategories: ExportCategory[] = [
    {
      name: 'Etat de la main',
      selected: true,
      questionnaires: [
        {
          id: 'q1', name: 'Etat de santé générale de votre main', selected: true,
          fields: [
            { id: 'f1_1', label: 'Symptômes généraux', selected: true, type: 'checkbox' }
          ]
        },
        {
          id: 'q2', name: 'Analyse détaillée des symptômes', selected: true,
          fields: [
            { id: 'f2_1', label: 'Spécificité des symptômes', selected: true, type: 'checkbox' }
          ]
        }
      ]
    },
    {
      name: 'Antécédents et traitements',
      selected: true,
      questionnaires: [
        {
          id: 'q3', name: 'Antécédents médicaux', selected: true,
          fields: [ { id: 'f3_1', label: 'Détails médicaux', selected: true, type: 'checkbox' } ]
        },
        {
          id: 'q4', name: 'Traitements', selected: true,
          fields: [ { id: 'f4_1', label: 'Historique traitements', selected: true, type: 'checkbox' } ]
        },
        {
          id: 'q5', name: 'Antécédents familiaux', selected: true,
          fields: [ { id: 'f5_1', label: 'Détails familiaux', selected: true, type: 'checkbox' } ]
        }
      ]
    },
    {
      name: 'Contexte de vie',
      selected: true,
      questionnaires: [
        {
          id: 'q6', name: 'Profession et cadre de vie', selected: true,
          fields: [ { id: 'f6_1', label: 'Détails professionnels', selected: true, type: 'checkbox' } ]
        },
        {
          id: 'q7', name: 'Exposition et facteurs aggravants', selected: true,
          fields: [ { id: 'f7_1', label: 'Expositions', selected: true, type: 'checkbox' } ]
        }
      ]
    },
    {
      name: 'Qualité de vie',
      selected: true,
      questionnaires: [
        {
          id: 'q8', name: 'Impact fonctionnel des mains', selected: true,
          fields: [ { id: 'f8_1', label: 'Score d\\'impact', selected: true, type: 'checkbox' } ]
        },
        {
          id: 'q9', name: 'Votre qualité de vie (dont stigmatisation)', selected: true,
          fields: [ { id: 'f9_1', label: 'Score QDV', selected: true, type: 'checkbox' } ]
        }
      ]
    }
  ];

  get`;
    exp = exp.replace(regexExp, replacement);
    fs.writeFileSync(pathExp, exp);
    console.log('Exportation components updated.');
} else {
    console.log('No match found for exportation.');
}

// --- PATIENT DOSSIER ---
const pathDossier = 'src/app/pages/patients/patient-dossier/patient-dossier.component.ts';
let dossier = fs.readFileSync(pathDossier, 'utf8');

const regexDossier = /categories:\s*any\[\]\s*=\s*\[[\s\S]*?\];\s*(?:instances)/;
const matchDossier = dossier.match(regexDossier);

if (matchDossier) {
    const repDossier = `categories: any[] = [
    {
      id: 'c1',
      name: 'Etat de la main',
      expanded: true,
      questionnaires: [
        { id: 'q1', name: 'Etat de santé générale de votre main', status: 'completed', type: 'pro' },
        { id: 'q2', name: 'Analyse détaillée des symptômes', status: 'incomplete', type: 'pro' },
      ],
    },
    {
      id: 'c2',
      name: 'Antécédents et traitements',
      expanded: true,
      questionnaires: [
        { id: 'q3', name: 'Antécédents médicaux', status: 'completed', type: 'patient' },
        { id: 'q4', name: 'Traitements', status: 'completed', type: 'patient' },
        { id: 'q5', name: 'Antécédents familiaux', status: 'incomplete', type: 'patient' },
      ],
    },
    {
      id: 'c3',
      name: 'Contexte de vie',
      expanded: true,
      questionnaires: [
        { id: 'q6', name: 'Profession et cadre de vie', status: 'completed', type: 'patient' },
        { id: 'q7', name: 'Exposition et facteurs aggravants', status: 'completed', type: 'patient' },
      ],
    },
    {
      id: 'c4',
      name: 'Qualité de vie',
      expanded: true,
      questionnaires: [
        { id: 'q8', name: 'Impact fonctionnel des mains', status: 'incomplete', type: 'patient' },
        { id: 'q9', name: 'Votre qualité de vie (dont stigmatisation)', status: 'incomplete', type: 'patient' },
      ],
    },
  ];

  instances`;
    dossier = dossier.replace(regexDossier, repDossier);
    
    // Also fix activeQuestionnaireId and name
    dossier = dossier.replace(/activeQuestionnaireId: string = 'q1';/, "activeQuestionnaireId: string = 'q1';");
    dossier = dossier.replace(/activeQuestionnaireName: string = 'Analyse des mains';/, "activeQuestionnaireName: string = 'Etat de santé générale de votre main';");
    

    fs.writeFileSync(pathDossier, dossier);
    console.log('Dossier updated.');
} else {
    console.log('No match for dossier.');
}

// --- PATIENT PROTOCOL ---
const pathProtocol = 'src/app/pages/patients/patient-protocol/patient-protocol.component.ts';
let protocol = fs.readFileSync(pathProtocol, 'utf8');

const regexProtocol = /questionnaireCategories:\s*any\[\]\s*=\s*\[[\s\S]*?\];\s*(?:(?=\/\/ HISTORY))/;
const matchProtocol = protocol.match(regexProtocol);

if (matchProtocol) {
    const repProtocol = `questionnaireCategories: any[] = [
    {
      name: 'Etat de la main',
      items: [
        { id: 'q1', name: 'Etat de santé générale de votre main', checked: true, frequency: '6 mois', hasChanged: false },
        { id: 'q2', name: 'Analyse détaillée des symptômes', checked: true, frequency: '12 mois', hasChanged: true, oldValue: '6 mois' }
      ]
    },
    {
      name: 'Antécédents et traitements',
      items: [
        { id: 'q3', name: 'Antécédents médicaux', checked: true, frequency: '12 mois', hasChanged: false },
        { id: 'q4', name: 'Traitements', checked: true, frequency: '12 mois', hasChanged: false },
        { id: 'q5', name: 'Antécédents familiaux', checked: true, frequency: 'Pas de fréquence', hasChanged: false }
      ]
    },
    {
      name: 'Contexte de vie',
      items: [
        { id: 'q6', name: 'Profession et cadre de vie', checked: false, frequency: 'Pas de fréquence', hasChanged: false },
        { id: 'q7', name: 'Exposition et facteurs aggravants', checked: false, frequency: 'Pas de fréquence', hasChanged: false }
      ]
    },
    {
      name: 'Qualité de vie',
      items: [
        { id: 'q8', name: 'Impact fonctionnel des mains', checked: true, frequency: '3 mois', hasChanged: false },
        { id: 'q9', name: 'Votre qualité de vie (dont stigmatisation)', checked: true, frequency: '6 mois', hasChanged: false }
      ]
    }
  ];
`;
    protocol = protocol.replace(regexProtocol, repProtocol);
    
    // Also replace the "studiesCategories" equivalent inside "studies" if it exists, though user said "questionnaireCategories"
    
    // Check if there's any chart series config needing update
    protocol = protocol.replace(/'Analyse des mains'/g, "'Etat de santé générale de votre main'");
    protocol = protocol.replace(/'Scan produit'/g, "'Analyse détaillée des symptômes'");
    protocol = protocol.replace(/'Votre qualité de vie'/g, "'Votre qualité de vie (dont stigmatisation)'");
    protocol = protocol.replace(/'Analyse détaillée des rougeurs'/g, "'Antécédents médicaux'");
    protocol = protocol.replace(/'Analyse détaillée peau qui pèle'/g, "'Traitements'");
    protocol = protocol.replace(/'Analyse détaillée peau épaissie'/g, "'Antécédents familiaux'");
    protocol = protocol.replace(/'État de santé général de votre problème'/g, "'Profession et cadre de vie'");
    
    fs.writeFileSync(pathProtocol, protocol);
    console.log('Protocol updated.');
} else {
    console.log('No match for protocol. Regex might be wrong.');
}
