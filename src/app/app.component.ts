import { Component } from '@angular/core';
import {MOTOS} from './mockMoto'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Motos';
  motos=MOTOS;
  users=[1,2,3,4,5,6,7,8,9,10]
  usuarioActivo:number=0;

  selectUser (idUser:number){
    this.usuarioActivo=idUser;
  }
}
