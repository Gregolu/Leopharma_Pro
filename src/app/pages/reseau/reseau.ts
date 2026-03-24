import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

export type PartnerStatus = 'connected' | 'pending' | 'none';

export interface Partner {
  id: string;
  firstName: string;
  lastName: string;
  profession: string;
  location: string;
  address: string;
  status: PartnerStatus;
  avatarUrl?: string;
  distance?: number; // km
}

@Component({
  selector: 'app-reseau',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reseau.html',
  styleUrls: ['./reseau.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ReseauComponent {
  // Search state
  searchQuery = signal('');
  professionFilter = signal('');
  locationSearch = signal('');

  // Active Tab
  activeTab = signal<'discover' | 'connected' | 'pending'>('discover');

  // Multi-select or dropdown for professions could be added, simple string for now
  professions = ['Dermatologue', 'Médecin Généraliste', 'Rhumatologue', 'Allergologue', 'Pédiatre'];

  // Date variable to hold today's date for 'Envoyé' state
  todayDate = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });

  // Mock Data  
  private allPartners = signal<Partner[]>([
    { id: '1', firstName: 'Jean', lastName: 'Dupont', profession: 'Médecin Généraliste', location: 'Paris', address: '12 Rue de la Paix, 75000 Paris', status: 'connected', distance: 1.2 },
    { id: '2', firstName: 'Marie', lastName: 'Martin', profession: 'Dermatologue', location: 'Lyon', address: '45 Ave Jean Jaurès, 69000 Lyon', status: 'none', distance: 5.5 },
    { id: '3', firstName: 'Luc', lastName: 'Bernard', profession: 'Rhumatologue', location: 'Marseille', address: '8 Bd Prado, 13000 Marseille', status: 'pending', distance: 3.0 },
    { id: '4', firstName: 'Sophie', lastName: 'Petit', profession: 'Dermatologue', location: 'Paris', address: '17 Rue de Rivoli, 75001 Paris', status: 'none', distance: 2.1 },
    { id: '5', firstName: 'Pierre', lastName: 'Roux', profession: 'Allergologue', location: 'Paris', address: '99 Bd Saint-Germain, 75006 Paris', status: 'connected', distance: 0.8 },
    { id: '6', firstName: 'Julie', lastName: 'Leroy', profession: 'Pédiatre', location: 'Bordeaux', address: '12 Cours de l\'Intendance, 33000 Bordeaux', status: 'none', distance: 12.4 },
    { id: '7', firstName: 'Antoine', lastName: 'Moreau', profession: 'Dermatologue', location: 'Lille', address: '5 Grand Place, 59000 Lille', status: 'pending', distance: 8.9 },
    { id: '8', firstName: 'Camille', lastName: 'Blanc', profession: 'Oncologue', location: 'Toulouse', address: '14 Rue de Metz, 31000 Toulouse', status: 'none', distance: 4.2 },
    { id: '9', firstName: 'Emile', lastName: 'Garnier', profession: 'Dermatologue', location: 'Nantes', address: '22 Allée Jean Jaurès, 44000 Nantes', status: 'none', distance: 3.1 },
    { id: '10', firstName: 'Sarah', lastName: 'Dubois', profession: 'Chirurgien', location: 'Strasbourg', address: '5 Place Kléber, 67000 Strasbourg', status: 'none', distance: 6.7 },
  ]);

  pendingCount = computed(() => this.allPartners().filter(p => p.status === 'pending').length);

  filteredPartners = computed(() => {
    let partners = this.allPartners();
    const query = this.searchQuery().toLowerCase();
    const prof = this.professionFilter();
    const loc = this.locationSearch().toLowerCase();
    const tab = this.activeTab();

    // Filter by tab status
    if (tab === 'connected') {
      partners = partners.filter(p => p.status === 'connected');
    } else if (tab === 'pending') {
      partners = partners.filter(p => p.status === 'pending');
    } else {
      // In discover mode, could exclude connected for pure discovery, but keeping all is fine to show map
    }

    if (query) {
      partners = partners.filter(p => 
        p.firstName.toLowerCase().includes(query) || 
        p.lastName.toLowerCase().includes(query)
      );
    }
    if (prof) {
      partners = partners.filter(p => p.profession === prof);
    }
    if (loc) {
      partners = partners.filter(p => p.location.toLowerCase().includes(loc) || p.address.toLowerCase().includes(loc));
    }

    return partners;
  });

  setTab(tab: 'discover' | 'connected' | 'pending') {
    this.activeTab.set(tab);
  }

  invitePartner(partner: Partner) {
    this.allPartners.update(partners => 
      partners.map(p => p.id === partner.id ? { ...p, status: 'pending' } : p)
    );
  }

  cancelInvitation(partner: Partner) {
    this.allPartners.update(partners => 
      partners.map(p => p.id === partner.id ? { ...p, status: 'none' } : p)
    );
  }

  removePartner(partner: Partner) {
     this.allPartners.update(partners => 
      partners.map(p => p.id === partner.id ? { ...p, status: 'none' } : p)
    );
  }
}
