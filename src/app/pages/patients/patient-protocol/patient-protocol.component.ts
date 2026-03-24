import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyModalComponent } from '../../../shared/components/study-modal/study-modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-protocol',
  standalone: true,
  imports: [CommonModule, FormsModule, StudyModalComponent],
  templateUrl: './patient-protocol.component.html',
  styleUrls: ['./patient-protocol.component.scss']
})
export class PatientProtocolComponent {
  activeSubTab = signal<'therapeutique' | 'clinique'>('therapeutique');

  // TAB 1: SUIVI THÉRAPEUTIQUE
  therapeuticFollowUps = [
    { id: 'severe', name: 'Eczéma sévère', active: true, icon: 'fas fa-fingerprint' },
    { id: 'mild', name: 'Eczéma léger à modéré', active: false },
    { id: 'undiagnosed', name: 'Patient non diagnostiqué', active: false },
    { id: 'none', name: 'Aucun suivi actif', active: false, isNone: true }
  ];

  frequencies = ['Pas de fréquence', '3 mois', '6 mois', '12 mois', '24 mois'];

  questionnaireCategories: any[] = [
    {
      name: 'Analyse',
      items: [
        { id: 'q1', name: 'Analyse des mains', checked: true, frequency: '6 mois', hasChanged: false },
        { id: 'q2', name: 'Scan produit', checked: true, frequency: '12 mois', hasChanged: true, oldValue: '6 mois' }
      ]
    },
    {
      name: 'Qualité de vie',
      items: [
        { id: 'q3', name: 'Votre qualité de vie', checked: true, frequency: '12 mois', hasChanged: false }
      ]
    },
    {
      name: 'IGACHE',
      items: [
        { id: 'q4a', name: 'Analyse détaillée des rougeurs', checked: true, frequency: '3 mois', hasChanged: false },
        { id: 'q4b', name: 'Analyse détaillée peau qui pèle', checked: false, frequency: 'Pas de fréquence', hasChanged: false },
        { id: 'q4c', name: 'Analyse détaillée peau épaissie', checked: false, frequency: 'Pas de fréquence', hasChanged: false }
      ]
    },
    {
      name: 'État de santé',
      items: [
        { id: 'q5', name: 'État de santé général de votre problème', checked: true, frequency: '6 mois', hasChanged: false }
      ]
    }
  ];

  // HISTORY MODAL (TAB 1)
  showHistoryModal = signal(false);
  selectedHistory = signal<any>(null);

  // TAB 2: ÉTUDES CLINIQUES
  clinicalStudies: any[] = [
    {
      id: 'cs1', name: 'EczemaLife', active: true, status: 'active',
      state: 'consent-signed', color: '#10b981',
      answers: {q1: true, q2: true, q3: true, q4: true},
      gdpr: {infoReceived: true, canStop: true, consents: true},
      consentSignedDate: new Date(),
      progress: {
        steps: ['T0', '3 mois', '6 mois', '12 mois', '24 mois'],
        currentIdx: 2
      }
    },
    { 
      id: 'cs2', name: 'Elaris EM-II', active: false, status: 'awaiting', date: '12/05/26',
      state: 'consent-pending', color: '#f59e0b',
      answers: {q1: true, q2: true, q3: true, q4: true},
      gdpr: {infoReceived: true, canStop: true, consents: true},
      consentSentDate: new Date('2026-05-12T10:00:00')
    },
    { 
      id: 'cs3', name: 'Eczéma précoce - ECP-4', active: false, status: 'eligible',
      state: 'eligible-not-sent', color: '#3b82f6',
      answers: {q1: true, q2: true, q3: true, q4: true},
      gdpr: {infoReceived: false, canStop: false, consents: false}
    },
    { 
      id: 'cs4', name: 'ExoGEN trial', active: false, status: 'check-eligibility',
      state: 'checking-eligibility', color: '#64748b',
      answers: {q1: null, q2: null, q3: null, q4: null},
      gdpr: {infoReceived: false, canStop: false, consents: false}
    },
    { 
      id: 'cs5', name: 'Elaris EM-1', active: false, status: 'not-eligible',
      state: 'not-eligible', color: '#ef4444',
      answers: {q1: true, q2: false, q3: null, q4: null},
      gdpr: {infoReceived: false, canStop: false, consents: false}
    }
  ];

  timelineCols = [
    { label: 'T0', past: true },
    { label: '3 mois', past: true },
    { label: '6 mois', past: false, active: true },
    { label: '12 mois', past: false },
    { label: '24 mois', past: false }
  ];

