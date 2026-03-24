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

  get modalStatus() {
    return this.study?.status || 'check-eligibility';
  }

  get eligibilityText() {
    if (this.modalStatus === 'active' || this.modalStatus === 'awaiting' || this.modalStatus === 'eligible') return 'Oui';
    if (this.modalStatus === 'not-eligible') return 'Non';
    return 'À vérifier';
  }

  get consentStatus() {
    if (this.modalStatus === 'active') return 'Signé';
    if (this.modalStatus === 'awaiting') return 'En attente';
    return 'Non envoyé';
  }

  closeModal() {
    this.close.emit();
    // Reset state
    this.eligibilityAnswers = { q1: null, q2: null, q3: null };
    this.rgpdChecked1 = false;
    this.rgpdChecked2 = false;
  }

  setAnswer(q: string, val: boolean) {
    this.eligibilityAnswers[q] = val;
  }

  get isEligibilityValid() {
    return this.eligibilityAnswers['q1'] === true && this.eligibilityAnswers['q2'] === true && this.eligibilityAnswers['q3'] === false;
  }
}
