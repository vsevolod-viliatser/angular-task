import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ContactFormComponent {
  formErrors: string[] = [];

  constructor(public contactService: ContactService, private router: Router) {}

  saveContact() {
    if (this.contactService.saveContact()) {
      this.router.navigate(['/']);
    } else {
      this.formErrors = this.contactService.formErrors;
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
