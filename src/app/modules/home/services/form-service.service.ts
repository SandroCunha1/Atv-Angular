import { EventEmitter, Injectable } from '@angular/core';
import { Carro } from '../models/carro';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  constructor() { }

  public emitEvent = new EventEmitter();


  private listaCarros: Array<Carro> = JSON.parse(localStorage.getItem("carros") || '[]');
  public endEditing:boolean = false;

  public getLista(){
    return this.listaCarros;
  }

  public carregaCarro(carro:Carro, i:number){
    let rCarro: Carro = {
      marca: carro.marca,
      placa: carro.placa,
      ano: carro.ano,
      tipo: carro.tipo
    }
    this.emitEvent.emit([rCarro, i])
  }

  public addCarro(carro:Carro) {
    this.listaCarros.push(carro);
    localStorage.setItem('carros', JSON.stringify(this.listaCarros))
  }

  public deleteCarro(index:number){
    this.listaCarros.splice(index, 1);
  }

  public setEndEdit(end:boolean){
    this.endEditing = end;
  }
  public getEndEdit():boolean{
    return this.endEditing
  }

}
