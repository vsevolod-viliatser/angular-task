import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'contact/new', component: AppComponent }, // Новый контакт
  { path: 'contact/edit/:id', component: AppComponent }, // Редактирование контакта
  { path: 'contact/:id', component: AppComponent }, // Просмотр контакта
];