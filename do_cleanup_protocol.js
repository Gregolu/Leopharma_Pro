const fs = require('fs');
const path = 'src/app/pages/patients/patient-protocol/patient-protocol.component.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Remove undo and history buttons by flexible regex to deal with any spaces/newlines
html = html.replace(/<div class="actions-wrapper" \*ngIf="item\.hasChanged"[\s\S]*?<\/div>/, '');

// 2. Remove the green checkmarks next to questionnaires in clinical studies
const checkmarkReg = /<i class="fas fa-check" style="color: #10b981; margin-right: 8px;"><\/i>\s*\{\{\s*item\.name\s*\}\}/g;
html = html.replace(checkmarkReg, '{{ item.name }}');

// 3. Replace the "missed" cross in the timeline with a label "En cours"
const redCross = `<i class="fas fa-times icon-red" *ngIf="state === 'missed'"></i>`;
const enCoursText = `<span *ngIf="state === 'missed'" style="color: #f59e0b; font-size: 0.75rem; font-weight: 600; background: #fffbeb; padding: 2px 6px; border-radius: 4px; border: 1px solid #fcd34d;">En cours</span>`;
html = html.replace(redCross, enCoursText);

fs.writeFileSync(path, html);
console.log('Cleanup completed');