import {Component, ElementRef, ViewChild} from '@angular/core';
import {GifsService} from "../../services/gifs.service";

// con el (keyup) estoy llamando la varible (searchTag), el cual le
// estoy asignando el valor que yo escriba y me la guarde en el metodo
// el (#) se llama referencia local=> y se va a conocer en todo el template
@Component({
  selector: 'gifs-search-box',
  template: `
    <h5> Buscar: </h5>
    <input type="text" class="form-control"
    placeholder="Buscar gifs..."
    (keyup.enter)="searchTag()"
    #txtTagInput>
  `,
})

// el viewChild (ARREGLO) nos ayuda a tomar una referencia local en este caso
// el input, también puede regresar un arreglo de todos los elementos HTML
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!:ElementRef<HTMLInputElement>;

  constructor(private gifsService:GifsService) {
  }
  searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}
