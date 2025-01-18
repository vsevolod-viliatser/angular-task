import { Injectable } from '@angular/core';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  birthday: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  contact: Contact = { id: 0, name: '', phone: '', email: '', address: '', birthday: '' };
  formErrors: string[] = [];

  constructor() {
    const storedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    
    // Если нет контактов в localStorage, добавляем начальные
    if (storedContacts.length === 0) {
      const initialContacts: Contact[] = [
        { id: 1, name: 'John Doe', phone: '123-456', email: 'john@example.com', address: '123 Street', birthday: '1990-01-01' },
        { id: 2, name: 'Jane Smith', phone: '789-012', email: 'jane@example.com', address: '456 Avenue', birthday: '1992-02-02' },
      ];
      this.contacts = initialContacts;
      localStorage.setItem('contacts', JSON.stringify(initialContacts)); // Сохраняем начальные контакты в localStorage
    } else {
      this.contacts = storedContacts;
    }
  }

  filteredContacts(searchTerm: string) {
    return this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || contact.phone.includes(searchTerm)
    );
  }

  loadContact(id: number) {
    const contact = this.contacts.find(c => c.id === id);
    if (contact) {
      this.contact = { ...contact };
    }
  }

  saveContact(): boolean {
    this.formErrors = [];
  
    // Проверка обязательных полей
    if (!this.contact.name || !this.contact.phone || !this.contact.email || !this.contact.address || !this.contact.birthday) {
      this.formErrors.push('All fields are required.');
    }
  
    // Валидация номера телефона (формат xxx-xxx)
    const phoneRegex = /^\d{3}-\d{3}$/;
    if (!phoneRegex.test(this.contact.phone)) {
      this.formErrors.push('Phone number must be in the format xxx-xxx.');
    }
  
    // Валидация email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(this.contact.email)) {
      this.formErrors.push('Please enter a valid email address.');
    }
  
    if (this.formErrors.length > 0) {
      return false;
    }

    // Добавление нового или обновление существующего контакта
    if (this.contact.id) {
      const index = this.contacts.findIndex(c => c.id === this.contact.id);
      if (index !== -1) this.contacts[index] = this.contact;
    } else {
      this.contact.id = Date.now();
      this.contacts.push(this.contact);
    }
  
    // Сохраняем изменения в localStorage
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
    return true;
  }

  deleteContact(id: number) {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }
}