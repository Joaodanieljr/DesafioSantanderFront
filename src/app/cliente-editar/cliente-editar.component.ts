import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-cliente-editar',
  templateUrl: './cliente-editar.component.html',
  styleUrls: ['./cliente-editar.component.scss']
})
export class ClienteEditarComponent implements OnInit {
  id: String = '';
  productForm: FormGroup;
  nome: String = '';
  email: String = '';
  cpf: String = '';
  dataNasc: Date = null;
  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCliente(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
   'nome' : [null, Validators.required],
   'email' : [null, Validators.required],
   'cpf' : [null, Validators.required],
    'dataNasc' : [null, Validators.required]
 });
 }

 getCliente(id) {
  this.api.getCliente(id).subscribe(data => {
    this.id = data.id;
    this.productForm.setValue({
      nome: data.nome,
      email: data.email,
      cpf: data.cpf,
      dataNasc: data.dataNasc
    });
  });
}

updateCliente(form: NgForm) {
  this.isLoadingResults = true;
  this.api.updateCliente(this.id, form)
    .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/cliente-detalhe/' + this.id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
}
}
