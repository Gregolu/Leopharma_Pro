const fs = require('fs');
const content = fs.readFileSync('src/app/pages/patients/patient-dossier/patient-dossier.component.html', 'utf8');

const target = \`<div class="questions-list" style="display: flex; flex-direction: column; gap: 24px;">
        
        <div class="q-block" *ngFor="let q of questions" style="background: white; padding: 20px; border: 1px solid var(--border); border-radius: 8px;">\`;

const rep = fs.readFileSync('replacement.txt', 'utf8');

let res = content.replace(target, rep);
res = res.replace('</button>\n             </div>\n\n           </div>\n        </div>\n\n      </div>', '</button>\n             </div>\n\n           </div>\n        </div>\n\n</ng-template>\n      </div>');

fs.writeFileSync('src/app/pages/patients/patient-dossier/patient-dossier.component.html', res);
console.log('patched successfully');
