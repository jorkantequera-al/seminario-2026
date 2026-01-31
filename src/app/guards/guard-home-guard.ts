import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage';

@Injectable({
  providedIn: 'root'
})
export class GuardLogin implements CanActivate {

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.storageService.get('login');
    if (isLoggedIn === true) {
      return true; 
    }
    this.router.navigateByUrl('login'); 
    return false;
  }
}