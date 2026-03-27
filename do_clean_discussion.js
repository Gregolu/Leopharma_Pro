const fs = require('fs');

const pathHTML = 'src/app/pages/patients/patient-detail/patient-detail.component.html';
const pathTS = 'src/app/pages/patients/patient-detail/patient-detail.component.ts';

let html = fs.readFileSync(pathHTML, 'utf8');
let tsContent = fs.readFileSync(pathTS, 'utf8');

// HTML: Remove <div class="nav-item" (click)="setTab('Discussion')" ...> <span>Discussion</span> </div>
html = html.replace(/<div class="nav-item"[^>]*?setTab\('Discussion'\)[^>]*?>\s*<span>Discussion<\/span>\s*<\/div>/g, '');

// HTML: Remove the specific ng-container for discussion
html = html.replace(/<ng-container \*ngIf="activeTab === 'Discussion'">([\s\S]*?)<\/ng-container>/g, '');

fs.writeFileSync(pathHTML, html);

// TS: Remove import and from imports array
tsContent = tsContent.replace(/import\s+{\s*PatientDiscussionComponent\s*}\s*from\s*'[^']+';/, '');
tsContent = tsContent.replace(/,\s*PatientDiscussionComponent/, '');

fs.writeFileSync(pathTS, tsContent);

console.log("Discussion completely stripped");
