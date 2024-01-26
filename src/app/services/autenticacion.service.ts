import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { selectorPerfil } from '../state/usuario.selector';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  URL = 'https://simulador-financiero-backend.vercel.app/api'
  // URL = 'http://localhost:5000/api'

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private store: Store<AppState>,
  ) { }



  private getHeaders(): HttpHeaders {
    // const token = localStorage.getItem('token');
    const token = this.cookieService.get('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  registro(user: any) {
    return this.http.post<any>(this.URL + '/registro', user)
  }

  // login(user: any) {
  //   return this.http.get<any>(this.URL + '/prueba')
  // }

  login(user: any) {
    return this.http.post<any>(this.URL + '/acceso', user)
  }

  obtener() {
    return this.http.get<any>(this.URL + '/escenarios', { headers: this.getHeaders(), withCredentials: true })
  }

  guardar(datos: any) {
    return this.http.post<any>(this.URL + '/escenario', datos, { headers: this.getHeaders(), withCredentials: true })
  }

  actualizar(id: any, datos: any) {
    return this.http.put<any>(this.URL + `/escenarios/${id}`, datos, { headers: this.getHeaders(), withCredentials: true })
  }

  logeado() {
    // return !!localStorage.getItem('token')
    return !!this.cookieService.get('token');
  }

  cerrar() {
    localStorage.clear();
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var igualPos = cookie.indexOf("=");
      var nombre = igualPos > -1 ? cookie.substr(0, igualPos) : cookie;
      document.cookie = nombre + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    localStorage.removeItem('token')

    this.router.navigate(['./login'])
  }
}
