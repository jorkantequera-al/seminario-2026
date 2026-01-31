import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
import { OnInit } from '@angular/core';
import { StorageService } from './services/storage';
import { AuthService } from './services/auth';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit{
  constructor(private storageService: StorageService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.initializeData();
    this.storageService.remove('id');
    this.storageService.set('login', false);
  }
}
