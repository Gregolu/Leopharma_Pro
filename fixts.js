const fs = require('fs');

const tsCode = \`import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-dossier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-dossier.component.html',
  styleUrls: ['./patient-dossier.component.scss']
})
export class PatientDossierComponent implements OnInit {
  isEditMode: boolean = false;
  activeQuestionnaireId: string = 'q1';
  activeQuestionnaireName: string = 'Analyse des mains';
  activeInstanceId: string = 'inst1';
  currentProgressIndicator: number = 75;

  categories: any[] = [
    {
      id: 'c1', name: 'Analyse', expanded: true,
      questionnaires: [
        { id: 'q1', name: 'Analyse des mains', status: 'completed', type: 'pro' },
        { id: 'q2', name: 'Scan produits', status: 'completed', type: 'mixed' }
      ]
    },
    {
      id: 'c2', name: 'Qualité de vie', expanded: false,
      questionnaires: [
        { id: 'q3', name: 'Votre qualité de vie', status: 'incomplete', type: 'patient' }
      ]
    },
    {
      id: 'c3', name: 'Analyse détaillée (IGA-ACHE)', expanded: false,
      questionnaires: [
        { id: 'q4', name: 'Analyse détaillée des rougeurs', status: 'incomplete', type: 'pro' },
        { id: 'q5', name: 'Analyse détaillée peau qui pèle', status: 'completed', type: 'pro' },
        { id: 'q6', name: 'Analyse détaillée peau épaissie', status: 'completed', type: 'pro' }
      ]
    },
    {
      id: 'c4', name: 'État de santé', expanded: false,
      questionnaires: [
        { id: 'q7', name: 'État de santé général', status: 'completed', type: 'patient' }
      ]
    }
  ];

  instances: any[] = [
    { id: 'inst1', date: '21/08', followUp: 'M4', progress: 75 },
    { id: 'inst2', date: '04/05', followUp: 'M1', progress: 100 }
  ];

  questions: any[] = [];

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questions = [
      {
        id: 'qu1',
        text: 'Évaluation globale du médecin de la sévérité',
        options: ['Clair (0)', 'Presque clair (1)', 'Léger (2)', 'Modéré (3)', 'Sévère (4)'],
        value: 'Léger (2)',
        originalValue: 'Léger (2)',
        modified: false
      },
      {
        id: 'qu2',
        text: 'Étendue de la desquamation / peau qui pèle',
        options: ['Aucune', 'Légère', 'Modérée', 'Sévère'],
        value: 'Modérée',
        originalValue: 'Modérée',
        modified: false
      }
    ];
  }

  toggleCategory(cat: any) {
    cat.expanded = !cat.expanded;
  }

  selectQuestionnaire(q: any) {
    this.activeQuestionnaireId = q.id;
    this.activeQuestionnaireName = q.name;
    this.loadQuestions();
    this.isEditMode = false;
  }

  selectInstance(inst: any) {
    this.activeInstanceId = inst.id;
    this.currentProgressIndicator = inst.progress;
    this.loadQuestions();
    this.isEditMode = false;
  }

  createNewInstance() {
    const newId = \\\`inst\${this.instances.length + 1}\\\`;
    this.instances.unshift({
      id: newId,
      date: 'Aujourdhui',
      followUp: 'Nouveau',
      progress: 0
    });
    this.selectInstance(this.instances[0]);
    this.isEditMode = true;
  }

  toggleEditMode() {
    this.isEditMode = true;
  }

  cancelEdits() {
    this.isEditMode = false;
    this.questions.forEach(q => {
      if (q.modified) {
        q.value = q.originalValue;
        q.modified = false;
      }
    });
  }

  saveEdits() {
    this.isEditMode = false;
    let completed = 0;
    this.questions.forEach(q => {
      q.originalValue = q.value;
      q.modified = false;
      if (q.value) completed++;
    });
    
    this.currentProgressIndicator = Math.round((completed / this.questions.length) * 100);
    const currInst = this.instances.find(i => i.id === this.activeInstanceId);
    if (currInst) {
      currInst.progress = this.currentProgressIndicator;
    }
  }

  selectOption(q: any, opt: string) {
    if (!this.isEditMode) return;
    q.value = opt;
    q.modified = q.value !== q.originalValue;
  }

  undoChange(q: any) {
    q.value = q.originalValue;
    q.modified = false;
  }

  showHistory(q: any) {
    alert('Historique');
  }
}
\`;

fs.writeFileSync('src/app/pages/patients/patient-dossier/patient-dossier.component.ts', tsCode);
console.log('TS updated');
