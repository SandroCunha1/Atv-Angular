import { Component, OnInit } from '@angular/core';
import { Carro } from '../../models/carro';
import { FormServiceService } from '../../services/form-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public clean!: number;
  public edit: boolean = false;
  public index: number = -1;
  public date: Date = new Date()
  public lastYear: number = this.date.getFullYear() + 1
  public erro: boolean = false;

  public carro:Carro = {
      marca: "",
      placa: "",
      ano: this.clean,
      tipo: ""
  }

  constructor(private service: FormServiceService) { }

  ngOnInit(): void {
    this.service.emitEvent.subscribe({
      next: (res: any) => {
        this.carro = res[0]
        this.index = res[1]
        this.edit = !this.edit
      }
    })
    
  }

  public save(carro:Carro, form:any){

    if(carro.ano >= 1990 && carro.ano <= this.lastYear){

    this.erro = false;

    let novoCarro: Carro = {
      marca: carro.marca,
      placa: carro.placa.toUpperCase(),
      ano: carro.ano,
      tipo: carro.tipo
    }

    form.reset();

    return this.service.addCarro(novoCarro);
    }else{
      this.erro = true;
    }

  }

  public editCarro(carro:Carro, form:any){
    if(carro.ano >= 1990 && carro.ano <= this.lastYear){

      this.erro = false;
    this.service.deleteCarro(this.index)
    this.save(carro, form)
    this.edit = false;
    this.service.setEndEdit(false);
    }else{
      this.erro = true;
    }
  }

  public cancelEdit(form:any){
    form.reset();
    this.edit = false;
    this.service.setEndEdit(false);
  }

  public isEmpty():boolean{
    if(!this.carro.marca || !this.carro.placa || !this.carro.ano || !this.carro.tipo){
      return true
    }
    return false
  }


}
