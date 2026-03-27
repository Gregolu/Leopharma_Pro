const fs = require('fs');

// 1. PATCH TS FILE
const tsPath = 'src/app/pages/patients/patient-dossier/patient-dossier.component.ts';
let ts = fs.readFileSync(tsPath, 'utf8');

// Replace q1Data object
ts = ts.replace(/q1Data: any = \{[\s\S]*?\};\n/, `q1Data: any = {
    q1_lesions: null,
    q2_locations: [],
    q2_side: [],
    q3_handed: null,
    q4_other_body: null,
    q5_duration: null,
    q6_date: '',
    q7_poussees: 0,
    q8_duree: null,
    q9_pieds: null,
    q10_apparition: null,
    q11_circonstances: []
  };\n`);

// Replace changeStepper method
ts = ts.replace(/changeStepper\(delta: number\) \{[\s\S]*?this\.q1Data\.q7_stepper = n;\n  \}/, `changeStepper(field: string, delta: number) {
    if (!this.isEditMode) return;
    let n = (this.q1Data[field] || 0) + delta;
    if (n < 0) n = 0;
    this.q1Data[field] = n;
  }`);

fs.writeFileSync(tsPath, ts);

// 2. PATCH HTML FILE
const htmlPath = 'src/app/pages/patients/patient-dossier/patient-dossier.component.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const startTagStr = '<!-- CUSTOM UI FOR Q1 -->';
const endTagStr = '</ng-container>';

