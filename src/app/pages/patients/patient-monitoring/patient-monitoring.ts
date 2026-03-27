
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-monitoring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-monitoring.html',
  styleUrls: ['./patient-monitoring.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientMonitoring {
  
  downloadDossier() {
    console.log("Downloading dossier...");
    window.open('images/Dossierpatient.pdf', '_blank');
  }

  openAlertModal(type: string) {
    console.log("Ouvrir alerte", type);
  }

}
