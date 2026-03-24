import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class ProfileComponent {
  user = {
    firstname: 'Jean',
    lastname: 'Dupont',
    specialty: 'Dermatologue',
    email: 'jean.dupont@hopital.fr',
    phone: '+33 6 12 34 56 78',
    country: 'France',
    language: 'Français'
  };

  addresses = [
    {
      id: 1,
      label: 'Cabinet principal',
      details: 'Clinique de dermatologie avancée\n12 rue de la Santé, 75013 Paris, France'
    },
    {
      id: 2,
      label: 'Hôpital Saint-Louis',
      details: 'Service Immunologie\n47 rue de l\'Hôpital, 75010 Paris, France'
    }
  ];

  isSaving = false;

  saveChanges() {
    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
      alert('Modifications enregistrées avec succès.');
    }, 800);
  }

  editAddress(addr: any) {
    alert('Modifier l\'adresse : ' + addr.label);
  }

  deleteAddress(addr: any) {
    if (confirm('Voulez-vous supprimer cette adresse ?')) {
      this.addresses = this.addresses.filter(a => a.id !== addr.id);
    }
  }

  addAddress() {
    alert('Ajouter une nouvelle adresse');
  }

  changePassword() {
    alert('Action : Modifier le mot de passe');
  }

  forgotPassword() {
    alert('Action : Mot de passe oublié');
  }
}
