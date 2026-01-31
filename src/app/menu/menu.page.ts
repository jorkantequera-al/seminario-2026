import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class MenuPage implements OnInit {

constructor(private router: Router, private navCtrl:NavController, private storageService: StorageService) { }

  ngOnInit() {
  }

  goToIntro(){
    console.log("volver a la Intro");
    this.router.navigate(['menu/intro']);
  }

  cerrarSesion() {
    
    console.log("Cerrando sesión...");
    this.storageService.remove('introVisto');
    this.storageService.set('login', false);
    this.storageService.remove('id');
    this.navCtrl.navigateForward('login'); 
  }
}