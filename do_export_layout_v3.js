const fs = require('fs');

const pathHtml = 'src/app/pages/exportation/exportation.html';
const pathScss = 'src/app/pages/exportation/exportation.scss';

let html = fs.readFileSync(pathHtml, 'utf8');
let scss = fs.readFileSync(pathScss, 'utf8');

// HTML MODIFICATION
const htmlRegex = /<!-- ÉTAPE 5 : Résumé -->[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>|<!-- Boutons d'actions)/; 

// We can just use string replacement specifically from <!-- ÉTAPE 5 to the end of that step. 
// Let's replace the whole block by finding the start of step 5 to the end of action-submit-block
const indexStart = html.indexOf('<!-- ÉTAPE 5 : Résumé -->');
const indexEnd = html.indexOf('</div>', html.indexOf('action-submit-block')) + 6;

if (indexStart !== -1 && indexEnd !== -1) {
    const newHtmlBlock = `<!-- ÉTAPE 5 : Résumé -->
      <div class="step-panel step5-centered" *ngIf="currentStep === 5">
        <div class="panel-header text-center completed-export-header">
          <div class="header-icon-success">
            <i class="fas fa-check"></i>
          </div>
          <h3 class="panel-title-large">Completed export settings</h3>
        </div>

        <div class="recap-columns-layout">
          <!-- Col 1 -->
          <div class="r-col">
            <span class="r-label">Clinical study</span>
            <span class="r-value">{{ getStudyName(selectedStudy) || 'EndoLife' }}</span>
          </div>

          <div class="r-divider"></div>

          <!-- Col 2 -->
          <div class="r-col">
            <span class="r-label">Selected questionnaires</span>
            <span class="r-value">Follow-up<br>Healthy lifestyle</span>
          </div>

          <div class="r-divider"></div>

          <!-- Col 3 -->
          <div class="r-col">
            <span class="r-label">Excluded information</span>
            <div class="r-value">
              <strong style="color: #2b2b2b;">EHP-5</strong><br>
              Q1 : <span style="color: #888;">Sometimes, Often, Always</span><br>
              Q2 : <span style="color: #888;">Often, Always</span><br>
              Q3 : <span style="color: #888;">Never to always</span><br>
              Q4: <span style="color: #888;">Never to always</span>
            </div>
          </div>

          <div class="r-divider"></div>

          <!-- Col 4 -->
          <div class="r-col r-col-stack">
            <div class="str-row">
              <span class="r-label">Exportation name</span>
              <span class="r-value">Export-profile-pain</span>
            </div>
            <div class="str-row">
              <span class="r-label">Export format</span>
              <span class="r-value">.SAV</span>
            </div>
            <div class="str-row">
              <span class="r-label">Exportation date</span>
              <span class="r-value">03/06/25</span>
            </div>
          </div>

          <div class="r-divider"></div>

          <!-- Col 5 -->
          <div class="r-col">
            <span class="r-label">Export statut</span>
            <span class="r-value status-light" style="color: #b0b0b0; font-weight: bold;">No export</span>
          </div>
        </div>

        <!-- Boutons d'actions -->
        <div class="action-submit-block recap-actions-row">
           <div class="actions-flex">
             <button class="btn btn-outline edit-btn" (click)="currentStep = 4">
               Edit
             </button>
             <button class="btn btn-primary start-export-btn" (click)="launchExport()">
               Start export
             </button>
           </div>
           <div class="delete-link-wrapper mt-3">
             <a href="javascript:void(0)" class="link-delete" style="text-decoration: underline; color: #444; font-size: 0.95rem;">Delete this export</a>
           </div>
        </div>
      `;
    
    // Find the end of the entire step 5 div:
    // It's a bit tricky to find the closing div of step 5. 
    // Wait, the previous regex trick is safer or carefully rebuilding the file.
}
