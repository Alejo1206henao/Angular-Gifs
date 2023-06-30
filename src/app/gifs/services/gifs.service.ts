import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {HttpClientModule} from "@angular/common/http";
import {Gif, SearchResponse} from "../interfaces/gifs.interfaces";

const GifsApiKey = 'WlDaVPrwxx6GQ1iYJeUh77RIqv3Hxe07';
@Injectable({
  providedIn: 'root'
})
export class GifsService {
  //lista volatin => cada vez que se cargue o se cree una lista nueva.
  //el gifsList se vuelve a crear, o se sobrescribe apenas tenga más data
  public gifsList: Gif[] = [];
  private _tagsHistory:string[] = [];
  private apiKey:      string = 'WlDaVPrwxx6GQ1iYJeUh77RIqv3Hxe07';
  private servicesUrl: string = 'https://api.giphy.com/v1/gifs';

  //Estoy creando un metodo con el fin de almacenar la información
  //en el localStroge y volverlo a recuperar despues
  private saveLocalStroge():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  //cargar las información en el localStrorage
  // private loadLocalStorage(){
  //   if( localStorage.getItem('history')) return;
  //   this._tagsHistory = JSON.parse(localStorage.getItem('history')!)
  // }
  private loadLocalStorage(): void {
    const storedHistory: string|null = localStorage.getItem('history');
    if (storedHistory) {
      this._tagsHistory = JSON.parse(storedHistory);
    }
    if(this._tagsHistory.length === 0 ) return;
    this.searchTag(this._tagsHistory[0])
  }

  //inyección del http
  constructor(private Http:HttpClient ) {
    this.loadLocalStorage();
    console.log('llego la historia');
  }
  get tagsHistory(){
    //los arreglos pasan por referencia
    //estoy haciendo copia al valor de tags con el operado Spread
    return [...this._tagsHistory];
  }
  private organizeHistory(tag:string){

    tag = tag.toLowerCase();

    //estoy haciendo la eliminación del tag para volver a ingresar
    if (this.tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag)=> oldTag != tag)
    }

    // otra forma de hacerlo
    // const index = this._tagsHistory.indexOf(tag);
    // if (index !== -1) {
    //   this._tagsHistory.splice(index, 1);
    // }
    //aqui
    this._tagsHistory.unshift(tag)
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStroge();
  }

  //este metodo solo esta vazado en lo insertan o buscan

    //forma 1
    //
    //  async searchTag(tag:string): promise <void> {
    //   if (tag.length == 0)
    //     return;
    //   this.organizeHistory(tag);
    // cons resp = await fetch('http://api.giphy.com/v1/gifs/search?api_key=WlDaVPrwxx6GQ1iYJeUh77RIqv3Hxe07&q=valorant')
    // );
    // cons data = await resp.json();
    // console.log(data);

    //   fetch('/search?api_key=WlDaVPrwxx6GQ1iYJeUh77RIqv3Hxe07&q=valorant')
    //     .then(resp => resp.json())
    //     .then(data=>console.log(data))
    //   this.Http.get('api.giphy.com/v1/gifs/search?api_key=WlDaVPrwxx6GQ1iYJeUh77RIqv3Hxe07&q=valorant')
    //     .subscribe(
    //       resp =>{
    //         console.log(resp);
    //       }
    //     )

  searchTag(tag:string) {
    if (tag.length == 0)
      return;
    this.organizeHistory(tag);

    //forma 2
    const params = new HttpParams()
      .set('api_key', this.apiKey )
      .set('limit', '10')
      .set('q', tag )

    //tipode dato generico <SearchResponse>
    this.Http.get<SearchResponse>(`${this.servicesUrl}/search`, {params})
      .subscribe(resp =>{
        this.gifsList = resp.data;
      })
  }
}
