import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IntroPage implements OnInit {

  currentColor = 'color-base';

  slides = [
    {
      heading: 'WELCOME',
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
      text: 'A LA MEJOR MUSICA PARA EMPEZAR TU DIA.'
    },
    {
      heading: '',
      imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
      text: 'Crea tu música para tu playlist donde sea'
    },
    {
      heading: 'Configura',
      imageUrl: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2',
      text: 'Tú mismo pones límites'
    },
  ];

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  async ngOnInit() {
    const theme = await this.storageService.get('theme');
    if (theme) {
      this.currentColor = theme;
    }
  }

  goHome() {

    this.storageService.set('introVisto', true);
    console.log ("volver")
    this.router.navigateByUrl('menu/home');
  }
}
