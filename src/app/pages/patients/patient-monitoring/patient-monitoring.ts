import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-monitoring',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-monitoring.html',
  styleUrls: ['./patient-monitoring.scss']
})
export class PatientMonitoring {
  
  // Accordion state
  sections = {
    active: true,
    inactive: true
  };

  globalAlertOn = true;

  downloadDossier() {
    window.open('assets/Dossierpatient.pdf', '_blank');
  }

  // Alerts per graph
  alertIGA = signal(true);
  alertBoHG = signal(false);
  alertTreatment = signal(true);

  // Modal State
  isModalOpen = signal(false);
  selectedGraphForAlert = signal('');

  // Form State
  alertThreshold = signal(2);
  alertRecurrences = signal(1);
  alertLinkedGraph = signal('');

  toggleGlobalAlert() {
    this.globalAlertOn = !this.globalAlertOn;
  }

  toggleSection(section: 'active' | 'inactive') {
    this.sections[section] = !this.sections[section];
  }

  toggleAlert(graph: string) {
    if (graph === 'iga') this.alertIGA.set(!this.alertIGA());
    if (graph === 'bohg') this.alertBoHG.set(!this.alertBoHG());
    if (graph === 'treatment') this.alertTreatment.set(!this.alertTreatment());
  }

  openAlertModal(graphName: string) {
    this.selectedGraphForAlert.set(graphName);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  saveAlert() {
    console.log('Saved alert for', this.selectedGraphForAlert(), 'with values:', {
      threshold: this.alertThreshold(),
      recurrences: this.alertRecurrences(),
      linkedGraph: this.alertLinkedGraph()
    });
    this.closeModal();
  }

  deleteAlert() {
    console.log('Deleted alert for', this.selectedGraphForAlert());
    this.closeModal();
  }
}
