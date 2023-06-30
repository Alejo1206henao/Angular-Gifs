import { Component } from '@angular/core';
import {GifsService} from "../../../gifs/services/gifs.service";

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService:GifsService) {
  }
  get tags(){
    return this.gifsService.tagsHistory;
  }
  //estoy creando un metodo con el fin de que me consulte el servicio
  //y me traiga la url del la variable ingresada con el click
  SearchTag(tag:string):void{
    this.gifsService.searchTag(tag);
  }

}
