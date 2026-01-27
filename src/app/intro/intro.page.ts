import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IntroPage implements OnInit {

  colorActual = 'color-base';

  genres = [
    {
      title: 'WELCOME',
      image: 'https://png.pngtree.com/element_our/sm/20180415/sm_5ad31d9b53530.jpg',
      description: 'A LA MEJOR MUSICA PARA EMPEZAR TU DIA.'
    },
    {
      title: '',
      image: 'https://www.freepik.es/vector-premium/musica-naturaleza-es-forma-disfrutar-vida-fresca_31785614.htm',
      description: 'crea tu musica para tu playlist donde sea'
    },
    {
      title: 'Configua',
      image: 'https://cdn-icons-png.freepik.com/256/889/889744.png?semt=ais_white_label',
      description: 'tu mismo pones limites'
    },
    {
      title: 'GOZALA SIU',
      image: '',
      description: 'Explora tus ganeros favoritos'
    }
  ];

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  async ngOnInit() {
    const theme = await this.storageService.get('theme');
    if (theme) {
      this.colorActual = theme;
    }
  }

  goBack() {
    this.storageService.set('introVisto', true);
    this.router.navigateByUrl('/home');
  }
}
