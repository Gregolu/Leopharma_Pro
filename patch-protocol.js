const fs = require('fs');

const tsPath = 'src/app/pages/patients/patient-protocol/patient-protocol.component.ts';
let tsContent = fs.readFileSync(tsPath, 'utf8');

if (!tsContent.includes('StudyModalComponent')) {
  // Add imports
  tsContent = tsContent.replace(
    /import { CommonModule } from '@angular\/common';/,
    `import { CommonModule } from '@angular/common';\nimport { StudyModalComponent } from '../../../shared/components/study-modal/study-modal.component';`
  );
  
  tsContent = tsContent.replace(
    /imports: \[CommonModule\]/,
    'imports: [CommonModule, StudyModalComponent]'
  );

  // Instead of simple alert, open the proper study modal
  tsContent = tsContent.replace(
    /openStudyAction\(study: any\) \{[\s\S]*?\}/,
    `openStudyAction(study: any) {
    this.selectedStudyAction = study;
    this.isStudyModalActionOpen = true;
  }
  
  isStudyModalActionOpen = false;
  selectedStudyAction: any = null;
  
  closeStudyActionModal() {
    this.isStudyModalActionOpen = false;
    this.selectedStudyAction = null;
  }`
  );

  fs.writeFileSync(tsPath, tsContent);
}

// Ensure the HTML captures it correctly
const htmlPath = 'src/app/pages/patients/patient-protocol/patient-protocol.component.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

if (!htmlContent.includes('<app-study-modal')) {
  htmlContent += `\n\n<app-study-modal \n  [isOpen]="isStudyModalActionOpen" \n  [study]="selectedStudyAction"\n  (close)="closeStudyActionModal()">\n</app-study-modal>`;
}

fs.writeFileSync(htmlPath, htmlContent);
console.log('Patched protocol.');
