const fs = require('fs');

const pathHtml = 'src/app/pages/exportation/exportation.html';
const pathScss = 'src/app/pages/exportation/exportation.scss';

let html = fs.readFileSync(pathHtml, 'utf8');
let scss = fs.readFileSync(pathScss, 'utf8');

// HTML MODIFICATION
const startTag = '<!-- ÉTAPE 5 : Résumé -->';
const endTag = '<!-- CTA Footer : Affiché seulement pour Etapes 1 à 3';
const indexStart = html.indexOf(startTag);
const indexEnd = html.indexOf(endTag);

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
            <div class="r-value stack-info">
              <strong>EHP-5</strong>
              <span>Q1 : <span class="light-text">Sometimes, Often, Always</span></span>
              <span>Q2 : <span class="light-text">Often, Always</span></span>
              <span>Q3 : <span class="light-text">Never to always</span></span>
              <span>Q4: <span class="light-text">Never to always</span></span>
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
            <span class="r-value status-light">No export</span>
          </div>
        </div>

        <!-- Zone de feedback dynamique -->
        <div class="export-status-zone mt-4" *ngIf="lastExportStatus === 'in-progress' || lastExportStatus === 'success'">
            <div *ngIf="lastExportStatus === 'in-progress'" class="status-alert progress-alert">
                <i class="fas fa-circle-notch fa-spin"></i> Construction du fichier en cours...
            </div>
            <div *ngIf="lastExportStatus === 'success'" class="status-alert success-alert">
                <i class="fas fa-check-circle"></i> Export généré avec succès
            </div>
        </div>

        <!-- Boutons d'actions -->
        <div class="action-submit-block recap-actions-row">
           <div class="actions-flex">
             <button class="btn btn-outline edit-btn" (click)="currentStep = 4" [disabled]="lastExportStatus === 'in-progress'">
               Edit
             </button>
             <button class="btn btn-primary start-export-btn" (click)="launchExport()" [disabled]="lastExportStatus === 'in-progress'">
               Start export
             </button>
           </div>
           <div class="delete-link-wrapper">
             <a href="javascript:void(0)" class="link-delete">Delete this export</a>
           </div>
        </div>
      </div>

      `;
    
    html = html.substring(0, indexStart) + newHtmlBlock + html.substring(indexEnd);
    fs.writeFileSync(pathHtml, html);
    console.log('HTML updated');
} else {
    console.log('HTML replace markers not found');
}

// SCSS MODIFICATION
const scssReplaceStart = '.summary-grid-box';
const scssReplaceEnd = '.export-status-zone';
const indexScssStart = scss.indexOf(scssReplaceStart);
const indexScssEnd = scss.indexOf(scssReplaceEnd);

const newScssBlock = `/* RECAPITULATIF - COLONNES MODERNES (STYLE MOCKUP) */
.completed-export-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  margin-top: 1rem;

  .header-icon-success {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #16a34a; /* green-600 */
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
    box-shadow: 0 0 0 4px #dcfce7, 0 0 0 8px #f1fdf4; /* double ring to match image */
  }

  .panel-title-large {
    font-size: 1.6rem;
    font-weight: 700;
    color: #1e1b4b; /* very dark text */
    margin: 0;
  }
}

.recap-columns-layout {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  background: transparent;
  padding: 0 1rem;
  margin-bottom: 3rem;

  .r-divider {
    width: 1px;
    background: #cbd5e1; /* slate-300 */
    margin: 0 1.5rem;
  }

  .r-col {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;

    .r-label {
      font-size: 0.95rem;
      font-weight: 700;
      color: #1e1b4b; /* dark indigo text */
      margin-bottom: 0.8rem;
    }

    .r-value {
      font-size: 0.95rem;
      color: #475569; /* slate-600 */
      line-height: 1.5;
      
      &.status-light {
        color: #94a3b8; /* slate-400 */
        font-weight: 700;
      }

      &.stack-info {
        display: flex;
        flex-direction: column;
        
        strong {
          color: #1e1b4b;
          font-weight: 700;
          margin-bottom: 0.2rem;
        }

        .light-text {
          color: #888;
        }
      }
    }
  }

  .r-col-stack {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    .str-row {
      display: flex;
      flex-direction: column;

      .r-label {
        margin-bottom: 0.3rem;
      }
    }
  }
}

.recap-actions-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;

  .actions-flex {
    display: flex;
    gap: 1rem;
    justify-content: center;

    .btn {
      padding: 0.8rem 2.5rem;
      border-radius: 4px;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.2s;
      min-width: 140px;
    }

    .edit-btn {
      background: #fdfdfd;
      border: 1px solid #1e1b4b;
      color: #1e1b4b;
      &:hover {
        background: #f1f5f9;
      }
    }

    .start-export-btn {
      background: #231f49; /* dark indigo/navy */
      border: none;
      color: white;
      &:hover:not(:disabled) {
        background: #110e2d;
      }
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }

  .delete-link-wrapper {
    margin-top: 0.5rem;
    .link-delete {
      color: #334155;
      text-decoration: underline;
      font-size: 0.9rem;
      font-weight: 500;
      &:hover {
        color: #0f172a;
      }
    }
  }
}

`;

if (indexScssStart !== -1 && indexScssEnd !== -1) {
    scss = scss.substring(0, indexScssStart) + newScssBlock + scss.substring(indexScssEnd);
    fs.writeFileSync(pathScss, scss);
    console.log('SCSS updated');
} else {
    console.log('SCSS markers not found');
}
