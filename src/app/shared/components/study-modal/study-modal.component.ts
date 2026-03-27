import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-study-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './study-modal.component.html',
  styleUrls: ['./study-modal.component.scss']
})
export class StudyModalComponent {
  @Input() isOpen = false;
  @Input() study: any = null; // Contains name, status, badgeClass
  @Input() patientInfo: any = {
    name: 'Jean Dupont',
    age: 45,
    dob: '12/04/1978',
    email: 'j.dupont@email.com',
    phone: '06 12 34 56 78'
  };
  @Output() close = new EventEmitter<void>();

  // Eligibility state
  eligibilityAnswers: { [key: string]: boolean | null } = {
    q1: null,
    q2: null,
    q3: null
  };
  
  rgpdChecked1 = false;
  rgpdChecked2 = false;
  
  consentMode: 'digital' | 'manual' = 'digital';

  get modalStatus() {
    return this.study?.status || 'check-eligibility';
  }

  // --- ACTIONS SIMULATION ---

  validateEligibility() {
    if (!this.study) return;
    if (this.isEligibilityValid) {
      this.study.status = 'eligible';
    } else {
      this.study.status = 'not-eligible';
    }
  }

  sendConsentDigital() {
    if (!this.study) return;
    this.study.status = 'awaiting-consent';
    this.study.consentSentDate = new Date().toLocaleDateString('fr-FR');
  }

  simulatePatientSignature() {
    if (!this.study) return;
    this.study.status = 'active';
    this.study.consentSignedDate = new Date().toLocaleDateString('fr-FR');
  }

  validateManualConsent() {
    if (!this.study) return;
    this.study.status = 'active';
    this.study.consentSignedDate = new Date().toLocaleDateString('fr-FR');
  }

  get eligibilityText() {
    if (this.modalStatus === 'active' || this.modalStatus === 'awaiting-consent' || this.modalStatus === 'eligible' || this.modalStatus === 'awaiting') return 'Oui';
    if (this.modalStatus === 'not-eligible') return 'Non';
    return 'À vérifier';
  }

  get consentStatus() {
    if (this.modalStatus === 'active') return 'Signé';
    if (this.modalStatus === 'awaiting-consent' || this.modalStatus === 'awaiting') return 'En attente';
    return 'Non envoyé';
  }

  closeModal() {
    this.close.emit();
    // Reset state
    this.eligibilityAnswers = { q1: null, q2: null, q3: null };
    this.rgpdChecked1 = false;
    this.rgpdChecked2 = false;
    this.consentMode = 'digital';
  }

  setAnswer(q: string, val: boolean) {
    this.eligibilityAnswers[q] = val;
  }

  get isEligibilityValid() {
    return this.eligibilityAnswers['q1'] === true && this.eligibilityAnswers['q2'] === true && this.eligibilityAnswers['q3'] === false;
  }
}
