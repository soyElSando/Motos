import { Component } from '@angular/core';
import {HORARIOS, USUARIOS} from './mockMoto'
import { Moto } from './moto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Motos';
  motosMax=4;
  motos:Moto[]=[];
  horarios=HORARIOS;
  usuarios=USUARIOS;
  usuarioActivo:string="";
  recursoTomado:number=0;
  counter:number=0;

  constructor(){
    for (let horario of this.horarios){
      this.counter=this.motosMax;
      for (let usuario of this.usuarios){
        if(usuario[horario.id]){
          this.counter--;
        }
      }
      this.motos.push({hour:horario.hour, counter:this.counter})
    }
  }

  estaTomada(horario:string, motoCounter:number){
    let horarioId= this.horarios.find(boo=>boo.hour===horario)?.id;
    let activeUser=this.usuarios.find(boo=>boo.name===this.usuarioActivo);
    let esActivo=false;
    if(activeUser&&horarioId){
      esActivo=activeUser[horarioId];
    }
    return {tomada: esActivo, agotada:motoCounter<1}
  }

  

  selectUser (nameUser:string){
    this.usuarioActivo=nameUser;
  }

}