const startIdx = html.indexOf(startTagStr);
if (startIdx !== -1) {
    const endIdx = html.indexOf(endTagStr, startIdx);
    if (endIdx !== -1) {
        
        const replacement = `<!-- CUSTOM UI FOR Q1 -->
        <ng-container *ngIf="activeQuestionnaireId === 'q1'; else defaultQuestions">
          
          <!-- Q1: Lésions mains et poignets -->
          <div class="custom-card-block" style="background: white; padding: 24px; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 24px;">
            <h4 style="margin-top: 0; font-size: 1.1rem; margin-bottom: 20px;">1. Avez-vous des lésions sur les mains et les poignets ?</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
              <div class="ui-card-btn" [class.selected]="q1Data.q1_lesions === 'Oui'" [class.disabled]="!isEditMode && q1Data.q1_lesions !== 'Oui'" (click)="setQ1Data('q1_lesions', 'Oui')">
                <i class="fas fa-hand-paper" style="font-size: 2rem; margin-bottom: 12px; color: var(--primary);"></i>
                <span style="font-weight: 600;">Oui</span>
              </div>
              <div class="ui-card-btn" [class.selected]="q1Data.q1_lesions === 'Non'" [class.disabled]="!isEditMode && q1Data.q1_lesions !== 'Non'" (click)="setQ1Data('q1_lesions', 'Non')">
                <i class="far fa-circle" style="font-size: 2rem; margin-bottom: 12px; color: var(--text-secondary);"></i>
                <span style="font-weight: 600;">Non</span>
              </div>
            </div>
          </div>

          <!-- Q2: Si oui, où ? (Conditionnel) -->
          <div class="custom-card-block" *ngIf="q1Data.q1_lesions === 'Oui'" style="background: white; padding: 24px; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 24px;">
            <h4 style="margin-top: 0; font-size: 1.1rem; margin-bottom: 20px;">2. Si oui, où se situent les lésions ? (Sélection multiple)</h4>
            
            <div style="margin-bottom: 16px; font-weight: 600; color: var(--text-secondary); font-size: 0.9rem; text-transform: uppercase;">Zone touchée</div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 24px;">
              <div class="ui-selection-row" [class.selected]="q1Data.q2_locations.includes('Doigt')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q2_locations', 'Doigt')">
                <i class="fas fa-hand-point-up" style="margin-right: 12px; font-size: 1.2rem;" [style.color]="q1Data.q2_locations.includes('Doigt') ? 'var(--primary)' : 'var(--border)'"></i>
                <span style="flex: 1; font-weight: 500;">Doigt</span>
                <i class="fas fa-check" *ngIf="q1Data.q2_locations.includes('Doigt')" style="color: var(--primary);"></i>
              </div>
              <div class="ui-selection-row" [class.selected]="q1Data.q2_locations.includes('Bout des doigts')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q2_locations', 'Bout des doigts')">
                <i class="fas fa-hand-sparkles" style="margin-right: 12px; font-size: 1.2rem;" [style.color]="q1Data.q2_locations.includes('Bout des doigts') ? 'var(--primary)' : 'var(--border)'"></i>
                <span style="flex: 1; font-weight: 500;">Bout des doigts</span>
                <i class="fas fa-check" *ngIf="q1Data.q2_locations.includes('Bout des doigts')" style="color: var(--primary);"></i>
              </div>
              <div class="ui-selection-row" [class.selected]="q1Data.q2_locations.includes('Paume')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q2_locations', 'Paume')">
                <i class="fas fa-hand-paper" style="margin-right: 12px; font-size: 1.2rem;" [style.color]="q1Data.q2_locations.includes('Paume') ? 'var(--primary)' : 'var(--border)'"></i>
                <span style="flex: 1; font-weight: 500;">Paume de la main</span>
                <i class="fas fa-check" *ngIf="q1Data.q2_locations.includes('Paume')" style="color: var(--primary);"></i>
              </div>
              <div class="ui-selection-row" [class.selected]="q1Data.q2_locations.includes('Dos')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q2_locations', 'Dos')">
                <i class="fas fa-hand-back-fist" style="margin-right: 12px; font-size: 1.2rem;" [style.color]="q1Data.q2_locations.includes('Dos') ? 'var(--primary)' : 'var(--border)'"></i>
                <span style="flex: 1; font-weight: 500;">Dos de la main</span>
                <i class="fas fa-check" *ngIf="q1Data.q2_locations.includes('Dos')" style="color: var(--primary);"></i>
              </div>
              <div class="ui-selection-row" [class.selected]="q1Data.q2_locations.includes('Poignet')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q2_locations', 'Poignet')">
                <i class="fas fa-band-aid" style="margin-right: 12px; font-size: 1.2rem;" [style.color]="q1Data.q2_locations.includes('Poignet') ? 'var(--primary)' : 'var(--border)'"></i>
                <span style="flex: 1; font-weight: 500;">Poignet</span>
                <i class="fas fa-check" *ngIf="q1Data.q2_locations.includes('Poignet')" style="color: var(--primary);"></i>
              </div>
            </div>

            <div style="margin-bottom: 16px; font-weight: 600; color: var(--text-secondary); font-size: 0.9rem; text-transform: uppercase;">Côté</div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
              <div class="ui-selection-row" [class.selected]="q1Data.q2_side.includes('Gauche')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q2_side', 'Gauche')">
                <i class="fas fa-hand-point-left" style="margin-right: 12px; font-size: 1.2rem;" [style.color]="q1Data.q2_side.includes('Gauche') ? 'var(--primary)' : 'var(--border)'"></i>
                <span style="flex: 1; font-weight: 500;">Main gauche</span>
                <i class="fas fa-check" *ngIf="q1Data.q2_side.includes('Gauche')" style="color: var(--primary);"></i>
              </div>
              <div class="ui-selection-row" [class.selected]="q1Data.q2_side.includes('Droite')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q2_side', 'Droite')">
                <i class="fas fa-hand-point-right" style="margin-right: 12px; font-size: 1.2rem;" [style.color]="q1Data.q2_side.includes('Droite') ? 'var(--primary)' : 'var(--border)'"></i>
                <span style="flex: 1; font-weight: 500;">Main droite</span>
                <i class="fas fa-check" *ngIf="q1Data.q2_side.includes('Droite')" style="color: var(--primary);"></i>
              </div>
            </div>
          </div>

          <!-- Q3: Droitier ou Gaucher -->
          <div class="custom-card-block" style="background: white; padding: 24px; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 24px;">
            <h4 style="margin-top: 0; font-size: 1.1rem; margin-bottom: 20px;">3. Êtes-vous droitier ou gaucher ?</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
              <div class="ui-selection-row" style="padding: 16px; font-size: 1.1rem;" [class.selected]="q1Data.q3_handed === 'Droitier'" [class.disabled]="!isEditMode && q1Data.q3_handed !== 'Droitier'" (click)="setQ1Data('q3_handed', 'Droitier')">
                <i class="fas fa-hand-point-right" style="margin-right: 12px; color: var(--primary);"></i>
                <span style="flex: 1; font-weight: 600;">Droitier</span>
                <i class="fas fa-check" *ngIf="q1Data.q3_handed === 'Droitier'" style="color: var(--primary);"></i>
              </div>
              <div class="ui-selection-row" style="padding: 16px; font-size: 1.1rem;" [class.selected]="q1Data.q3_handed === 'Gaucher'" [class.disabled]="!isEditMode && q1Data.q3_handed !== 'Gaucher'" (click)="setQ1Data('q3_handed', 'Gaucher')">
                <i class="fas fa-hand-point-left" style="margin-right: 12px; color: var(--primary);"></i>
                <span style="flex: 1; font-weight: 600;">Gaucher</span>
                <i class="fas fa-check" *ngIf="q1Data.q3_handed === 'Gaucher'" style="color: var(--primary);"></i>
              </div>
            </div>
          </div>

          <!-- Q4: Autre zone -->
          <div class="custom-card-block" style="background: white; padding: 24px; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 24px;">
            <h4 style="margin-top: 0; font-size: 1.1rem; margin-bottom: 20px;">4. Avez-vous des lésions sur une autre zone du corps ?</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
              <div class="ui-selection-row" [class.selected]="q1Data.q4_other_body === 'Oui'" [class.disabled]="!isEditMode && q1Data.q4_other_body !== 'Oui'" (click)="setQ1Data('q4_other_body', 'Oui')">
                <i class="fas fa-check" style="margin-right: 12px; color: var(--primary);"></i>
                <span style="flex: 1; font-weight: 600;">Oui</span>
              </div>
              <div class="ui-selection-row" [class.selected]="q1Data.q4_other_body === 'Non'" [class.disabled]="!isEditMode && q1Data.q4_other_body !== 'Non'" (click)="setQ1Data('q4_other_body', 'Non')">
                <i class="fas fa-times" style="margin-right: 12px; color: #ef4444;"></i>
                <span style="flex: 1; font-weight: 600;">Non</span>
              </div>
              <div class="ui-selection-row" [class.selected]="q1Data.q4_other_body === 'Nsp'" [class.disabled]="!isEditMode && q1Data.q4_other_body !== 'Nsp'" (click)="setQ1Data('q4_other_body', 'Nsp')">
                <i class="fas fa-question" style="margin-right: 12px; color: var(--text-secondary);"></i>
                <span style="flex: 1; font-weight: 600;">Je ne sais pas</span>
              </div>
            </div>
          </div>

          <!-- Q5: Depuis combien de temps -->
          <div class="custom-card-block" style="background: white; padding: 24px; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 24px;">
            <h4 style="margin-top: 0; font-size: 1.1rem; margin-bottom: 20px;">5. Depuis combien de temps les lésions sont-elles présentes ?</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
              <div class="ui-card-btn" style="padding: 16px;" [class.selected]="q1Data.q5_duration === 'Moins 3m'" [class.disabled]="!isEditMode && q1Data.q5_duration !== 'Moins 3m'" (click)="setQ1Data('q5_duration', 'Moins 3m')">
                <i class="fas fa-stopwatch" style="font-size: 1.5rem; margin-bottom: 8px; color: #3b82f6;"></i>
                <span style="font-weight: 600;">Moins de 3 mois</span>
              </div>
              <div class="ui-card-btn" style="padding: 16px;" [class.selected]="q1Data.q5_duration === '3 a 12m'" [class.disabled]="!isEditMode && q1Data.q5_duration !== '3 a 12m'" (click)="setQ1Data('q5_duration', '3 a 12m')">
                <i class="far fa-calendar-alt" style="font-size: 1.5rem; margin-bottom: 8px; color: #f59e0b;"></i>
                <span style="font-weight: 600;">3 à 12 mois</span>
              </div>
              <div class="ui-card-btn" style="padding: 16px;" [class.selected]="q1Data.q5_duration === 'Plus 1an'" [class.disabled]="!isEditMode && q1Data.q5_duration !== 'Plus 1an'" (click)="setQ1Data('q5_duration', 'Plus 1an')">
                <i class="fas fa-history" style="font-size: 1.5rem; margin-bottom: 8px; color: #ef4444;"></i>
                <span style="font-weight: 600;">Plus d'un an</span>
              </div>
            </div>
          </div>

          <!-- Q6: Si plus d'un an, date -->
          <div class="custom-card-block" *ngIf="q1Data.q5_duration === 'Plus 1an'" style="background: white; padding: 24px; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 24px;">
            <h4 style="margin-top: 0; font-size: 1.1rem; margin-bottom: 20px;">6. Si plus d'un an, depuis quelle date ?</h4>
            <div style="display: flex; align-items: center; gap: 16px;">
                <i class="far fa-calendar-check" style="font-size: 1.5rem; color: var(--text-secondary);"></i>
                <input type="month" [disabled]="!isEditMode" [value]="q1Data.q6_date" (change)="setQ1Data('q6_date', $event.target.value)" style="padding: 12px 16px; border: 1px solid var(--border); border-radius: 8px; font-size: 1.1rem; color: var(--text-primary); font-family: inherit; width: 250px;">
            </div>
          </div>

          <!-- Q7: Poussées sur 12 mois -->
          <div class="custom-card-block" style="background: white; padding: 24px; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 24px;">
            <h4 style="margin-top: 0; font-size: 1.1rem; margin-bottom: 20px;">7. Combien de poussées sur 12 mois ?</h4>
            <div style="display: flex; align-items: center; justify-content: center; gap: 32px;">
              <button class="ui-stepper-btn" (click)="changeStepper('q7_poussees', -1)" [disabled]="!isEditMode || q1Data.q7_poussees <= 0">
                <i class="fas fa-minus"></i>
              </button>
              <div style="font-size: 3rem; font-weight: 700; color: var(--primary); min-width: 80px; text-align: center;">
                {{ q1Data.q7_poussees || 0 }}
              </div>
              <button class="ui-stepper-btn" (click)="changeStepper('q7_poussees', 1)" [disabled]="!isEditMode">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>

          <!-- Q8: Durée moyenne poussée -->
          <div class="custom-card-block" style="background: white; padding: 24px; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 24px;">
            <h4 style="margin-top: 0; font-size: 1.1rem; margin-bottom: 20px;">8. Durée moyenne d'une poussée</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
              <div class="ui-card-btn" style="padding: 16px; flex-direction: row; justify-content: flex-start; gap: 16px;" [class.selected]="q1Data.q8_duree === 'Jours'" [class.disabled]="!isEditMode && q1Data.q8_duree !== 'Jours'" (click)="setQ1Data('q8_duree', 'Jours')">
                <i class="far fa-calendar" style="font-size: 1.5rem; color: #10b981;"></i>
                <span style="font-weight: 600;">Quelques jours</span>
              </div>
              <div class="ui-card-btn" style="padding: 16px; flex-direction: row; justify-content: flex-start; gap: 16px;" [class.selected]="q1Data.q8_duree === '1 Semaine'" [class.disabled]="!isEditMode && q1Data.q8_duree !== '1 Semaine'" (click)="setQ1Data('q8_duree', '1 Semaine')">
                <i class="far fa-calendar-week" style="font-size: 1.5rem; color: #f59e0b;"></i>
                <span style="font-weight: 600;">1 semaine</span>
              </div>
              <div class="ui-card-btn" style="padding: 16px; flex-direction: row; justify-content: flex-start; gap: 16px;" [class.selected]="q1Data.q8_duree === 'Plusieurs Semaines'" [class.disabled]="!isEditMode && q1Data.q8_duree !== 'Plusieurs Semaines'" (click)="setQ1Data('q8_duree', 'Plusieurs Semaines')">
                <i class="far fa-calendar-alt" style="font-size: 1.5rem; color: #ef4444;"></i>
                <span style="font-weight: 600;">Plusieurs semaines</span>
              </div>
            </div>
          </div>

          <!-- Q9: Pieds touchés -->
          <div class="custom-card-block" style="background: white; padding: 24px; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 24px;">
            <h4 style="margin-top: 0; font-size: 1.1rem; margin-bottom: 20px;">9. Vos pieds sont-ils touchés ?</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
              <div class="ui-selection-row" [class.selected]="q1Data.q9_pieds === 'Oui'" [class.disabled]="!isEditMode && q1Data.q9_pieds !== 'Oui'" (click)="setQ1Data('q9_pieds', 'Oui')">
                <i class="fas fa-shoe-prints" style="margin-right: 12px; font-size: 1.2rem; color: var(--primary);"></i>
                <span style="flex: 1; font-weight: 600;">Oui</span>
                <i class="fas fa-check" *ngIf="q1Data.q9_pieds === 'Oui'" style="color: var(--primary);"></i>
              </div>
              <div class="ui-selection-row" [class.selected]="q1Data.q9_pieds === 'Non'" [class.disabled]="!isEditMode && q1Data.q9_pieds !== 'Non'" (click)="setQ1Data('q9_pieds', 'Non')">
                <i class="far fa-circle" style="margin-right: 12px; font-size: 1.2rem; color: var(--text-secondary);"></i>
                <span style="flex: 1; font-weight: 600;">Non</span>
                <i class="fas fa-check" *ngIf="q1Data.q9_pieds === 'Non'" style="color: var(--primary);"></i>
              </div>
            </div>
          </div>

          <!-- Q10: Apparition -->
          <div class="custom-card-block" style="background: white; padding: 24px; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 24px;">
            <h4 style="margin-top: 0; font-size: 1.1rem; margin-bottom: 20px;">10. Apparition des lésions</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
              <div class="ui-card-btn" style="padding: 16px; flex-direction: row; justify-content: center; gap: 16px;" [class.selected]="q1Data.q10_apparition === 'Progressive'" [class.disabled]="!isEditMode && q1Data.q10_apparition !== 'Progressive'" (click)="setQ1Data('q10_apparition', 'Progressive')">
                <i class="fas fa-chart-line" style="font-size: 1.5rem; color: #3b82f6;"></i>
                <span style="font-weight: 600;">Progressivement</span>
              </div>
              <div class="ui-card-btn" style="padding: 16px; flex-direction: row; justify-content: center; gap: 16px;" [class.selected]="q1Data.q10_apparition === 'Brutale'" [class.disabled]="!isEditMode && q1Data.q10_apparition !== 'Brutale'" (click)="setQ1Data('q10_apparition', 'Brutale')">
                <i class="fas fa-bolt" style="font-size: 1.5rem; color: #eab308;"></i>
                <span style="font-weight: 600;">Brutalement</span>
              </div>
            </div>
          </div>

          <!-- Q11: Circonstances -->
          <div class="custom-card-block" style="background: white; padding: 24px; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 24px;">
            <h4 style="margin-top: 0; font-size: 1.1rem; margin-bottom: 20px;">11. Circonstances du début (Sélection multiple)</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
              
              <div class="ui-selection-row" [class.selected]="q1Data.q11_circonstances.includes('Travail')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q11_circonstances', 'Travail')">
                <i class="fas fa-briefcase" style="margin-right: 12px; font-size: 1.2rem; width: 24px; text-align: center;" [style.color]="q1Data.q11_circonstances.includes('Travail') ? 'var(--primary)' : 'var(--text-secondary)'"></i>
                <span style="flex: 1; font-weight: 500;">Travail</span>
                <i class="fas fa-check" *ngIf="q1Data.q11_circonstances.includes('Travail')" style="color: var(--primary);"></i>
              </div>

              <div class="ui-selection-row" [class.selected]="q1Data.q11_circonstances.includes('Poste')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q11_circonstances', 'Poste')">
                <i class="fas fa-exchange-alt" style="margin-right: 12px; font-size: 1.2rem; width: 24px; text-align: center;" [style.color]="q1Data.q11_circonstances.includes('Poste') ? 'var(--primary)' : 'var(--text-secondary)'"></i>
                <span style="flex: 1; font-weight: 500;">Changement de poste</span>
                <i class="fas fa-check" *ngIf="q1Data.q11_circonstances.includes('Poste')" style="color: var(--primary);"></i>
              </div>

              <div class="ui-selection-row" [class.selected]="q1Data.q11_circonstances.includes('Maison')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q11_circonstances', 'Maison')">
                <i class="fas fa-home" style="margin-right: 12px; font-size: 1.2rem; width: 24px; text-align: center;" [style.color]="q1Data.q11_circonstances.includes('Maison') ? 'var(--primary)' : 'var(--text-secondary)'"></i>
                <span style="flex: 1; font-weight: 500;">Maison</span>
                <i class="fas fa-check" *ngIf="q1Data.q11_circonstances.includes('Maison')" style="color: var(--primary);"></i>
              </div>

              <div class="ui-selection-row" [class.selected]="q1Data.q11_circonstances.includes('Menage')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q11_circonstances', 'Menage')">
                <i class="fas fa-broom" style="margin-right: 12px; font-size: 1.2rem; width: 24px; text-align: center;" [style.color]="q1Data.q11_circonstances.includes('Menage') ? 'var(--primary)' : 'var(--text-secondary)'"></i>
                <span style="flex: 1; font-weight: 500;">Nouvelles tâches ménagères</span>
                <i class="fas fa-check" *ngIf="q1Data.q11_circonstances.includes('Menage')" style="color: var(--primary);"></i>
              </div>

              <div class="ui-selection-row" [class.selected]="q1Data.q11_circonstances.includes('Produits')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q11_circonstances', 'Produits')">
                <i class="fas fa-pump-soap" style="margin-right: 12px; font-size: 1.2rem; width: 24px; text-align: center;" [style.color]="q1Data.q11_circonstances.includes('Produits') ? 'var(--primary)' : 'var(--text-secondary)'"></i>
                <span style="flex: 1; font-weight: 500;">Nouveaux produits</span>
                <i class="fas fa-check" *ngIf="q1Data.q11_circonstances.includes('Produits')" style="color: var(--primary);"></i>
              </div>

              <div class="ui-selection-row" [class.selected]="q1Data.q11_circonstances.includes('Stress')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q11_circonstances', 'Stress')">
                <i class="fas fa-brain" style="margin-right: 12px; font-size: 1.2rem; width: 24px; text-align: center;" [style.color]="q1Data.q11_circonstances.includes('Stress') ? 'var(--primary)' : 'var(--text-secondary)'"></i>
                <span style="flex: 1; font-weight: 500;">Stress</span>
                <i class="fas fa-check" *ngIf="q1Data.q11_circonstances.includes('Stress')" style="color: var(--primary);"></i>
              </div>

              <div class="ui-selection-row" [class.selected]="q1Data.q11_circonstances.includes('Saison')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q11_circonstances', 'Saison')">
                <i class="fas fa-cloud-sun" style="margin-right: 12px; font-size: 1.2rem; width: 24px; text-align: center;" [style.color]="q1Data.q11_circonstances.includes('Saison') ? 'var(--primary)' : 'var(--text-secondary)'"></i>
                <span style="flex: 1; font-weight: 500;">Changement de saison</span>
                <i class="fas fa-check" *ngIf="q1Data.q11_circonstances.includes('Saison')" style="color: var(--primary);"></i>
              </div>

              <div class="ui-selection-row" [class.selected]="q1Data.q11_circonstances.includes('Grossesse')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q11_circonstances', 'Grossesse')">
                <i class="fas fa-baby" style="margin-right: 12px; font-size: 1.2rem; width: 24px; text-align: center;" [style.color]="q1Data.q11_circonstances.includes('Grossesse') ? 'var(--primary)' : 'var(--text-secondary)'"></i>
                <span style="flex: 1; font-weight: 500;">Grossesse / post-partum</span>
                <i class="fas fa-check" *ngIf="q1Data.q11_circonstances.includes('Grossesse')" style="color: var(--primary);"></i>
              </div>

              <div class="ui-selection-row" [class.selected]="q1Data.q11_circonstances.includes('Maladie')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q11_circonstances', 'Maladie')">
                <i class="fas fa-virus" style="margin-right: 12px; font-size: 1.2rem; width: 24px; text-align: center;" [style.color]="q1Data.q11_circonstances.includes('Maladie') ? 'var(--primary)' : 'var(--text-secondary)'"></i>
                <span style="flex: 1; font-weight: 500;">Maladie / infection</span>
                <i class="fas fa-check" *ngIf="q1Data.q11_circonstances.includes('Maladie')" style="color: var(--primary);"></i>
              </div>

              <div class="ui-selection-row" [class.selected]="q1Data.q11_circonstances.includes('Rien')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q11_circonstances', 'Rien')">
                <i class="fas fa-question-circle" style="margin-right: 12px; font-size: 1.2rem; width: 24px; text-align: center;" [style.color]="q1Data.q11_circonstances.includes('Rien') ? 'var(--primary)' : 'var(--text-secondary)'"></i>
                <span style="flex: 1; font-weight: 500;">Sans raison apparente</span>
                <i class="fas fa-check" *ngIf="q1Data.q11_circonstances.includes('Rien')" style="color: var(--primary);"></i>
              </div>

              <div class="ui-selection-row" [class.selected]="q1Data.q11_circonstances.includes('Autre')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q11_circonstances', 'Autre')">
                <i class="fas fa-pen" style="margin-right: 12px; font-size: 1.2rem; width: 24px; text-align: center;" [style.color]="q1Data.q11_circonstances.includes('Autre') ? 'var(--primary)' : 'var(--text-secondary)'"></i>
                <span style="flex: 1; font-weight: 500;">Autre</span>
                <i class="fas fa-check" *ngIf="q1Data.q11_circonstances.includes('Autre')" style="color: var(--primary);"></i>
              </div>

            </div>
          </div>

        </ng-container>`;

        html = html.substring(0, startIdx) + replacement + html.substring(endIdx + endTagStr.length);
        fs.writeFileSync(htmlPath, html);
        console.log("TS and HTML correctly fully updated for the 11 questions.");
    } else {
        console.log("END TAG NOT FOUND");
    }
} else {
    console.log("START TAG NOT FOUND");
}
