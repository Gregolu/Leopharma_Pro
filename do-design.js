const fs = require('fs');

const SCSS_PATH = 'src/app/pages/patients/patient-dossier/patient-dossier.component.scss';
let scss = fs.readFileSync(SCSS_PATH, 'utf8');

// Using clear additions
const newSCSS = \`
.triangle-vignette {
  width: 0; 
  height: 0; 
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 14px solid currentColor;
  display: inline-block;
  margin-right: 12px;
}
.triangle-pink { color: #ec4899; }
.triangle-green { color: #10b981; }

.cat-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 16px; 
  background-color: var(--primary); color: white; border-radius: 6px; margin-bottom: 6px;
  cursor: pointer; font-weight: 600;
}
.q-item {
  background-color: white; border: 1px solid var(--border); border-radius: 6px;
  padding: 10px 14px; margin-bottom: 6px; display: flex; align-items: center; cursor: pointer;
  transition: all 0.2s;
  &:hover { background: #fdfdfd; border-color: var(--primary-light); }
  &.active { border-color: var(--primary); border-width: 2px; }
}

.sidebar-legend {
  margin-top: auto;
  padding: 12px;
  font-size: 0.8rem;
  background: white; border-radius: 8px; border: 1px solid var(--border);
  .legend-title { font-size: 0.9rem; margin-bottom: 6px; margin-top: 0; }
  .legend-row { margin-bottom: 4px; display: flex; align-items: center; gap: 6px; }
}

.instances-block {
  display: flex; gap: 1rem; align-items: flex-start;
}
.instances-cards {
  display: flex; gap: 1rem; flex-wrap: wrap; flex: 1;
}
.instance-card {
  background: white; border: 1px solid var(--border); border-radius: 8px; padding: 12px;
  display: flex; flex-direction: column; gap: 4px; min-width: 140px; cursor: pointer;
  transition: all 0.2s;
  &.active { border: 2px solid var(--primary); }
  .card-date { font-weight: 700; color: var(--text-primary); font-size: 0.95rem; }
  .card-suivi { font-size: 0.85rem; color: var(--text-secondary); }
  .card-prog { font-size: 0.85rem; color: var(--primary); font-weight: 600; margin-top: 4px; }
}

.btn-create-icon {
  width: 48px; height: 48px; border-radius: 8px; border: 2px dashed var(--border); background: transparent;
  color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
  &:hover { border-color: var(--primary); color: var(--primary); }
}
\`;

fs.writeFileSync(SCSS_PATH, scss + '\\n' + newSCSS);

const HTML_PATH = 'src/app/pages/patients/patient-dossier/patient-dossier.component.html';
let html = \`
<div class="patient-dossier-wrapper">

  <!-- COLONNE GAUCHE: Navigation -->
  <div class="sidebar-left">
    
    <div class="categories-container" style="padding: 16px;">
      <div class="cat-group" *ngFor="let cat of categories">
        <div class="cat-header" (click)="toggleCategory(cat)">
          <span>{{ cat.name }}</span>
          <i class="fas" [ngClass]="cat.expanded ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
        </div>
        
        <div class="cat-list" *ngIf="cat.expanded">
          <div class="q-item" 
               *ngFor="let q of cat.questionnaires"
               [class.active]="activeQuestionnaireId === q.id"
               (click)="selectQuestionnaire(q)">
            
            <div class="status-dot" [class.success]="q.status === 'completed'" [class.error]="q.status === 'incomplete'"></div>
            <div class="q-name" style="flex: 1; margin-left: 8px; font-size: 0.9rem;">{{ q.name }}</div>
            
            <div class="q-type-icon" style="color: var(--text-secondary);">
               <i class="fas fa-user-injured" *ngIf="q.type === 'patient'" title="Patient"></i>
               <i class="fas fa-stethoscope" *ngIf="q.type === 'pro'" title="Professionnel"></i>
               <i class="fas fa-hands-helping" *ngIf="q.type === 'mixed'" title="Patient + professionnel"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Légende -->
    <div class="sidebar-legend" style="margin: 16px; margin-top: auto;">
      <h4 class="legend-title">Légende</h4>
      <div class="legend-row">
        <div class="status-dot success" style="width:10px;height:10px;background:#10b981;border-radius:50%;"></div> <span>Complété</span>
      </div>
      <div class="legend-row">
        <div class="status-dot error" style="width:10px;height:10px;background:#ef4444;border-radius:50%;"></div> <span>Non complété</span>
      </div>
      <div class="legend-row mt-2">
        <i class="fas fa-user-injured legend-icon" style="width:20px;text-align:center;"></i> <span>Patient</span>
      </div>
      <div class="legend-row">
        <i class="fas fa-stethoscope legend-icon" style="width:20px;text-align:center;"></i> <span>Professionnel</span>
      </div>
      <div class="legend-row">
        <i class="fas fa-hands-helping legend-icon" style="width:20px;text-align:center;"></i> <span>Patient + professionnel</span>
      </div>
    </div>

  </div>

  <!-- COLONNE DROITE: Contenu principal -->
  <div class="main-content" style="flex:1; padding: 2rem; overflow-y: auto;">
    
    <!-- HEADER -->
    <div class="dossier-header">
      <h2 class="q-main-title" style="margin-top:0; font-size: 1.5rem; color: var(--primary);">{{ activeQuestionnaireName }}</h2>
      
      <div class="header-split" style="display: flex; justify-content: space-between; align-items: flex-start; margin-top: 1.5rem;">
        
        <!-- Instances : Cards -->
        <div class="instances-block">
          <div class="instances-cards">
             <div class="instance-card" 
                  *ngFor="let inst of instances"
                  [class.active]="activeInstanceId === inst.id"
                  (click)="selectInstance(inst)">
                <div class="card-date"><i class="fas fa-calendar-day" style="margin-right:6px; color:var(--text-secondary)"></i>{{ inst.date }}</div>
                <div class="card-suivi">Suivi : <strong>{{ inst.followUp }}</strong></div>
                <div class="card-prog">Avancement : {{ inst.progress }}%</div>
             </div>
          </div>
          
          <button class="btn-create-icon" (click)="createNewInstance()" title="Créer une nouvelle instance">
             <i class="fas fa-plus"></i>
          </button>
        </div>

        <!-- Info clinique avec Triangles -->
        <div class="context-info-block" style="background: white; border: 1px solid var(--border); padding: 1rem; border-radius: 8px; min-width: 250px;">
          <div class="info-line" style="display: flex; align-items: center; margin-bottom: 12px;">
            <div class="triangle-vignette triangle-pink"></div> 
            <div class="info-texts">
               <div style="font-weight: 700; color: var(--text-primary);">Eczéma sévère</div>
               <div style="font-size: 0.8rem; color: var(--text-secondary); text-transform: uppercase;">Suivi thérapeutique</div>
            </div>
          </div>
          <div class="info-line" style="display: flex; align-items: center;">
            <div class="triangle-vignette triangle-green"></div> 
            <div class="info-texts">
               <div style="font-weight: 700; color: var(--text-primary);">Eczema Care Trial A</div>
               <div style="font-size: 0.8rem; color: var(--text-secondary); text-transform: uppercase;">Étude clinique</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="progress-wrapper mt-4" style="margin-top: 2rem;">
         <div class="prog-text-center" style="font-weight: 600; margin-bottom: 6px;">Pourcentage d'avancement : {{ currentProgressIndicator }}%</div>
         <div class="progress-bar-container" style="height: 8px; background: var(--border); border-radius: 4px; overflow: hidden;">
            <div class="bar-fill" [style.width.%]="currentProgressIndicator" style="height: 100%; background: var(--primary); transition: width 0.3s ease;"></div>
         </div>
      </div>
    </div>

    <hr class="header-divider" style="border:0; border-top: 1px solid var(--border); margin: 2rem 0;">

    <!-- QUESTIONS -->
    <div class="questionnaire-body">
      
      <div class="body-top-bar" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
         <div class="date-picker-mock" style="display:flex; align-items:center; gap: 1rem;">
            <label style="font-weight:600;">Date du questionnaire</label>
            <div class="input-wrapper" style="position:relative;">
               <input type="text" value="20/08/2025" [disabled]="!isEditMode" style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px;">
               <i class="fas fa-calendar-alt" style="position:absolute; right: 12px; transform: translateY(50%); top: 0px; color: var(--text-secondary);"></i>
            </div>
         </div>
         
         <!-- Bouton Modifier / Sauvegarder / Annuler -->
         <div class="actions-right">
            <button class="btn-action btn-outline" *ngIf="!isEditMode" (click)="toggleEditMode()" style="padding: 8px 16px; border-radius: 20px; border: 1px solid var(--primary); color: var(--primary); background: transparent; cursor: pointer; display:flex; align-items: center; gap: 8px; font-weight: 600;">
              <i class="fas fa-pen"></i> Modifier
            </button>
            <ng-container *ngIf="isEditMode">
              <button class="btn-action btn-outline" (click)="cancelEdits()" style="padding: 8px 16px; border-radius: 20px; border: 1px solid var(--text-secondary); color: var(--text-secondary); background: transparent; cursor: pointer; margin-right: 12px; font-weight: 600;">Annuler</button>
              <button class="btn-action btn-primary" (click)="saveEdits()" style="padding: 8px 16px; border-radius: 20px; border: none; color: white; background: var(--primary); cursor: pointer; font-weight: 600;">Sauvegarder</button>
            </ng-container>
         </div>
      </div>

      <div class="questions-list" style="display: flex; flex-direction: column; gap: 24px;">
        
        <div class="q-block" *ngFor="let q of questions" style="background: white; padding: 20px; border: 1px solid var(--border); border-radius: 8px;">
           <h4 class="question-text" style="margin-top: 0; margin-bottom: 16px; font-size: 1.1rem;">{{ q.text }}</h4>
           <div class="options-row custom-flex" style="display: flex; gap: 12px; flex-wrap: wrap;">
             
             <!-- Options -->
             <!-- We use orange color (#f97316) to show modification -->
             <button class="opt-btn" 
                     *ngFor="let opt of q.options"
                     [ngStyle]="{'background': q.value === opt ? (isEditMode && q.modified ? '#fff7ed' : 'var(--primary)') : 'transparent', 'color': q.value === opt ? (isEditMode && q.modified ? '#f97316' : 'white') : 'var(--text-primary)', 'border': q.value === opt ? (isEditMode && q.modified ? '1px solid #f97316' : '1px solid var(--primary)') : '1px solid var(--border)', 'opacity': !isEditMode && q.value !== opt ? 0.5 : 1}"
                     style="padding: 10px 16px; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 0.95rem; transition: all 0.2s;"
                     (click)="selectOption(q, opt)">
                {{ opt }}
             </button>

             <!-- Actions si modifié & historique -->
             <div class="edit-tools" style="display: flex; align-items: center; margin-left: auto; gap: 12px;" *ngIf="true">
                <button class="tool-btn undo-btn" *ngIf="isEditMode && q.modified" (click)="undoChange(q)" title="Annuler la modification" style="background: transparent; border: none; color: #f97316; cursor: pointer; font-size: 1.2rem;">
                  <i class="fas fa-undo"></i>
                </button>
                <button class="tool-btn hist-btn" (click)="showHistory(q)" title="Voir l'historique" style="background: transparent; border: none; color: var(--text-secondary); cursor: pointer; font-size: 1.2rem;">
                  <i class="fas fa-history"></i>
                </button>
             </div>

           </div>
        </div>

      </div>

    </div>

  </div>
</div>
\`;
fs.writeFileSync(HTML_PATH, html);
console.log("Success");
