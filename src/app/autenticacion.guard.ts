import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AutenticacionService } from './services/autenticacion.service';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AutenticacionGuard implements CanActivate {
  constructor(
    private autenticacion: AutenticacionService,
    private router: Router,
  ){

  }

  canActivate(): boolean {
    if (this.autenticacion.logeado()){
      return true;
    }

    this.router.navigate(['./login'])
    return false;
  }

}
