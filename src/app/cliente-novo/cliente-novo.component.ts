import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-cliente-novo',
  templateUrl: './cliente-novo.component.html',
  styleUrls: ['./cliente-novo.component.scss']
})

export class ClienteNovoComponent implements OnInit {
  productForm: FormGroup;
  nome: String = '';
  email: String = '';
  cpf: String = '';
  dataNasc: Date = null;
  isLoadingResults = false;
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
     this.productForm = this.formBuilder.group({
    'nome' : [null, Validators.required],
    'email' : [null, Validators.required],
    'cpf' : [null, Validators.required],
    'dataNasc' : [null, Validators.required]
  });
  }

  addCliente(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addCliente(form)
      .subscribe(res => {
          const id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/cliente-detalhe', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}