import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { NavbarService } from '../services/navbar.service';
import { aboutUsService } from './../services/aboutUs.services';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { NavbarLink } from '../DTOs/navbarLInks';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {
  navbar: NavbarLink[] = [];
  aboutUs: string[] = [];
  faEnvelope = faEnvelope;
  faLinkedin = faLinkedin;

  emailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navbarService: NavbarService,
    private aboutUsService: aboutUsService
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.navbar = this.navbarService.getNavbarLinks();
    this.aboutUs = this.aboutUsService.getAboutUsLinks();
  }

  onSubmit(): void {
    if (this.emailForm.valid) {
      const emailParams = {
        user_email: this.emailForm.get('email')?.value,  // Make sure this matches the placeholder in your EmailJS template
      };

      emailjs.send('service_bgzl6q3', 'template_6c2w1i4', emailParams, '_GzIkelIJprw_Pa1y')
        .then((response: EmailJSResponseStatus) => {
          console.log('Email sent successfully:', response.status, response.text);
        }, (error) => {
          console.error('Failed to send email:', error);
        });
    } else {
      console.log('Form is not valid:', this.emailForm.errors);
    }
  }
}
