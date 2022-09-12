import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../usuarios';

@Injectable({
  providedIn: 'root'
})
export class MotoServiceService {

  databaseUrl="https://motos-5a89f-default-rtdb.firebaseio.com/Usuarios.json";

  constructor(private httpClient : HttpClient) { }

  public traerUsuarios():Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(this.databaseUrl);
  }

  public actualizarUsuarios(usuarios:Usuario[]){
    return this.httpClient.put(this.databaseUrl,usuarios);
  }

}
