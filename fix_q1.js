const fs = require('fs');
const file = 'src/app/pages/patients/patient-dossier/patient-dossier.component.html';
if (!fs.existsSync(file)) {
    console.error("File not found!");
    process.exit(1);
}
let content = fs.readFileSync(file, 'utf8');

const target = `<div class="questions-list" style="display: flex; flex-direction: column; gap: 24px;">
        
        <div class="q-block" *ngFor="let q of questions" style="background: white; padding: 20px; border: 1px solid var(--border); border-radius: 8px;">`;

const customUI = `<div class="questions-list" style="display: flex; flex-direction: column; gap: 24px;">

        <!-- CUSTOM UI FOR Q1 -->
        <ng-container *ngIf="activeQuestionnaireId === 'q1'; else defaultQuestions">
          
          <!-- Q1: Etat global -->
          <div class="custom-card-block" style="background: white; padding: 24px; border: 1px solid var(--border); border-radius: 12px;">
            <h4 style="margin-top: 0; font-size: 1.1rem; margin-bottom: 20px;">1. Comment décririez-vous l'état général de vos mains aujourd'hui ?</h4>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
              <div class="ui-card-btn" [class.selected]="q1Data.q1 === 'TresBien'" [class.disabled]="!isEditMode && q1Data.q1 !== 'TresBien'" (click)="setQ1Data('q1', 'TresBien')">
                <i class="fas fa-laugh" style="font-size: 2rem; margin-bottom: 12px; color: #10b981;"></i>
                <span style="font-weight: 600;">Très bien</span>
              </div>
              <div class="ui-card-btn" [class.selected]="q1Data.q1 === 'Bien'" [class.disabled]="!isEditMode && q1Data.q1 !== 'Bien'" (click)="setQ1Data('q1', 'Bien')">
                <i class="fas fa-smile" style="font-size: 2rem; margin-bottom: 12px; color: #84cc16;"></i>
                <span style="font-weight: 600;">Bien</span>
              </div>
              <div class="ui-card-btn" [class.selected]="q1Data.q1 === 'Moyen'" [class.disabled]="!isEditMode && q1Data.q1 !== 'Moyen'" (click)="setQ1Data('q1', 'Moyen')">
                <i class="fas fa-meh" style="font-size: 2rem; margin-bottom: 12px; color: #f59e0b;"></i>
                <span style="font-weight: 600;">Moyen</span>
              </div>
              <div class="ui-card-btn" [class.selected]="q1Data.q1 === 'Mauvais'" [class.disabled]="!isEditMode && q1Data.q1 !== 'Mauvais'" (click)="setQ1Data('q1', 'Mauvais')">
                <i class="fas fa-frown" style="font-size: 2rem; margin-bottom: 12px; color: #ef4444;"></i>
                <span style="font-weight: 600;">Mauvais</span>
              </div>
            </div>
          </div>

          <!-- Q2: Symptômes Multiples -->
          <div class="custom-card-block" style="background: white; padding: 24px; border: 1px solid var(--border); border-radius: 12px;">
            <h4 style="margin-top: 0; font-size: 1.1rem; margin-bottom: 20px;">2. Quels symptômes ressentez-vous ? (Sélection multiple)</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="ui-selection-row" [class.selected]="q1Data.q2_locations.includes('Rougeurs')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q2_locations', 'Rougeurs')">
                <div style="width: 20px; height: 20px; border-radius: 4px; border: 2px solid var(--border); margin-right: 12px; display: flex; align-items: center; justify-content: center;"
                     [style.background]="q1Data.q2_locations.includes('Rougeurs') ? 'var(--primary)' : 'white'"
                     [style.borderColor]="q1Data.q2_locations.includes('Rougeurs') ? 'var(--primary)' : 'var(--border)'">
                     <i class="fas fa-check" *ngIf="q1Data.q2_locations.includes('Rougeurs')" style="color: white; font-size: 0.7rem;"></i>
                </div>
                <span>Rougeurs persistantes</span>
              </div>
              <div class="ui-selection-row" [class.selected]="q1Data.q2_locations.includes('Demangeaisons')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q2_locations', 'Demangeaisons')">
                <div style="width: 20px; height: 20px; border-radius: 4px; border: 2px solid var(--border); margin-right: 12px; display: flex; align-items: center; justify-content: center;"
                     [style.background]="q1Data.q2_locations.includes('Demangeaisons') ? 'var(--primary)' : 'white'"
                     [style.borderColor]="q1Data.q2_locations.includes('Demangeaisons') ? 'var(--primary)' : 'var(--border)'">
                     <i class="fas fa-check" *ngIf="q1Data.q2_locations.includes('Demangeaisons')" style="color: white; font-size: 0.7rem;"></i>
                </div>
                <span>Démangeaisons sévères</span>
              </div>
              <div class="ui-selection-row" [class.selected]="q1Data.q2_locations.includes('Gerces')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q2_locations', 'Gerces')">
                <div style="width: 20px; height: 20px; border-radius: 4px; border: 2px solid var(--border); margin-right: 12px; display: flex; align-items: center; justify-content: center;"
                     [style.background]="q1Data.q2_locations.includes('Gerces') ? 'var(--primary)' : 'white'"
                     [style.borderColor]="q1Data.q2_locations.includes('Gerces') ? 'var(--primary)' : 'var(--border)'">
                     <i class="fas fa-check" *ngIf="q1Data.q2_locations.includes('Gerces')" style="color: white; font-size: 0.7rem;"></i>
                </div>
                <span>Gerçures ou crevasses</span>
              </div>
              <div class="ui-selection-row" [class.selected]="q1Data.q2_locations.includes('Douleur')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q2_locations', 'Douleur')">
                <div style="width: 20px; height: 20px; border-radius: 4px; border: 2px solid var(--border); margin-right: 12px; display: flex; align-items: center; justify-content: center;"
                     [style.background]="q1Data.q2_locations.includes('Douleur') ? 'var(--primary)' : 'white'"
                     [style.borderColor]="q1Data.q2_locations.includes('Douleur') ? 'var(--primary)' : 'var(--border)'">
                     <i class="fas fa-check" *ngIf="q1Data.q2_locations.includes('Douleur')" style="color: white; font-size: 0.7rem;"></i>
                </div>
                <span>Douleur au toucher</span>
              </div>
            </div>
          </div>

          <!-- Q7: Stepper -->
          <div class="custom-card-block" style="background: white; padding: 24px; border: 1px solid var(--border); border-radius: 12px;">
            <h4 style="margin-top: 0; font-size: 1.1rem; margin-bottom: 20px;">3. Sur une échelle de 0 à 10, évaluez l'intensité de la douleur lors des tâches ménagères :</h4>
            <div style="display: flex; align-items: center; justify-content: center; gap: 24px;">
              <button class="ui-stepper-btn" (click)="changeStepper(-1)" [disabled]="!isEditMode || q1Data.q7_stepper <= 0">
                <i class="fas fa-minus"></i>
              </button>
              <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary); min-width: 60px; text-align: center;">
                {{ q1Data.q7_stepper }}
              </div>
              <button class="ui-stepper-btn" (click)="changeStepper(1)" [disabled]="!isEditMode || q1Data.q7_stepper >= 10">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>

          <!-- Q4: Impact sur la vie quotidienne -->
          <div class="custom-card-block" style="background: white; padding: 24px; border: 1px solid var(--border); border-radius: 12px;">
            <h4 style="margin-top: 0; font-size: 1.1rem; margin-bottom: 20px;">4. Impact sur votre capacité de travail</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
              <div class="ui-card-small" [class.selected]="q1Data.q4 === 'Aucun'" [class.disabled]="!isEditMode && q1Data.q4 !== 'Aucun'" (click)="setQ1Data('q4', 'Aucun')">
                <span style="font-weight: 600;">Aucun impact</span>
              </div>
              <div class="ui-card-small" [class.selected]="q1Data.q4 === 'Modere'" [class.disabled]="!isEditMode && q1Data.q4 !== 'Modere'" (click)="setQ1Data('q4', 'Modere')">
                <span style="font-weight: 600;">Impact modéré</span>
              </div>
              <div class="ui-card-small" [class.selected]="q1Data.q4 === 'Important'" [class.disabled]="!isEditMode && q1Data.q4 !== 'Important'" (click)="setQ1Data('q4', 'Important')">
                <span style="font-weight: 600;">Impact très important</span>
              </div>
            </div>
          </div>

        </ng-container>

        <ng-template #defaultQuestions>
        <div class="q-block" *ngFor="let q of questions" style="background: white; padding: 20px; border: 1px solid var(--border); border-radius: 8px;">`;

if (content.includes('ng-container *ngIf="activeQuestionnaireId === \'q1\'"')) {
    console.log("Already patched.");
    process.exit(0);
}

content = content.replace(target, customUI);

const targetEnd = `</button>
             </div>

           </div>
        </div>

      </div>`;

const customUIEnd = `</button>
             </div>

           </div>
        </div>
        </ng-template>

      </div>`;

// Find the last occurrence or replace properly. Let's make sure it replaced.
if (!content.includes(customUI)) {
    console.log("Failed to inject customUI at the start.");
    process.exit(1);
}

content = content.replace(targetEnd, customUIEnd);
if (!content.includes('</ng-template>')) {
    console.log("Failed to inject ng-template closing.");
    process.exit(1);
}

fs.writeFileSync(file, content);
console.log("HTML Patched!");
