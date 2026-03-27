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
  getVignetteClass(name: string): string {
    const n = name.toLowerCase();
    if (n.includes("sévère")) return "vignette-severe";
    if (n.includes("modéré")) return "vignette-modere";
    if (n.includes("alpha") || n.includes("trial a")) return "vignette-trial-a";
    if (n.includes("beta")) return "vignette-beta";
    if (n.includes("ecp-4")) return "vignette-ecp4";
    if (n.includes("eczemalife")) return "vignette-eczemalife";
    if (n.includes("elaris")) return "vignette-elaris";
    if (n.includes("exogen")) return "vignette-exogen";
    if (n.includes("aucun") || n.includes("non diagn")) return "vignette-none";
    return "vignette-other-study";
  }

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
      name: 'Etat de la main',
      items: [
        { id: 'q1', name: 'Etat de santé générale de votre main', checked: true, frequency: '6 mois', hasChanged: false },
        { id: 'q2', name: 'Analyse détaillée des symptômes', checked: true, frequency: '12 mois', hasChanged: true, oldValue: '6 mois' }
      ]
    },
    {
      name: 'Antécédents et traitements',
      items: [
        { id: 'q3', name: 'Antécédents médicaux', checked: true, frequency: '12 mois', hasChanged: false },
        { id: 'q4', name: 'Traitements', checked: true, frequency: '12 mois', hasChanged: false },
        { id: 'q5', name: 'Antécédents familiaux', checked: true, frequency: 'Pas de fréquence', hasChanged: false }
      ]
    },
    {
      name: 'Contexte de vie',
      items: [
        { id: 'q6', name: 'Profession et cadre de vie', checked: false, frequency: 'Pas de fréquence', hasChanged: false },
        { id: 'q7', name: 'Exposition et facteurs aggravants', checked: false, frequency: 'Pas de fréquence', hasChanged: false }
      ]
    },
    {
      name: 'Qualité de vie',
      items: [
        { id: 'q8', name: 'Impact fonctionnel des mains', checked: true, frequency: '3 mois', hasChanged: false },
        { id: 'q9', name: 'Votre qualité de vie (dont stigmatisation)', checked: true, frequency: '6 mois', hasChanged: false }
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
      id: 'cs5', name: 'Elaris EM-1', active: false, status: 'in-progress',
      state: 'in-progress', color: '#3b82f6',
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

  timelineData = [{category: "Etat de la main", items: [{ name: "Etat de santé générale de votre main", states: ["completed", "completed", "todo", "todo", "todo"] }, { name: "Analyse détaillée des symptômes", states: ["completed", "na", "todo", "todo", "todo"] }]},{category: "Antécédents et traitements", items: [{ name: "Antécédents médicaux", states: ["na", "na", "todo", "na", "na"] }, { name: "Traitements", states: ["na", "na", "na", "na", "na"] }, { name: "Antécédents familiaux", states: ["na", "na", "na", "na", "na"] }]},{category: "Contexte de vie", items: [{ name: "Profession et cadre de vie", states: ["completed", "completed", "todo", "todo", "todo"] }, { name: "Exposition et facteurs aggravants", states: ["na", "na", "todo", "todo", "todo"] }]},{category: "Qualité de vie", items: [{ name: "Impact fonctionnel des mains", states: ["completed", "completed", "todo", "todo", "todo"] }, { name: "Votre qualité de vie (dont stigmatisation)", states: ["completed", "completed", "todo", "todo", "todo"] }]}];

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
      s.state = 'in-progress'; s.status = 'in-progress'; s.color = '#3b82f6';
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
