import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {

    const introVista = await this.storageService.get('intro');

    if (introVista === true) {
      return true; 
    }

    this.router.navigateByUrl('menu/intro'); 
    return false;
  }
}
