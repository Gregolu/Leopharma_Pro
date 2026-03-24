import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CareProfessional {
  id: string;
  profession: string;
  icon: string;
  recommendationDate?: Date;
  status: 'none' | 'sent';
}

@Component({
  selector: 'app-patient-network',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-network.html',
  styleUrls: ['./patient-network.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientNetworkComponent {
  // Liste des professionnels selon l'exemple (icône + nom du métier)
  professionals = signal<CareProfessional[]>([
    { id: '1', profession: 'Dermatologue', icon: 'fas fa-user-md', status: 'sent', recommendationDate: new Date('2025-05-13') },
    { id: '2', profession: 'Allergologue', icon: 'fas fa-microscope', status: 'none' },
    { id: '3', profession: 'Médecin Généraliste', icon: 'fas fa-stethoscope', status: 'none' },
    { id: '4', profession: 'Médecin du Travail', icon: 'fas fa-user-tie', status: 'none' },
    { id: '5', profession: 'Psychologue', icon: 'fas fa-brain', status: 'none' },
    { id: '6', profession: 'Pharmacien', icon: 'fas fa-pills', status: 'none' },
    { id: '7', profession: 'Infirmier(ère)', icon: 'fas fa-user-nurse', status: 'none' },
    { id: '8', profession: 'Rhumatologue', icon: 'fas fa-bone', status: 'none' }
  ]);

  selectedPro = signal<CareProfessional | null>(null);
  draftMessage = signal('');
  isModalOpen = signal(false);

  openRecommendation(pro: CareProfessional) {
     if (pro.status === 'sent') return; // Bloquer si déjà envoyé

    this.selectedPro.set(pro);
    this.draftMessage.set(`Bonjour,\n\nJe vous adresse ce patient pour une consultation spécialisée en ${pro.profession.toLowerCase()}.\n\nMerci de le prendre en charge.\nCordialement,`);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedPro.set(null);
  }

  sendRecommendation() {
    const pro = this.selectedPro();
    if (pro) {
      this.professionals.update(pros => 
        pros.map(p => p.id === pro.id ? { ...p, status: 'sent', recommendationDate: new Date() } : p)
      );
    }
    this.closeModal();
  }
}
