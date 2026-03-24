import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PatientMonitoring } from '../patient-monitoring/patient-monitoring';
import { PatientNetworkComponent } from '../patient-network/patient-network';
import { PatientDiscussionComponent } from '../patient-discussion/patient-discussion';
import { PatientProtocolComponent } from '../patient-protocol/patient-protocol.component';
import { PatientDossierComponent } from '../patient-dossier/patient-dossier.component';
import { StudyModalComponent } from '../../../shared/components/study-modal/study-modal.component';

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PatientMonitoring, PatientNetworkComponent, PatientDiscussionComponent, PatientProtocolComponent, PatientDossierComponent, StudyModalComponent],
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent {
  activeTab = 'Résumé';
  tabs = ['Résumé', 'Dossier patient', 'Monitoring', 'Suivi protocole', 'Réseau', 'Discussion'];

  isNoteModalOpen = false;
  noteContent = "Erythème persistant sur la face dorsale des mains. Mieux toléré depuis l'adaptation du traitement local.";
  tempNoteContent = '';

  setTab(t: string) {
    this.activeTab = t;
  }

  openNoteModal() {
    this.tempNoteContent = this.noteContent;
    this.isNoteModalOpen = true;
  }
  
  closeNoteModal() {
    this.isNoteModalOpen = false;
  }
  
  saveNote() {
    this.noteContent = this.tempNoteContent;
    this.isNoteModalOpen = false;
  }

  openReport() {
    window.open('images/Dossierpatient.pdf', '_blank');
  }

  // --- Modal Studies ---
  isStudyModalOpen = false;
  selectedStudy: any = null;

  openStudyModal(name: string, status: string, badgeClass: string) {
    this.selectedStudy = { name, status, badgeClass };
    this.isStudyModalOpen = true;
  }
  
  closeStudyModal() {
    this.isStudyModalOpen = false;
    this.selectedStudy = null;
  }
}
