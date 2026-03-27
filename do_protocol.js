const fs = require('fs');

// 1. Rename "Exportation" to "Export" in header
let headerTs = fs.readFileSync('src/app/core/layout/header.component.ts', 'utf8');
headerTs = headerTs.replaceAll('>Exportation</a>', '>Export</a>');
fs.writeFileSync('src/app/core/layout/header.component.ts', headerTs);

// 2. Rename in Exportation HTML
let expHtml = fs.readFileSync('src/app/pages/exportation/exportation.html', 'utf8');
// List all matches manually found
expHtml = expHtml.replaceAll('Exportations</h1>', 'Exports</h1>');
expHtml = expHtml.replaceAll('Nouvelle exportation', 'Nouvel export');
expHtml = expHtml.replaceAll("Date d'exportation", "Date d'export");
expHtml = expHtml.replaceAll('Aucune exportation trouvée', 'Aucun export trouvé');
expHtml = expHtml.replaceAll('Exportation ({{', 'Export ({{');
expHtml = expHtml.replaceAll("Récapitulatif de l'exportation", "Récapitulatif de l'export");
expHtml = expHtml.replaceAll('Exportation générée avec succès', 'Export généré avec succès');

fs.writeFileSync('src/app/pages/exportation/exportation.html', expHtml);


// 3. Rename in Exportation TS
let expTs = fs.readFileSync('src/app/pages/exportation/exportation.ts', 'utf8');
expTs = expTs.replaceAll('Exportation (${', 'Export (${');
fs.writeFileSync('src/app/pages/exportation/exportation.ts', expTs);


// 4. Modify Protocol to remove checkboxes and uneditable select
let protHtml = fs.readFileSync('src/app/pages/patients/patient-protocol/patient-protocol.component.html', 'utf8');

// remove <td> for checkbox in header
protHtml = protHtml.replace('<th style="width: 50px;"></th>', '');
// remove <td> for checkbox in body
protHtml = protHtml.replace('<td style="width: 50px; text-align: center;">\n            <input type="checkbox" \n                   [ngModel]="isTaskCompleted(day, group.name, task)"\n                   (ngModelChange)="toggleTask(day, group.name, task, $event)">\n          </td>', '');
protHtml = protHtml.replace('<td style="width: 50px; text-align: center;">\n            <input type="checkbox"\n                   [ngModel]="isTaskCompleted(day, group.name, task)"\n                   (ngModelChange)="toggleTask(day, group.name, task, $event)">\n          </td>', '');
protHtml = protHtml.replace('<td style="width: 50px; text-align: center;">\n            <input type="checkbox" \n                   [ngModel]="isTaskCompleted(day, \'Traitements\', task)"\n                   (ngModelChange)="toggleTask(day, \'Traitements\', task, $event)">\n          </td>', '');

// Turn <td><select>...</select></td> into static text for Tasks
const selectStringTask = `
          <td>
            <select class="frequency-select" [ngModel]="task.frequency" (ngModelChange)="task.frequency = $event">
              <optgroup label="Occurrences simples">
                <option value="1x/jour">1x/jour</option>
                <option value="2x/jour">2x/jour</option>
                <option value="3x/jour">3x/jour</option>
              </optgroup>
              <optgroup label="Occurrences spécifiques">
                <option value="Le Soir">Le Soir</option>
                <option value="Le Matin">Le Matin</option>
                <option value="Le Midi">Le Midi</option>
              </optgroup>
              <optgroup label="Occurrences récurrentes">
                <option value="1x/semaine">1x/semaine</option>
                <option value="2x/semaine">2x/semaine</option>
                <option value="1x/2 semaines">1x/2 semaines</option>
                <option value="1x/mois">1x/mois</option>
              </optgroup>
              <optgroup label="Occurrences personnalisées">
                <option value="Personnalisé">Personnalisé</option>
              </optgroup>
            </select>
          </td>`;
protHtml = protHtml.replaceAll(selectStringTask, '\n          <td style="color: #64748b; font-weight: 500;">{{ task.frequency }}</td>');
// remove identical or similar occurrences (like extra spaces)
protHtml = protHtml.replaceAll('<select class="frequency-select" [ngModel]="task.frequency" (ngModelChange)="task.frequency = $event">\n              <optgroup label="Occurrences simples">\n                <option value="1x/jour">1x/jour</option>\n                <option value="2x/jour">2x/jour</option>\n                <option value="3x/jour">3x/jour</option>\n              </optgroup>\n              <optgroup label="Occurrences spécifiques">\n                <option value="Le Soir">Le Soir</option>\n                <option value="Le Matin">Le Matin</option>\n                <option value="Le Midi">Le Midi</option>\n              </optgroup>\n              <optgroup label="Occurrences récurrentes">\n                <option value="1x/semaine">1x/semaine</option>\n                <option value="2x/semaine">2x/semaine</option>\n                <option value="1x/2 semaines">1x/2 semaines</option>\n                <option value="1x/mois">1x/mois</option>\n              </optgroup>\n              <optgroup label="Occurrences personnalisées">\n                <option value="Personnalisé">Personnalisé</option>\n              </optgroup>\n            </select>', '<span style="color: #64748b; font-weight: 500;">{{ task.frequency }}</span>');


// Make sure there are no other checkboxes left
protHtml = protHtml.replaceAll(/<td style="width: 50px; text-align: center;">\s*<input type="checkbox"[^>]*>\s*<\/td>/gi, '');

fs.writeFileSync('src/app/pages/patients/patient-protocol/patient-protocol.component.html', protHtml);

console.log('Finished transformations');
