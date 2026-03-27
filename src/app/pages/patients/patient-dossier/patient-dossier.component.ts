import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-dossier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-dossier.component.html',
  styleUrls: ['./patient-dossier.component.scss'],
})
export class PatientDossierComponent implements OnInit {
  isEditMode: boolean = false;
  activeQuestionnaireId: string = 'q1';
  activeQuestionnaireName: string = 'Etat de santé générale de votre main';
  activeInstanceId: string = 'inst1';
  currentProgressIndicator: number = 75;

  categories: any[] = [
    {
      id: 'c1',
      name: 'Etat de la main',
      expanded: true,
      questionnaires: [
        { id: 'q1', name: 'Etat de santé générale de votre main', status: 'completed', type: 'pro' },
        { id: 'q2', name: 'Analyse détaillée des symptômes', status: 'incomplete', type: 'pro' },
      ],
    },
    {
      id: 'c2',
      name: 'Antécédents et traitements',
      expanded: true,
      questionnaires: [
        { id: 'q3', name: 'Antécédents médicaux', status: 'completed', type: 'patient' },
        { id: 'q4', name: 'Traitements', status: 'completed', type: 'patient' },
        { id: 'q5', name: 'Antécédents familiaux', status: 'incomplete', type: 'patient' },
      ],
    },
    {
      id: 'c3',
      name: 'Contexte de vie',
      expanded: true,
      questionnaires: [
        { id: 'q6', name: 'Profession et cadre de vie', status: 'completed', type: 'patient' },
        { id: 'q7', name: 'Exposition et facteurs aggravants', status: 'completed', type: 'patient' },
      ],
    },
    {
      id: 'c4',
      name: 'Qualité de vie',
      expanded: true,
      questionnaires: [
        { id: 'q8', name: 'Impact fonctionnel des mains', status: 'incomplete', type: 'patient' },
        { id: 'q9', name: 'Votre qualité de vie (dont stigmatisation)', status: 'incomplete', type: 'patient' },
      ],
    },
  ];

  instances: any[] = [
    { id: 'inst1', date: '21/08', followUp: 'M4', progress: 75 },
    { id: 'inst2', date: '04/05', followUp: 'M1', progress: 100 },
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
        modified: false,
      },
      {
        id: 'qu2',
        text: 'Étendue de la desquamation / peau qui pèle',
        options: ['Aucune', 'Légère', 'Modérée', 'Sévère'],
        value: 'Modérée',
        originalValue: 'Modérée',
        modified: false,
      },
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
    const newId = `inst${this.instances.length + 1}`;
    const newInst = {
      id: newId,
      date: "Aujourd'hui",
      followUp: 'Nouveau',
      progress: 0,
    };
    this.instances.unshift(newInst);

    // reset all answers
    this.questions.forEach((q) => {
      q.originalValue = '';
      q.value = '';
      q.modified = false;
      q.modifiedBy = '';
      q.modifiedAt = '';
    });

    this.selectInstance(newInst);
    this.isEditMode = true;
  }

  toggleEditMode() {
    this.isEditMode = true;
  }

  cancelEdits() {
    this.isEditMode = false;
    this.questions.forEach((q) => {
      if (q.modified) {
        q.value = q.originalValue;
        q.modified = false;
      }
    });
  }

  saveEdits() {
    this.isEditMode = false;
    let completed = 0;
    this.questions.forEach((q) => {
      q.originalValue = q.value;
      q.modified = false;
      if (q.value) completed++;
    });

    this.currentProgressIndicator = Math.round((completed / this.questions.length) * 100);
    const currInst = this.instances.find((i) => i.id === this.activeInstanceId);
    if (currInst) {
      currInst.progress = this.currentProgressIndicator;
    }
  }

  selectOption(q: any, opt: string) {
    if (!this.isEditMode) return;
    q.value = opt;
    this.markModified(q);
  }

  isOptionSelected(q: any, optLabel: string): boolean {
    if (Array.isArray(q.value)) {
      return q.value.includes(optLabel);
    }
    return q.value === optLabel;
  }

  showHistoryModal = false;
  selectedHistoryQuestion: any = null;

  showHistory(q: any) {
    this.selectedHistoryQuestion = q;
    this.showHistoryModal = true;
  }

  closeHistory() {
    this.showHistoryModal = false;
    this.selectedHistoryQuestion = null;
  }

  downloadDossier() {
    window.open('assets/Dossierpatient.pdf', '_blank');
  }

  undoChange(q: any) {
    q.value = Array.isArray(q.originalValue) ? [...q.originalValue] : q.originalValue;
    q.modified = false;
  }

  markModified(q: any) {
    if (q.value !== q.originalValue) {
      q.modified = true;
      q.modifiedBy = 'Moi même (Connecté)';
      q.modifiedAt = new Date().toLocaleDateString('fr-FR');
    } else {
      q.modified = false;
    }
  }

  // ==== DONNÉES SPÉCIFIQUES POUR "État de santé général de votre main" ====
  q1Data: any = {
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
  };

  setQ1Data(field: string, value: any) {
    if (!this.isEditMode) return;
    this.q1Data[field] = value;
  }

  toggleQ1Multi(field: string, value: string) {
    if (!this.isEditMode) return;
    const arr = this.q1Data[field];
    const idx = arr.indexOf(value);
    if (idx > -1) arr.splice(idx, 1);
    else arr.push(value);
  }

  changeStepper(field: string, delta: number) {
    if (!this.isEditMode) return;
    let n = (this.q1Data[field] || 0) + delta;
    if (n < 0) n = 0;
    this.q1Data[field] = n;
  }
}

