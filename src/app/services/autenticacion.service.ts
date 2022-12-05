import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  URL = 'http://localhost:7777/usuario'

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  registro (user:any){
    return this.http.post<any>(this.URL + '/registrar', user)
  }

  login (user:any){
    return this.http.post<any>(this.URL + '/login', user)
  }

  logeado(){
    return  !!localStorage.getItem('token')
  }

  cerrar(){
    localStorage.removeItem('token')
    this.router.navigate(['./login'])
  }
}
