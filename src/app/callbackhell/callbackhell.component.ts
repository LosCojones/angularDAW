import { Component, OnInit } from '@angular/core';
declare let $:any;

@Component({
  selector: 'app-callbackhell',
  template: `
    <input type="text" class="form-control"
    (keyup)="tecla($event)"
    placeholder="busca...">
  `
})
export class CallbackhellComponent implements OnInit {

  private flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"
  private text:string = '';
  constructor() { }

  ngOnInit() {
  }

  tecla(e){
    this.text = e.target.value;
    if(this.text.length<4) return;
    this.debounce();
  }

  respuesta(data){
    console.log("respuesta de Flickr",data);
  }

  liveSearch(){
    console.log('texto: ', this.text);
    $.getJSON(this.flickerAPI,{
      tags: this.text,
      tagmode: "all",
      format: "json"
    },this.respuesta)
  }

  t:any;
  debounce(){
    if(this.t) window.clearTimeout(this.t);
    this.t = window.setTimeout(()=> {this.liveSearch()}, 1000)
  }
}
