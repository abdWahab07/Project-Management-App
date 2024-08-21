import { aboutUsService } from './../services/aboutUs.services';
import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import {faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'; // Importing brand icons separately
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

  constructor(private navbarService: NavbarService, private aboutUsService: aboutUsService) { }

  ngOnInit(): void {
    this.navbar = this.navbarService.getNavbarLinks();
    this.aboutUs = this.aboutUsService.getAboutUsLinks();

  }
}
