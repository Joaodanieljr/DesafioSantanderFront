import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Cliente } from 'src/model/cliente';
@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.scss']
})
export class ClienteDetalheComponent implements OnInit {
  cliente: Cliente = { id: '', nome: '', email: '', cpf: '', dataNasc: null};
  isLoadingResults = true;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }


  ngOnInit() {
    this.getCliente(this.route.snapshot.params['id']);
  }

  getCliente(id) {
    this.api.getCliente(id)
      .subscribe(data => {
        this.cliente = data;
        console.log(this.cliente);
        this.isLoadingResults = false;
      });
  }

  deleteCliente(id) {
    this.isLoadingResults = true;
    this.api.deleteCliente(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/clientes']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
