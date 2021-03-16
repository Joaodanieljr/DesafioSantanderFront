import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Cliente } from 'src/model/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  
  displayedColumns: string[] = [ 'nome', 'email', 'cpf', 'dataNasc', 'acao'];
  dataSource: Cliente[];
  constructor(private _api: ApiService) { }

  ngOnInit() {
    this._api.getClientes()
    .subscribe(res => {
      this.dataSource = res;
      console.log(this.dataSource);
      
    }, err => {
      console.log(err);
     
    });
  }

}
