const fs = require('fs');
const pathHtml = 'src/app/pages/exportation/exportation.html';
let html = fs.readFileSync(pathHtml, 'utf8');

const regex = /<!-- Boutons d'actions -->[\s\S]*?(?=<\/div>\s*<!-- CTA Footer)/;

const newHTML = `<!-- Boutons d'actions -->
        <div class="action-submit-block recap-actions-row">
            <ng-container *ngIf="lastExportStatus !== 'success'">
               <div class="actions-flex">
                 <button class="btn btn-outline edit-btn" (click)="currentStep = 4" [disabled]="lastExportStatus === 'in-progress'">
                   Modifier
                 </button>
                 <button class="btn btn-primary start-export-btn" (click)="launchExport()" [disabled]="lastExportStatus === 'in-progress'">
                   Lancer l'export
                 </button>
               </div>
               <div class="delete-link-wrapper mt-3">
                 <a href="javascript:void(0)" class="link-delete" (click)="cancelSummary()">Annuler cet export</a>
               </div>
            </ng-container>

            <ng-container *ngIf="lastExportStatus === 'success'">
               <div class="actions-flex">
                 <button class="btn btn-primary start-export-btn" (click)="downloadLastExport()">
                   <i class="fas fa-download"></i> Télécharger le fichier
                 </button>
               </div>
               <div class="delete-link-wrapper mt-3">
                 <a href="javascript:void(0)" class="link-delete" (click)="cancelSummary()">Retourner à la liste</a>
               </div>
            </ng-container>
        </div>
      </div>`;

html = html.replace(regex, newHTML);
fs.writeFileSync(pathHtml, html);
console.log('HTML buttons fixed');
