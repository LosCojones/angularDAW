import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  mostrarTodas = true;
  model = {
    user: "Juan",
    items: [
      {action: "Comprar flores", done: false, prioridad: 4},
      {action: "Buscar zapatos", done: false, prioridad: 2},
      {action: "Recoger entradas", done: true, prioridad: 1},
      {action: "Llamar a Juan", done: false, prioridad: 3}
    ]
  };

  constructor(){
    // this.ordenaTareas();
  }

  tnIncompletas() {
    let count = 0;
    this.model.items.forEach((item, index) => !item.done ? count++ : true);
    return count;
  }

  addItem(tarea) {
    this.model.items.push({action: tarea, done: false, prioridad: 2});
    // this.ordenaTareas();
  }

  findTarea(elemento) {
    return elemento.action == this;
  }

  nuevaPrioridad(e) {
    console.log(e);
    let indice = this.model.items.findIndex(this.findTarea,e.tarea);
    this.model.items[indice].prioridad = e.prioridad;
  }

  // ordenaTareas() {
  //   this.model.items.sort((a:any, b: any)=>{
  //     if(a.action.toLowerCase() < b.action.toLowerCase()){
  //       return -1;
  //     } else if(a.action.toLowerCase() > b.action.toLowerCase()) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   })
  // }
}