  timelineData = [
    {
      category: 'Analyse',
      items: [
        { name: 'Analyse des mains', states: ['completed', 'completed', 'todo', 'todo', 'todo'] },
        { name: 'Scan produit', states: ['completed', 'na', 'todo', 'todo', 'todo'] }
      ]
    },
    {
      category: 'Qualité de vie',
      items: [
        { name: 'Votre qualité de vie', states: ['completed', 'completed', 'todo', 'todo', 'todo'] }
      ]
    },
    {
      category: 'IGACHE',
      items: [
        { name: 'Analyse détaillée des rougeurs', states: ['na', 'na', 'todo', 'na', 'na'] },
        { name: 'Analyse détaillée peau qui pèle', states: ['na', 'na', 'na', 'na', 'na'] },
        { name: 'Analyse détaillée peau épaissie', states: ['na', 'na', 'na', 'na', 'na'] }
      ]
    },
    {
      category: 'État de santé',
      items: [
        { name: 'État de santé général de votre problème', states: ['completed', 'completed', 'todo', 'todo', 'todo'] }
      ]
    }
  ];

  // LOGIQUE POP-IN ETUDES CLINIQUES
  isStudyModalOpen = signal(false);
  selectedStudy = signal<any>(null);

  openStudyAction(study: any) {
    this.selectedStudyAction = study;
    this.isStudyModalActionOpen = true;
  }
  
  isStudyModalActionOpen = false;
  selectedStudyAction: any = null;
  
  closeStudyActionModal() {
    this.isStudyModalActionOpen = false;
    this.selectedStudyAction = null;
  }

  closeStudyModal() {
    this.isStudyModalOpen.set(false);
  }

  setAnswer(q: string, value: boolean) {
    const s = this.selectedStudy();
    if(s && s.answers) { s.answers[q] = value; }
  }

  isEligible() {
    const s = this.selectedStudy();
    if(!s || !s.answers) return false;
    return s.answers.q1 === true && s.answers.q2 === true && s.answers.q3 === true && s.answers.q4 === true;
  }

  isNotEligible() {
    const s = this.selectedStudy();
    if(!s || !s.answers) return false;
    return s.answers.q1 === false || s.answers.q2 === false || s.answers.q3 === false || s.answers.q4 === false;
  }

  canSendConsent() {
    const s = this.selectedStudy();
    if(!s || !s.gdpr) return false;
    return s.gdpr.infoReceived && s.gdpr.canStop && s.gdpr.consents;
  }

  saveStudy(s: any) {
    if(this.isEligible()) {
      s.state = 'eligible-not-sent'; s.status = 'eligible'; s.color = '#3b82f6';
    } else if(this.isNotEligible()) {
      s.state = 'not-eligible'; s.status = 'not-eligible'; s.color = '#ef4444';
    }
    this.closeStudyModal();
  }

  sendConsent() {
    const s = this.selectedStudy();
    s.state = 'consent-pending'; s.status = 'awaiting'; s.color = '#f59e0b'; s.consentSentDate = new Date();
    this.closeStudyModal();
  }

  resendConsent() {
    alert("Consentement renvoyé au patient !");
  }

  withdrawConsent() {
    const s = this.selectedStudy();
    s.state = 'eligible-not-sent'; s.status = 'eligible'; s.color = '#3b82f6'; s.gdpr = {infoReceived: false, canStop: false, consents: false};
    this.closeStudyModal();
  }

  validateAndSignForSimulation() {
    const s = this.selectedStudy();
    s.state = 'consent-signed'; s.status = 'active'; s.color = '#10b981'; s.consentSignedDate = new Date();
  }

  // ACTIONS
  selectFollowUp(s: any) {
    this.therapeuticFollowUps.forEach(f => f.active = false);
    s.active = true;
  }

  selectStudy(s: any) {
    this.clinicalStudies.forEach(cs => cs.active = false);
    s.active = true;
  }

  onFreqChange(item: any) {
    if (!item.oldValue) item.oldValue = item.frequency; // Mock old value if none
    item.hasChanged = true;
  }

  revertFrequency(item: any) {
    if (item.oldValue) {
      item.frequency = item.oldValue;
      item.hasChanged = false;
    }
  }

  openHistory(item: any) {
    this.selectedHistory.set({
      item: item.name,
      oldValue: item.oldValue || 'Ancienne valeur',
      newValue: item.frequency,
      user: 'Dr. Martin',
      date: new Date().toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    });
    this.showHistoryModal.set(true);
  }

  closeHistory() {
    this.showHistoryModal.set(false);
  }
}
