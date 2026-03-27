const fs = require('fs');

const htmlPath = 'src/app/pages/patients/patient-dossier/patient-dossier.component.html';
const scssPath = 'src/app/pages/patients/patient-dossier/patient-dossier.component.scss';

// 1. UPDATE SCSS
let scss = fs.readFileSync(scssPath, 'utf8');

// remove previous ui-* definitions at the end
scss = scss.replace(/\.ui-card-btn \{[\s\S]*?\.custom-card-block \{.*?\}/, '');

const newScss = `
.custom-card-block {
    background: #ffffff;
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    margin-bottom: 20px;
}

.custom-card-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #111827;
    margin-top: 0;
    margin-bottom: 20px;
}

/* Big Grid Buttons (Oui / Non, Droitier / Gaucher) */
.ui-card-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f9fafb;
    border: 1px solid transparent;
    border-radius: 12px;
    padding: 24px 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #374151;
    font-weight: 500;
}
.ui-card-btn i {
    font-size: 1.8rem;
    margin-bottom: 12px;
    color: #6b7280;
    font-weight: 300; /* For thinner icons if using pro fonts, fallback for solid */
}
.ui-card-btn:hover:not(.disabled) {
    background: #f3f4f6;
}
.ui-card-btn.selected {
    border-color: var(--primary, #1a5632);
    background: rgba(46, 125, 50, 0.05); /* very light green */
    color: #000; /* or var(--primary) but screenshot has dark text */
}
.ui-card-btn.selected i {
    color: var(--primary, #1a5632);
}
.ui-card-btn.disabled { opacity: 0.5; cursor: default; }

/* List Row Options (Q5, Q8, etc.) */
.ui-list-row {
    display: flex;
    align-items: center;
    background: #f9fafb;
    border: 1px solid #f3f4f6; /* soft border instead of transparent for differentiation in screenshot */
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    cursor: pointer;
    transition: all 0.2s;
    color: #374151;
    font-weight: 500;
}
.ui-list-row:last-child { margin-bottom: 0; }
.ui-list-row i {
    margin-right: 12px;
    font-size: 1.3rem;
    color: #6b7280;
}
.ui-list-row:hover:not(.disabled) {
    background: #f3f4f6;
}
.ui-list-row.selected {
    border-color: var(--primary, #1a5632);
    background: rgba(46, 125, 50, 0.08); /* light green matching screenshot */
}
.ui-list-row.selected i {
    color: #000;
}
.ui-list-row.disabled { opacity: 0.5; cursor: default; }

/* 2 Column Grid Rows (Q11 Circonstances) */
.ui-grid-rows {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}
.ui-grid-rows .ui-list-row {
    margin-bottom: 0;
}

/* Stepper (Q7) */
.ui-stepper-wrap {
    background: #f9fafb;
    border-radius: 30px;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
}
.ui-stepper-btn {
    background: white;
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.5rem;
    color: #111827;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05); /* very soft shadow */
    transition: all 0.2s;
}
.ui-stepper-btn:hover:not([disabled]) { box-shadow: 0 4px 8px rgba(0,0,0,0.08); }
.ui-stepper-btn[disabled] { opacity: 0.4; cursor: default; }

.ui-stepper-val {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    min-width: 40px;
    text-align: center;
}

/* Date input */
.ui-date-input {
    width: 100%;
    padding: 16px;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    color: #111827;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s;
}
.ui-date-input:focus {
    border-color: var(--primary, #1a5632);
}

.save-btn-bottom {
    display: block;
    width: 100%;
    background: var(--primary, #1a5632);
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    text-align: center;
    padding: 18px;
    border-radius: 30px; /* Big pill shape */
    border: none;
    cursor: pointer;
    margin-top: 32px;
}
.save-btn-bottom:hover {
    background: var(--primary-light, #236c40);
}
`;
scss += newScss;
fs.writeFileSync(scssPath, scss);

// 2. UPDATE HTML
let html = fs.readFileSync(htmlPath, 'utf8');

const startTagStr = '<!-- CUSTOM UI FOR Q1 -->';
const endTagStr = '</ng-container>';

const startIdx = html.indexOf(startTagStr);
const endIdx = html.indexOf(endTagStr, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const replacement = `<!-- CUSTOM UI FOR Q1 -->
        <ng-container *ngIf="activeQuestionnaireId === 'q1'; else defaultQuestions">
          
          <!-- Q1: Lésions mains et poignets -->
          <div class="custom-card-block">
            <h4 class="custom-card-title">1. Avez-vous des lésions sur les mains et les poignets ?</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
              <div class="ui-card-btn" [class.selected]="q1Data.q1_lesions === 'Oui'" [class.disabled]="!isEditMode && q1Data.q1_lesions !== 'Oui'" (click)="setQ1Data('q1_lesions', 'Oui')">
                <!-- Using fa-hands as fallback, styling to be thin via opacity or specific icon -->
                <i class="far fa-hand-paper"></i>
                <span>Oui</span>
              </div>
              <div class="ui-card-btn" [class.selected]="q1Data.q1_lesions === 'Non'" [class.disabled]="!isEditMode && q1Data.q1_lesions !== 'Non'" (click)="setQ1Data('q1_lesions', 'Non')">
                <i class="fas fa-ban"></i>
                <span>Non</span>
              </div>
            </div>
          </div>

          <!-- Q2 conditional -> Not shown in user screenshot directly but implied. We adapt styling -->
          <div class="custom-card-block" *ngIf="q1Data.q1_lesions === 'Oui'">
            <h4 class="custom-card-title">2. Si oui, où se situent les lésions ? (Sélection multiple)</h4>
            
            <div style="margin-bottom: 12px; font-weight: 500; font-size: 0.95rem;">Zone touchée</div>
            <div class="ui-grid-rows" style="margin-bottom: 24px;">
              <div class="ui-list-row" [class.selected]="q1Data.q2_locations.includes('Doigt')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q2_locations', 'Doigt')">
                <span>Doigt</span>
              </div>
              <div class="ui-list-row" [class.selected]="q1Data.q2_locations.includes('Bout des doigts')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q2_locations', 'Bout des doigts')">
                <span>Bout des doigts</span>
              </div>
              <div class="ui-list-row" [class.selected]="q1Data.q2_locations.includes('Paume')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q2_locations', 'Paume')">
                <span>Paume de la main</span>
              </div>
              <div class="ui-list-row" [class.selected]="q1Data.q2_locations.includes('Dos')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q2_locations', 'Dos')">
                <span>Dos de la main</span>
              </div>
              <div class="ui-list-row" [class.selected]="q1Data.q2_locations.includes('Poignet')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q2_locations', 'Poignet')">
                <span>Poignet</span>
              </div>
            </div>

            <div style="margin-bottom: 12px; font-weight: 500; font-size: 0.95rem;">Côté</div>
            <div class="ui-grid-rows">
              <div class="ui-list-row" [class.selected]="q1Data.q2_side.includes('Gauche')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q2_side', 'Gauche')">
                <span>Main gauche</span>
              </div>
              <div class="ui-list-row" [class.selected]="q1Data.q2_side.includes('Droite')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q2_side', 'Droite')">
                <span>Main droite</span>
              </div>
            </div>
          </div>

          <!-- Q3: Droitier ou Gaucher -->
          <div class="custom-card-block">
            <h4 class="custom-card-title">3. Êtes-vous droitier ou gaucher ?</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
              <div class="ui-card-btn" [class.selected]="q1Data.q3_handed === 'Gaucher'" [class.disabled]="!isEditMode && q1Data.q3_handed !== 'Gaucher'" (click)="setQ1Data('q3_handed', 'Gaucher')">
                <i class="far fa-hand-paper" style="transform: scaleX(-1);"></i>
                <span>Gaucher</span>
              </div>
              <div class="ui-card-btn" [class.selected]="q1Data.q3_handed === 'Droitier'" [class.disabled]="!isEditMode && q1Data.q3_handed !== 'Droitier'" (click)="setQ1Data('q3_handed', 'Droitier')">
                <i class="far fa-hand-paper"></i>
                <span>Droitier</span>
              </div>
            </div>
          </div>

          <!-- Q4: Autre zone -->
          <div class="custom-card-block">
            <h4 class="custom-card-title">4. Avez-vous des lésions sur une autre zone du corps ?</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
              <div class="ui-card-btn" style="padding: 16px 8px;" [class.selected]="q1Data.q4_other_body === 'Oui'" [class.disabled]="!isEditMode && q1Data.q4_other_body !== 'Oui'" (click)="setQ1Data('q4_other_body', 'Oui')">
                <i class="fas fa-check" style="font-size: 1.5rem;"></i>
                <span>Oui</span>
              </div>
              <div class="ui-card-btn" style="padding: 16px 8px;" [class.selected]="q1Data.q4_other_body === 'Non'" [class.disabled]="!isEditMode && q1Data.q4_other_body !== 'Non'" (click)="setQ1Data('q4_other_body', 'Non')">
                <i class="fas fa-times" style="font-size: 1.5rem;"></i>
                <span>Non</span>
              </div>
              <div class="ui-card-btn" style="padding: 16px 8px;" [class.selected]="q1Data.q4_other_body === 'Nsp'" [class.disabled]="!isEditMode && q1Data.q4_other_body !== 'Nsp'" (click)="setQ1Data('q4_other_body', 'Nsp')">
                <i class="far fa-question-circle" style="font-size: 1.5rem;"></i>
                <span>Ne sait pas</span>
              </div>
            </div>
          </div>

          <!-- Q5: Depuis combien de temps -->
          <div class="custom-card-block">
            <h4 class="custom-card-title">5. Depuis combien de temps les lésions sont-elles présentes ?</h4>
            <div class="ui-list-row" [class.selected]="q1Data.q5_duration === 'Moins 3m'" [class.disabled]="!isEditMode && q1Data.q5_duration !== 'Moins 3m'" (click)="setQ1Data('q5_duration', 'Moins 3m')">
              <i class="far fa-clock"></i>
              <span>Moins de 3 mois</span>
            </div>
            <div class="ui-list-row" [class.selected]="q1Data.q5_duration === '3 a 12m'" [class.disabled]="!isEditMode && q1Data.q5_duration !== '3 a 12m'" (click)="setQ1Data('q5_duration', '3 a 12m')">
              <i class="far fa-calendar"></i>
              <span>3 à 12 mois</span>
            </div>
            <div class="ui-list-row" [class.selected]="q1Data.q5_duration === 'Plus 1an'" [class.disabled]="!isEditMode && q1Data.q5_duration !== 'Plus 1an'" (click)="setQ1Data('q5_duration', 'Plus 1an')">
              <i class="far fa-clock"></i>
              <span>Plus d'un an</span>
            </div>
          </div>

          <!-- Q6: Si plus d'un an, date -->
          <div class="custom-card-block" *ngIf="q1Data.q5_duration === 'Plus 1an'">
            <h4 class="custom-card-title">6. Si plus d'un an, depuis quelle date ?</h4>
            <div style="display: flex; align-items: center; justify-content: center;">
              <input type="month" class="ui-date-input" [disabled]="!isEditMode" [value]="q1Data.q6_date" (change)="setQ1Data('q6_date', $event.target.value)">
            </div>
          </div>

          <!-- Q7: Poussées sur 12 mois -->
          <div class="custom-card-block">
            <h4 class="custom-card-title">7. Combien de poussées sur 12 mois ?</h4>
            <div class="ui-stepper-wrap">
              <button class="ui-stepper-btn" (click)="changeStepper('q7_poussees', -1)" [disabled]="!isEditMode || q1Data.q7_poussees <= 0">
                <i class="fas fa-minus" style="font-size: 1rem;"></i>
              </button>
              <div class="ui-stepper-val">
                {{ q1Data.q7_poussees || 0 }}
              </div>
              <button class="ui-stepper-btn" (click)="changeStepper('q7_poussees', 1)" [disabled]="!isEditMode">
                <i class="fas fa-plus" style="font-size: 1rem;"></i>
              </button>
            </div>
          </div>

          <!-- Q8: Durée moyenne poussée -->
          <div class="custom-card-block">
            <h4 class="custom-card-title">8. Durée moyenne d'une poussée</h4>
            <div class="ui-list-row" [class.selected]="q1Data.q8_duree === 'Jours'" [class.disabled]="!isEditMode && q1Data.q8_duree !== 'Jours'" (click)="setQ1Data('q8_duree', 'Jours')">
              <i class="far fa-calendar-alt"></i>
              <span>Quelques jours</span>
            </div>
            <div class="ui-list-row" [class.selected]="q1Data.q8_duree === '1 Semaine'" [class.disabled]="!isEditMode && q1Data.q8_duree !== '1 Semaine'" (click)="setQ1Data('q8_duree', '1 Semaine')">
              <i class="far fa-calendar-alt"></i>
              <span>1 semaine</span>
            </div>
            <div class="ui-list-row" [class.selected]="q1Data.q8_duree === 'Plusieurs Semaines'" [class.disabled]="!isEditMode && q1Data.q8_duree !== 'Plusieurs Semaines'" (click)="setQ1Data('q8_duree', 'Plusieurs Semaines')">
              <i class="far fa-calendar-alt"></i>
              <span>Plusieurs semaines</span>
            </div>
          </div>

          <!-- Q9: Pieds touchés -->
          <div class="custom-card-block">
            <h4 class="custom-card-title">9. Vos pieds sont-ils touchés ?</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
              <div class="ui-card-btn" style="padding: 16px 8px;" [class.selected]="q1Data.q9_pieds === 'Oui'" [class.disabled]="!isEditMode && q1Data.q9_pieds !== 'Oui'" (click)="setQ1Data('q9_pieds', 'Oui')">
                <i class="far fa-dot-circle" style="font-size: 1.5rem;"></i>
                <span>Oui</span>
              </div>
              <div class="ui-card-btn" style="padding: 16px 8px;" [class.selected]="q1Data.q9_pieds === 'Non'" [class.disabled]="!isEditMode && q1Data.q9_pieds !== 'Non'" (click)="setQ1Data('q9_pieds', 'Non')">
                <i class="fas fa-ban" style="font-size: 1.5rem;"></i>
                <span>Non</span>
              </div>
            </div>
          </div>

          <!-- Q10: Apparition -->
          <div class="custom-card-block">
            <h4 class="custom-card-title">10. Apparition des lésions</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
              <div class="ui-card-btn" style="padding: 16px 8px;" [class.selected]="q1Data.q10_apparition === 'Progressive'" [class.disabled]="!isEditMode && q1Data.q10_apparition !== 'Progressive'" (click)="setQ1Data('q10_apparition', 'Progressive')">
                <i class="fas fa-chart-line" style="font-size: 1.5rem;"></i>
                <span>Progressivement</span>
              </div>
              <div class="ui-card-btn" style="padding: 16px 8px;" [class.selected]="q1Data.q10_apparition === 'Brutale'" [class.disabled]="!isEditMode && q1Data.q10_apparition !== 'Brutale'" (click)="setQ1Data('q10_apparition', 'Brutale')">
                <i class="fas fa-bolt" style="font-size: 1.5rem;"></i>
                <span>Brutalement</span>
              </div>
            </div>
          </div>

          <!-- Q11: Circonstances -->
          <div class="custom-card-block">
            <h4 class="custom-card-title">11. Circonstances du début</h4>
            <div class="ui-grid-rows">
              
              <div class="ui-list-row" [class.selected]="q1Data.q11_circonstances.includes('Travail')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q11_circonstances', 'Travail')">
                <i class="fas fa-suitcase"></i>
                <span>Travail</span>
              </div>

              <div class="ui-list-row" [class.selected]="q1Data.q11_circonstances.includes('Maison')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q11_circonstances', 'Maison')">
                <i class="fas fa-home"></i>
                <span>Maison</span>
              </div>

              <div class="ui-list-row" [class.selected]="q1Data.q11_circonstances.includes('Produits')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q11_circonstances', 'Produits')">
                <i class="fas fa-tint"></i>
                <span>Nouveaux produits</span>
              </div>

              <div class="ui-list-row" [class.selected]="q1Data.q11_circonstances.includes('Stress')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q11_circonstances', 'Stress')">
                <i class="far fa-smile"></i>
                <span>Stress</span>
              </div>

              <div class="ui-list-row" [class.selected]="q1Data.q11_circonstances.includes('Saison')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q11_circonstances', 'Saison')">
                <i class="fas fa-cloud-sun"></i>
                <span>Saison</span>
              </div>

              <div class="ui-list-row" [class.selected]="q1Data.q11_circonstances.includes('Autre')" [class.disabled]="!isEditMode" (click)="toggleQ1Multi('q11_circonstances', 'Autre')">
                <i class="fas fa-pen"></i>
                <span>Autre</span>
              </div>

            </div>
          </div>
          
          <button class="save-btn-bottom">Sauvegarder et passer à la suite</button>

        </ng-container>`;

    html = html.substring(0, startIdx) + replacement + html.substring(endIdx + endTagStr.length);
    fs.writeFileSync(htmlPath, html);
    console.log("HTML and SCSS fully updated according to the screenshots design.");
} else {
    console.log("Could not find insertion points in HTML.");
}
