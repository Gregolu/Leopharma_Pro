import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss']
})
export class SettingsComponent {
  activeTab: 'templates' | 'notifications' = 'templates';

  // Templates Data
  templates = [
    { id: 1, name: 'Protocole standard', type: 'Email', lastModified: '12 Mars 2024' },
    { id: 2, name: 'Relance patient', type: 'SMS', lastModified: '10 Mars 2024' },
    { id: 3, name: 'Questionnaire suivi Eczéma', type: 'Formulaire', lastModified: '5 Mars 2024' }
  ];

  // Notifications Settings Data
  notifications = {
    email: {
      newPatient: true,
      dataUpdate: false,
      messageReceived: true
    },
    inApp: {
      newPatient: true,
      dataUpdate: true,
      messageReceived: true
    }
  };

  isSaving = false;

  setTab(tab: 'templates' | 'notifications') {
    this.activeTab = tab;
  }

  editTemplate(template: any) {
    console.log('Edit template:', template);
    // TODO: Implement edit logic
  }

  saveSettings() {
    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
      console.log('Settings saved:', this.notifications);
    }, 1000);
  }
}