import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ExportItem {
  id: string;
  date: Date;
  name: string;
  user: string;
  format: string;
  status: 'pending' | 'in-progress' | 'success' | 'error';
}

export interface ExportField {
  id: string;
  label: string;
  selected: boolean;
  type: 'checkbox' | 'radio' | 'select';
  options?: string[];
}

export interface ExportQuestionnaire {
  id: string;
  name: string;
  selected: boolean;
  fields: ExportField[];
}

export interface ExportCategory {
  name: string;
  selected: boolean;
  questionnaires: ExportQuestionnaire[];
}

@Component({
  selector: 'app-exportation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exportation.html',
  styleUrls: ['./exportation.scss']
})
export class ExportationComponent implements OnInit {
  view: 'list' | 'wizard' | 'summary' = 'list';
  
  exportsList: ExportItem[] = [
    { id: '1', date: new Date(), name: 'Export Global - Patients Sévères', user: 'Dr. Martin', format: 'Excel (.xlsx)', status: 'success' },
    { id: '2', date: new Date(Date.now() - 86400000), name: 'Analyse mensuelle Q1', user: 'Dr. Martin', format: 'CSV', status: 'error' },
    { id: '3', date: new Date(Date.now() - 172800000), name: 'Cohorte Pédiatrique 2023', user: 'Dr. Martin', format: 'JSON', status: 'success' },
    { id: '4', date: new Date(Date.now() - 259200000), name: 'Impact traitements topiques', user: 'Dr. Martin', format: 'Excel (.xlsx)', status: 'success' }
  ];

  lastExportStatus: 'pending' | 'in-progress' | 'success' | 'error' | null = null;
  currentExportRef: number = 0;

  // -- Wizard State --
  currentStep: number = 1;
  exportName: string = '';
  selectedFormat: string = 'Excel (.xlsx)';
  exportFormats: string[] = ['Excel (.xlsx)', 'CSV', 'TXT', 'JSON', 'SAV', 'DTA', 'SAS7BDAT'];

  // -- Etape 1 : Etudes cliniques --
  studies = [
    { id: 's1', name: 'Étude Eczéma Atopique Sévère' },
    { id: 's2', name: 'Cohorte pédiatrique' },
    { id: 's3', name: 'Impact des traitements topiques' },
    { id: 's4', name: 'Suivi longitudinal qualité de vie' }
  ];
  selectedStudy: string | null = null;

  // -- Etapes 2 et 3 : Profil Patient & Questionnaires --
  patientCategories: ExportCategory[] = [
    {
      name: 'Analyse',
      selected: true,
      questionnaires: [
        {
          id: 'q1', name: 'Analyse des mains', selected: true,
          fields: [
            { id: 'f1_1', label: 'Sévérité des lésions (Score global)', selected: true, type: 'radio', options: ['Léger', 'Modéré', 'Sévère'] },
            { id: 'f1_2', label: 'Présence de fissures ou craquelures', selected: true, type: 'checkbox' },
            { id: 'f1_3', label: 'Douleur ou prurit évalué (0-10)', selected: true, type: 'checkbox' }
          ]
        },
        {
          id: 'q2', name: 'Scan produit', selected: true,
          fields: [
            { id: 'f2_1', label: 'Produits émollients utilisés', selected: true, type: 'checkbox' },
            { id: 'f2_2', label: 'Fréquence d\'application hebdomadaire', selected: true, type: 'radio', options: ['1-2 fois', '3-5 fois', 'Quotidien'] }
          ]
        }
      ]
    },
    {
      name: 'Qualité de vie',
      selected: true,
      questionnaires: [
        {
          id: 'q3', name: 'Votre qualité de vie', selected: true,
          fields: [
            { id: 'f3_1', label: 'Impact sur la qualité du sommeil (DLQI)', selected: true, type: 'checkbox' },
            { id: 'f3_2', label: 'Impact sur les activités professionnelles', selected: true, type: 'checkbox' },
            { id: 'f3_3', label: 'Niveau de stress lié à la maladie', selected: true, type: 'checkbox' }
          ]
        }
      ]
    },
    {
      name: 'IGA-CHE',
      selected: true,
      questionnaires: [
        {
          id: 'q4', name: 'Analyse détaillée des rougeurs', selected: true,
          fields: [
            { id: 'f4_1', label: 'Score d\'érythème (0-4)', selected: true, type: 'checkbox' },
            { id: 'f4_2', label: 'Étendue des plaques érythémateuses', selected: true, type: 'checkbox' }
          ]
        },
        {
          id: 'q5', name: 'Analyse détaillée peau qui pèle', selected: true,
          fields: [
            { id: 'f5_1', label: 'Évaluation de la desquamation', selected: true, type: 'radio', options: ['Absente', 'Légère', 'Modérée', 'Sévère'] }
          ]
        },
        {
          id: 'q6', name: 'Analyse détaillée peau épaissie', selected: true,
          fields: [
            { id: 'f6_1', label: 'Lichénification (Épaisseur mesurée)', selected: true, type: 'checkbox' },
            { id: 'f6_2', label: 'Induration des fascias', selected: true, type: 'checkbox' }
          ]
        }
      ]
    },
    {
      name: 'État de santé',
      selected: true,
      questionnaires: [
        {
          id: 'q7', name: 'État de santé général', selected: true,
          fields: [
            { id: 'f7_1', label: 'Poids & Indice corporel (IMC)', selected: true, type: 'checkbox' },
            { id: 'f7_2', label: 'Antécédents d\'asthme ou rhinite', selected: true, type: 'checkbox' },
            { id: 'f7_3', label: 'Traitements systémiques en cours', selected: true, type: 'checkbox' }
          ]
        }
      ]
    }
  ];

