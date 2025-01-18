import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css'],
  imports: [CommonModule],
})
export class ContactViewComponent {
  isViewMode: boolean = true; 
  
  constructor(public contactService: ContactService, private route: ActivatedRoute, private router: Router) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contactService.loadContact(id);
  }

  back() {
    this.router.navigate(['/']);
  }
}
