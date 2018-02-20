import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/mergeMap";

declare let $:any;

@Component({
  selector: 'app-reactive',
  template: `
    <input type="text" class="form-control"
           id="search"
           placeholder="busca...">
  `
})
export class ReactiveComponent implements OnInit {

  private flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  constructor() {
    console.log(new Observable());
  }

  ngOnInit() {
    let keyups = Observable.fromEvent($("#search"),'keyup')
      .map((e:any)=>e.target.value)
      .filter(text => text.length > 3)
      .distinctUntilChanged()
      .debounceTime(1000)
      .flatMap(searchTerm =>{
        //Promesses
        let promesa =$.getJSON(this.flickerAPI, {
          tags: searchTerm,
          tagmode: "all",
          format: "json"
        });
        return Observable.fromPromise(promesa);

      });

    keyups.subscribe(
      (data:any) => console.log(data),
    (error:any) => console.log(error),
      () => console.log("Completo")
    )
  }

}
