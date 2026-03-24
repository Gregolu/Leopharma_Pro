const fs = require('fs');
let html = fs.readFileSync('src/app/pages/exportation/exportation.html', 'utf8');

// We replace the footer and add step 5
const step5HTML = `      <!-- ÉTAPE 5: Résumé -->
      <div class="step-panel" *ngIf="currentStep === 5">
        <div class="panel-header">
          <h3 class="panel-subtitle">Récapitulatif de l'exportation</h3>
          <p class="panel-desc">Vérifiez vos paramètres avant de lancer l'exportation.</p>
        </div>

        <div class="summary-horizontal-layout">
          <div class="summary-card flex-2 bg-grey">
            <div class="grid-details-horizontal">
              <div class="detail-block">
                <span class="detail-key">Études cliniques sélectionnées</span>
                <span class="detail-val">{{ getStudyName(selectedStudy) || 'Aucune (Base globale)' }}</span>
              </div>
              <div class="detail-block">
                <span class="detail-key">Questionnaires sélectionnés</span>
                <span class="detail-val">{{ SelectedQuestionnairesCount }} actifs</span>
              </div>
              <div class="detail-block">
                <span class="detail-key">Données incluses</span>
                <span class="detail-val">{{ dynamicCount | number }} entrées cibles</span>
              </div>
              <div class="detail-block">
                <span class="detail-key">Format & Date</span>
                <span class="detail-val">{{ selectedFormat }} <br> Réf: {{ currentExportRef }}</span>
              </div>
            </div>
          </div>

          <div class="summary-card flex-1 action-card">
            <div class="status-zone" [ngClass]="lastExportStatus || ''">
              <div *ngIf="lastExportStatus === 'pending'" class="status-indicator pending-state">
                <i class="fas fa-info-circle"></i> En attente de lancement
              </div>
              <div *ngIf="lastExportStatus === 'in-progress'" class="status-indicator progress-state">
                <i class="fas fa-circle-notch fa-spin"></i> Traitement en cours...
              </div>
              <div *ngIf="lastExportStatus === 'success'" class="status-indicator success-state">
                <i class="fas fa-check-circle"></i> Fichier prêt
              </div>

              <div class="summary-cta-group-vertical">
                <ng-container *ngIf="lastExportStatus === 'pending'">
                   <button class="btn btn-primary btn-full" (click)="launchExport()">Lancer l'export</button>
                   <div class="secondary-actions-row mt-3">
                     <button class="btn btn-text-nav" (click)="currentStep = 4">Modifier</button>
                     <button class="btn btn-danger-text" (click)="view = 'list'">Annuler</button>
                   </div>
                </ng-container>

                <ng-container *ngIf="lastExportStatus === 'success'">
                   <button class="btn btn-primary btn-full success-btn" (click)="downloadLastExport()">
                     <i class="fas fa-download"></i> Télécharger le fichier
                   </button>
                   <div class="secondary-actions-row mt-3">
                     <button class="btn btn-text-nav" (click)="view = 'list'"><i class="fas fa-arrow-left"></i> Retour à la liste</button>
                   </div>
                </ng-container>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div> <!-- end wizard-content -->

    <!-- CTA Footer : Affiché seulement pour Etapes 1 à 3 -->`;

html = html.replace('    </div>\n\n    <!-- CTA Footer : Affiché seulement pour Etapes 1 à 3 -->', step5HTML);

let endCutIdx = html.indexOf('  <!-- ============================================== -->\n  <!-- 3. PAGE DE RÉCAPITULATIF');
if (endCutIdx !== -1) {
  html = html.substring(0, endCutIdx) + '\n</div>\n';
}

fs.writeFileSync('src/app/pages/exportation/exportation.html', html);
console.log("Done updating HTML.");
