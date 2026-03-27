const fs = require('fs');

let protHtml = fs.readFileSync('src/app/pages/patients/patient-protocol/patient-protocol.component.html', 'utf8');

// 1. Remove the checkbox
const checkboxToReplace = `<label class="checkbox-container inline">
                <input type="checkbox" [(ngModel)]="item.checked">
                <span class="checkmark"></span>
              </label>`;
protHtml = protHtml.replace(checkboxToReplace, '');

// another one in the other table
const disabledCheckbox = `<label class="checkbox-container inline">
                 <input type="checkbox" checked disabled>
                 <span class="checkmark"></span>
               </label>`;
protHtml = protHtml.replace(disabledCheckbox, '<i class="fas fa-check" style="color: #10b981; margin-right: 8px;"></i>');

// 2. Remove the select and replace with text
const selectBlock = `<select class="freq-select" [(ngModel)]="item.frequency" (change)="onFreqChange(item)" style="padding: 6px 12px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 13px; color: #334155; background-color: white; min-width: 120px; cursor: pointer;">
                  <option *ngFor="let f of frequencies" [value]="f">{{ f }}</option>
                </select>`;
const textReplacement = `<span style="font-size: 13px; color: #475569; font-weight: 500;">{{ item.frequency }}</span>`;
protHtml = protHtml.replace(selectBlock, textReplacement);

fs.writeFileSync('src/app/pages/patients/patient-protocol/patient-protocol.component.html', protHtml);
console.log("Protocole mis à jour.");
