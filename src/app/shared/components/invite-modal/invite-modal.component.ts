import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-invite-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invite-modal.component.html',
  styleUrls: ['./invite-modal.component.scss']
})
export class InviteModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  // Patient Info
  firstName = '';
  lastName = '';
  dob = '';
  phone = '';
  email = '';
  clinic = 'Hôpital Saint-Louis';

  // Study selection
  selectedStudy = '';
  
  // Eligibility logic specific to Eczema Care Trial A/B
  eligibilityAnswers: { [key: string]: boolean | null } = {
    q1: null,
    q2: null,
    q3: null,
    q4: null
  };

  clinics = [
    'Hôpital Saint-Louis',
    'Clinique du Val d\'Or',
    'Centre Dermatologique Paris',
    'Hôpital Necker'
  ];

  studies = [
    { id: 'trial_a', name: 'EczemaCare Trial A', pastille: 'pastille-trial-a' },
    { id: 'trial_b', name: 'EczemaCare Trial B', pastille: 'pastille-beta' },
    { id: 'trial_c', name: 'DermaTop Topical Study', pastille: 'pastille-modere' }
  ];

  closeModal() {
    this.close.emit();
    this.resetForm();
  }

  setAnswer(qId: string, val: boolean) {
    this.eligibilityAnswers[qId] = val;
  }

  invitePatient() {
    // In a real app, send api request
    alert('Le patient ' + this.firstName + ' ' + this.lastName + ' a été invité !');
    this.closeModal();
  }

  resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.dob = '';
    this.phone = '';
    this.email = '';
    this.selectedStudy = '';
    this.eligibilityAnswers = { q1: null, q2: null, q3: null, q4: null };
  }
}
