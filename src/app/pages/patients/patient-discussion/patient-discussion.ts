import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  id: number;
  text: string;
  sender: 'patient' | 'professional';
  timestamp: Date;
  isVoice?: boolean;
}

@Component({
  selector: 'app-patient-discussion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-discussion.html',
  styleUrls: ['./patient-discussion.scss']
})
export class PatientDiscussionComponent {
  messages: Message[] = [
    {
      id: 1,
      text: 'Bonjour, je ressens des démangeaisons plus intenses depuis hier soir.',
      sender: 'patient',
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 60 * 2)
    },
    {
      id: 2,
      text: 'Bonjour Jean. Avez-vous appliqué la crème comme prescrit après la douche ?',
      sender: 'professional',
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 60 * 1.5)
    },
    {
      id: 3,
      text: "Oui, mais j'ai l'impression que la zone s'est un peu élargie.",
      sender: 'patient',
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 45)
    }
  ];

  newMessage: string = '';

  sendMessage() {
    if (this.newMessage.trim() === '') return;

    this.messages.push({
      id: Date.now(),
      text: this.newMessage,
      sender: 'professional',
      timestamp: new Date()
    });

    this.newMessage = '';
  }

  sendVoiceMessage() {
    this.messages.push({
      id: Date.now(),
      text: 'Message vocal (0:12)',
      sender: 'professional',
      timestamp: new Date(),
      isVoice: true
    });
  }
}
