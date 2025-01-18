import { Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactViewComponent } from './components/contact-view/contact-view.component';

export const routes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'contact/new', component: ContactFormComponent },
  { path: 'contact/edit/:id', component: ContactFormComponent },
  { path: 'contact/:id', component: ContactViewComponent },
];
