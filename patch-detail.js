const fs = require('fs');
const tsPath = 'src/app/pages/patients/patient-detail/patient-detail.component.ts';
let tsContent = fs.readFileSync(tsPath, 'utf8');

// Needs: import { StudyModalComponent } from '../../../shared/components/study-modal/study-modal.component';
// And add to imports array
if (!tsContent.includes('StudyModalComponent')) {
  tsContent = tsContent.replace(
    /import { PatientDossierComponent } from '\.\.\/patient-dossier\/patient-dossier\.component';/,
    `import { PatientDossierComponent } from '../patient-dossier/patient-dossier.component';\nimport { StudyModalComponent } from '../../../shared/components/study-modal/study-modal.component';`
  );
  
  tsContent = tsContent.replace(
    /PatientDossierComponent\]/,
    'PatientDossierComponent, StudyModalComponent]'
  );

  tsContent = tsContent.replace(
    /openReport\(\) \{[\s\S]*?\}/,
    `openReport() {
    window.open('images/Dossierpatient.pdf', '_blank');
  }

  // --- Modal Studies ---
  isStudyModalOpen = false;
  selectedStudy: any = null;

  openStudyModal(name: string, status: string, badgeClass: string) {
    this.selectedStudy = { name, status, badgeClass };
    this.isStudyModalOpen = true;
  }
  
  closeStudyModal() {
    this.isStudyModalOpen = false;
    this.selectedStudy = null;
  }`
  );
  fs.writeFileSync(tsPath, tsContent);
}

// HTML changes for patient-detail
const htmlPath = 'src/app/pages/patients/patient-detail/patient-detail.component.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

htmlContent = htmlContent.replace(
  /<button class="lr-btn">Voir l'avancement<\/button>/,
  `<button class="lr-btn" (click)="openStudyModal('EczemaCare Trial A', 'active', 'pastille-trial-a')">Voir l'avancement</button>`
);

htmlContent = htmlContent.replace(
  /<button class="lr-btn lr-btn-primary">Envoyer le consentement<\/button>/,
  `<button class="lr-btn lr-btn-primary" (click)="openStudyModal('SkinLife ECP-4', 'eligible', 'pastille-trial-b')">Envoyer le consentement</button>`
);

htmlContent = htmlContent.replace(
  /<button class="lr-btn">Vérifier l'éligibilité<\/button>/,
  `<button class="lr-btn" (click)="openStudyModal('NewGen Biologics', 'check-eligibility', 'pastille-trial-c')">Vérifier l'éligibilité</button>`
);

if (!htmlContent.includes('<app-study-modal')) {
  // Append to the very end of patient-detail.html
  htmlContent += `\n\n<app-study-modal \n  [isOpen]="isStudyModalOpen" \n  [study]="selectedStudy"\n  (close)="closeStudyModal()">\n</app-study-modal>`;
}

fs.writeFileSync(htmlPath, htmlContent);
console.log('Patched patient detail.');
