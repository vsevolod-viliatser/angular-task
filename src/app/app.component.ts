import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  birthday: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule],
})
export class AppComponent {
  title = 'Contact Management System';
  contacts: Contact[] = [];
  contact: Contact = { id: 0, name: '', phone: '', email: '', address: '', birthday: '' };
  searchTerm = '';
  isEditMode = false;
  isViewMode = false;
  formErrors: string[] = [];

  constructor(public router: Router) {
    const initialContacts: Contact[] = [
      { id: 1, name: 'John Doe', phone: '123-456', email: 'john@example.com', address: '123 Street', birthday: '1990-01-01' },
      { id: 2, name: 'Jane Smith', phone: '789-012', email: 'jane@example.com', address: '456 Avenue', birthday: '1992-02-02' },
    ];

    const storedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    this.contacts = this.mergeInitialContacts(initialContacts, storedContacts);
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

  mergeInitialContacts(initial: Contact[], stored: Contact[]): Contact[] {
    const storedIds = new Set(stored.map(contact => contact.id));
    const merged = [...stored];

    for (const contact of initial) {
      if (!storedIds.has(contact.id)) {
        merged.push(contact);
      }
    }

    return merged;
  }

  filteredContacts() {
    return this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.phone.includes(this.searchTerm)
    );
  }

  addNewContact() {
    this.contact = { id: 0, name: '', phone: '', email: '', address: '', birthday: '' };
    this.isEditMode = true;
    this.isViewMode = false;
    this.formErrors = [];
  }

  editContact(id: number) {
    const contact = this.contacts.find(c => c.id === id);
    if (contact) {
      this.contact = { ...contact };
      this.isEditMode = true;
      this.isViewMode = false;
      this.formErrors = [];
    }
  }

  viewContact(id: number) {
    const contact = this.contacts.find(c => c.id === id);
    if (contact) {
      this.contact = contact;
      this.isViewMode = true;
      this.isEditMode = false;
    }
  }

  saveContact() {
    this.formErrors = [];
    // Проверяем валидацию формы
    if (!this.contact.name || !this.contact.phone || !this.contact.email || !this.contact.address || !this.contact.birthday) {
      this.formErrors.push('All fields are required.');
      return;
    }

    if (!this.isValidPhoneNumber(this.contact.phone)) {
      this.formErrors.push('Invalid phone number format.');
      return;
    }

    if (!this.isValidEmail(this.contact.email)) {
      this.formErrors.push('Invalid email format.');
      return;
    }

    // Сохраняем контакт
    if (this.contact.id) {
      const index = this.contacts.findIndex(c => c.id === this.contact.id);
      if (index !== -1) {
        this.contacts[index] = this.contact;
      }
    } else {
      this.contact.id = Date.now();
      this.contacts.push(this.contact);
    }

    // Обновляем хранилище
    localStorage.setItem('contacts', JSON.stringify(this.contacts));

    // Переход после успешного сохранения
    this.router.navigate(['/']);
    this.isEditMode = false;  // Сбрасываем режим редактирования
  }
  
  goBackToContactList() {
    this.router.navigate(['/']);
  }

  deleteContact(id: number) {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contacts = this.contacts.filter(contact => contact.id !== id);
      localStorage.setItem('contacts', JSON.stringify(this.contacts));
    }
  }

  cancel() {
    this.isEditMode = false;
    this.isViewMode = false;
    this.contact = { id: 0, name: '', phone: '', email: '', address: '', birthday: '' };  // Сбросить контакт
    this.router.navigate(['/']);
  }

  isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^[0-9]{3}-[0-9]{3}$/;
    return phoneRegex.test(phone);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  // Убираем вызов saveContact() из checkValidation
  checkValidation() {
    // Проверка ошибок, но без сохранения
  }
}
