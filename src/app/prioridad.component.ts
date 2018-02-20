///<reference path="../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'app-prioridad',
  template: `
    <div class="prioridad">
      <i class="glyphicon glyphicon-menu-up"
         [class.resaltada] = "prioridad < 10"
         [class.fueraLimites] = "prioridad >9"
         (click)="voto(1)"></i>
      <span>{{prioridad}}</span>
      <i class="glyphicon glyphicon-menu-down"
         [ngClass]="{resaltada: prioridad>0, fueraLimites: prioridad<1}"
         (click)="voto(-1)"></i>
    </div>
  `,
  styles: [`
    .prioridad{
      width: 20px;
      text-align: center;
      font-size: .9em;
      line-height: .7;
    }
    .prioridad i {
      margin: 0;
      padding: 0;
    }
    .glyphicon-menu-up, .glyphicon-menu-down {
      color: #ccc;
    }
    .resaltada {
      font-weight: 600;
      color: red;
    }
    .glyphicon:hover {
      cursor: pointer;
    }
    .prioridad span {
      vertical-align: text-bottom;
    }
    .fueraLimites {
      pointer-events: none;
    }
  `]
})

export class PrioridadComponent {
  @Input() prioridad = 0;
  @Input() tarea;
  @Output() nuevaPrioridad = new EventEmitter();
  voto(valor) {
    this.prioridad += valor;
    this.nuevaPrioridad.emit({
      prioridad: this.prioridad,
      tarea: this.tarea
    });
  }
}
