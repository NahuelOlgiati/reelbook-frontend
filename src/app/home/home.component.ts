import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'rb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public homeRoutes: Routes = [
    { path: 'signup', data: { label: 'Signup' } },
    { path: 'error-page', data: { label: 'Página de error' } },
    { path: 'artist-create', data: { label: 'Crear Artista' } },
    { path: 'protected', data: { label: 'Protected' } }
  ];
  random: number;

  constructor() { }

  ngOnInit() {
    this.random = this.getRandomInt(1, 5);
  }

  getRandomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
