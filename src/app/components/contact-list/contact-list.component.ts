import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'], 
  imports: [CommonModule,FormsModule],
})
export class ContactListComponent {
  searchTerm = '';

  constructor(public contactService: ContactService, private router: Router) {}

  get filteredContacts() {
    return this.contactService.filteredContacts(this.searchTerm);
  }

  addNewContact() {
    this.router.navigate(['/contact/new']);
  }

  viewContact(id: number) {
    this.router.navigate([`/contact/${id}`]);
  }

  editContact(id: number) {
    this.router.navigate([`/contact/edit/${id}`]);
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id);
  }
}
