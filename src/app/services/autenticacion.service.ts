import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  URL = 'http://localhost:5000/api'
  // private token: String | null = localStorage.getItem("token")

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  registro(user: any) {
    return this.http.post<any>(this.URL + '/registro', user)
  }

  login(user: any) {
    return this.http.post<any>(this.URL + '/acceso', user)
  }

  guardar(id: any, datos: any) {
    return this.http.post<any>(this.URL + '/escenario', datos, { headers: this.getHeaders(), withCredentials: true })
  }

  obtener(id: any) {
    return this.http.get<any>(this.URL + '/escenarios', { headers: this.getHeaders(), withCredentials: true })
  }

  logeado() {
    return !!localStorage.getItem('token')
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
    // localStorage.removeItem('token')

    this.router.navigate(['./login'])
  }
}