  activeQuestionnaire: ExportQuestionnaire | null = null;
  baseCount = 2850;

  ngOnInit() {
    if (this.patientCategories.length > 0 && this.patientCategories[0].questionnaires.length > 0) {
      this.activeQuestionnaire = this.patientCategories[0].questionnaires[0];
    }
  }

  // --- Gestion du compteur dynamique ---
  get dynamicCount(): number {
    let count = this.baseCount;
    
    // Si étude sélectionnée, c'est un filtre puissant (réduit la population)
    if (this.selectedStudy) { count -= 1610; }

    // Déduit selon ce qu'on désélectionne
    this.patientCategories.forEach(cat => {
      cat.questionnaires.forEach(q => {
        if (!q.selected) {
          count -= 65; // Un questionnaire non exporté enlève des entrées du total
        } else {
          q.fields.forEach(f => {
            if (!f.selected) count -= 12; // Un champ non coché déduit un peu
          });
        }
      });
    });

    return Math.max(count, 0);
  }

  // --- Navigations ---
  startNewExport() {
    this.view = 'wizard';
    this.currentStep = 1;
    this.currentExportRef = Math.floor(1000 + Math.random() * 9000);
    this.selectedStudy = null;
    this.exportName = '';
    this.selectedFormat = 'Excel (.xlsx)';
    this.lastExportStatus = 'pending';
    this.initSelections();
  }

  initSelections() {
    this.patientCategories.forEach(c => {
      c.selected = true;
      c.questionnaires.forEach(q => {
        q.selected = true;
        q.fields.forEach(f => f.selected = true);
      });
    });
    this.activeQuestionnaire = this.patientCategories[0].questionnaires[0];
  }

  setStep(step: number) {
    if (step <= 5 && step >= 1) this.currentStep = step;
  }

  goToNextStep() {
    if (this.currentStep < 5) {
      this.currentStep++;
      if (this.currentStep === 5) {
        this.lastExportStatus = 'pending';
      }
    }
  }

  finishWizard() {
    // legacy, let's keep it just in case
    this.view = 'summary';
    this.lastExportStatus = 'pending';
  }

  // --- Logique Métier ---
  selectStudy(id: string) {
    this.selectedStudy = id;
  }

  setActiveQuestionnaire(q: ExportQuestionnaire) {
    this.activeQuestionnaire = q;
  }

  toggleCategory(cat: ExportCategory) {
    cat.questionnaires.forEach(q => q.selected = cat.selected);
  }

  checkCategory(cat: ExportCategory) {
    cat.selected = cat.questionnaires.every(q => q.selected);
  }

  getStudyName(id: string | null): string {
    return this.studies.find(st => st.id === id)?.name || '';
  }

  get SelectedQuestionnairesCount(): number {
    let qCount = 0;
    this.patientCategories.forEach(c => c.questionnaires.forEach(q => { if(q.selected) qCount++; }));
    return qCount;
  }

  // --- Status & Vue ---
  launchExport() {
    this.lastExportStatus = 'in-progress';
    setTimeout(() => {
      this.lastExportStatus = 'success';
      this.exportsList.unshift({
        id: Date.now().toString(),
        date: new Date(),
        name: this.exportName || `Exportation (${this.currentExportRef})`,
        user: 'Dr. Martin',
        format: this.selectedFormat,
        status: 'success'
      });
    }, 2000);
  }

  cancelSummary() {
    this.view = 'list';
  }

  downloadLastExport() {
    console.log("Downloading export...");
  }
}
