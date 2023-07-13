import { Component } from '@angular/core';
import { Carro } from '../../models/carro';
import { FormServiceService } from '../../services/form-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  public listaCarros: Array<Carro> = [];
  ngOnInit(): void {
    this.listaCarros = this.service.getLista();
  }

  constructor(private service: FormServiceService) { }

  public deleteItem(index:number){
    if(!this.service.getEndEdit()){
    this.service.deleteCarro(index)
    }else{
      alert("Você deve primeiro salvar ou cancelar a edição atual!")
    }
  }

  public editItem(carro:Carro, i:number){
    if(!this.service.getEndEdit()){
      this.service.carregaCarro(carro, i);
      this.service.setEndEdit(true);
    }else{
      alert("Você deve primeiro salvar ou cancelar a edição atual!")
    }
    
  }

  
}
