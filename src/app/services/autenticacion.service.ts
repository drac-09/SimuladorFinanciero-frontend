import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { selectorPerfil } from '../state/usuario.selector';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  URL = 'http://localhost:5000/api'
  // private token: String | null = localStorage.getItem("token")

  // token = localStorage.getItem('token');
  // headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>,
  ) { }



  private getHeaders(): HttpHeaders {
    // const token = localStorage.getItem('token');
    const token = this.store.select(selectorPerfil).pipe(
      map(perfil => perfil!.token)
    );
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  registro(user: any) {
    return this.http.post<any>(this.URL + '/registro', user)
  }

  login(user: any) {
    return this.http.post<any>(this.URL + '/acceso', user)
  }

  obtener(id: any) {
    return this.http.get<any>(this.URL + '/escenarios', { headers: this.getHeaders(), withCredentials: true })
  }

  guardar(id: any, datos: any) {
    return this.http.post<any>(this.URL + '/escenario', datos, { headers: this.getHeaders(), withCredentials: true })
  }

  logeado() {
    // return !!localStorage.getItem('token')
    return !!this.store.select(selectorPerfil).pipe(
      map(perfil => perfil?.token)
    );
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
