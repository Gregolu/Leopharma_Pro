const fs = require('fs');
let html = fs.readFileSync('src/app/pages/exportation/exportation.html', 'utf8');

const newStep5 = `      <!-- ÉTAPE 5: Résumé -->
      <div class="step-panel step5-centered" *ngIf="currentStep === 5">
        <div class="panel-header text-center">
          <h3 class="panel-subtitle">Récapitulatif de l'exportation</h3>
          <p class="panel-desc">Vérifiez vos paramètres avant de lancer la génération du fichier.</p>
        </div>

        <div class="summary-grid-box">
          <div class="detail-item">
            <div class="detail-icon"><i class="fas fa-microscope"></i></div>
            <div class="detail-texts">
              <span class="detail-label">Études & Cohorte</span>
              <span class="detail-value">{{ getStudyName(selectedStudy) || 'Aucune (Base globale)' }}</span>
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-icon"><i class="fas fa-file-medical"></i></div>
            <div class="detail-texts">
              <span class="detail-label">Questionnaires actifs</span>
              <span class="detail-value">{{ SelectedQuestionnairesCount }} questionnaires</span>
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-icon"><i class="fas fa-users"></i></div>
            <div class="detail-texts">
              <span class="detail-label">Volume de données</span>
              <span class="detail-value">{{ dynamicCount | number }} entrées</span>
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-icon"><i class="fas fa-file-export"></i></div>
            <div class="detail-texts">
              <span class="detail-label">Format sélectionné</span>
              <span class="detail-value">{{ selectedFormat }}</span>
            </div>
          </div>
        </div>

        <!-- Zone de feedback dynamique -->
        <div class="export-status-zone mt-4" *ngIf="lastExportStatus === 'in-progress' || lastExportStatus === 'success'">
            <div *ngIf="lastExportStatus === 'in-progress'" class="status-alert progress-alert">
                <i class="fas fa-circle-notch fa-spin"></i> Construction du fichier en cours...
            </div>
            <div *ngIf="lastExportStatus === 'success'" class="status-alert success-alert">
                <i class="fas fa-check-circle"></i> Exportation générée avec succès (Réf: {{ currentExportRef }})
            </div>
        </div>

        <!-- Boutons d'actions -->
        <div class="action-submit-block">
            <ng-container *ngIf="lastExportStatus === 'pending'">
               <button class="btn btn-primary btn-xl submit-btn" (click)="launchExport()" [disabled]="lastExportStatus === 'in-progress'">
                 <i class="fas fa-rocket"></i> Confirmer et Lancer l'export
               </button>
               <div style="margin-top: 1rem;">
                 <button class="btn btn-text-nav" (click)="currentStep = 4" [disabled]="lastExportStatus === 'in-progress'">Modifier les paramètres</button>
               </div>
            </ng-container>

            <ng-container *ngIf="lastExportStatus === 'success'">
               <button class="btn btn-success btn-xl submit-btn success-btn" (click)="downloadLastExport()">
                 <i class="fas fa-download"></i> Télécharger {{ exportName || 'le fichier' }}
               </button>
               <div style="margin-top: 1rem;">
                 <button class="btn btn-text-nav" (click)="view = 'list'">Retourner à la liste</button>
               </div>
            </ng-container>
        </div>
      </div>`;

html = html.replace(/<!-- ÉTAPE 5: Résumé -->[\s\S]*?<!-- end wizard-content -->/, newStep5 + '\n\n    </div> <!-- end wizard-content -->');
fs.writeFileSync('src/app/pages/exportation/exportation.html', html);
