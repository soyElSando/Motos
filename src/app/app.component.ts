import { Component, ɵisSubscribable } from '@angular/core';
import {HORARIOS} from './mockMoto'
import { Moto } from './moto';
import { MotoServiceService } from './servicios/moto-service.service';
import { Usuario } from './usuarios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Motos';
  motosMax=4; //Cantidad de motos disponible por horario
  motos:Moto[]=[];
  horarios=HORARIOS;
  usuarios:Usuario[]=[];
  usuarioActivo:string="";
  recursoTomado:number=0;
  counter:number=0;

  constructor(private userService:MotoServiceService){
    this.userService.traerUsuarios().subscribe(
      data=>{
        this.usuarios=data;
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
      
    );

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

  toggleState(hour:string){
    if(this.usuarioActivo!==""){
      let activeUser=this.usuarios.find(boo=>boo.name===this.usuarioActivo);
      let clickedHourId=this.horarios.find(boo=>boo.hour===hour)?.id;
      if(activeUser&&clickedHourId){
        if(this.motos[clickedHourId-1].counter!==0||activeUser[clickedHourId]){
          activeUser[clickedHourId] = !activeUser[clickedHourId];
          if(activeUser[clickedHourId]){
            this.motos[clickedHourId-1].counter--;
          }else{
            this.motos[clickedHourId-1].counter++;
          }
          console.log(this.usuarios);//falta enviar a base de datos
          this.userService.actualizarUsuarios(this.usuarios).subscribe(
            (err: any)=>{
              console.log(err)
            }
          );
        }
      }   
    }
    
  }

  /* guardaUsuarios(){
    this.userService.guardaUsuarios(this.usuarios);
  } */

}

