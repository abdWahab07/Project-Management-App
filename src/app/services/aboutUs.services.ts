import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class aboutUsService {
  aboutUs = [
    "about us",
    "newsteller",
    "terms and coonditions",
    "privacy policy"
  ];

  getAboutUsLinks() {
    return this.aboutUs;
  }
}
