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

  guardar(id:any, datos:any){
    return this.http.post<any>(this.URL + `/${id}`, datos)
  }

  obtener(id:any){
    return this.http.get<any>(this.URL + `/${id}/escenarios`)
  }

  logeado(){
    return  !!localStorage.getItem('token')
  }

  cerrar(){
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    this.router.navigate(['./login'])
  }
}
