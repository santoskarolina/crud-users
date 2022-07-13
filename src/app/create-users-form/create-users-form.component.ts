import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-users-form',
  templateUrl: './create-users-form.component.html',
  styleUrls: ['./create-users-form.component.scss']
})
export class CreateUsersFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<CreateUsersFormComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(9)])
    })
  }

  createUser(){

    if(this.form.invalid) return

    const user = {
      name: this.form.controls['name'].value,
      phone: this.form.controls['phone'].value
    }

    this.dialogRef.close({user})
  }


  close(){
    this.dialogRef.close()
  }

  clearData(){
    this.form.reset()
  }

  getErrorMessagePhone() {
    if (this.form.controls['phone'].hasError('required')) {
      return 'Campo obrigatório';
    }

    return this.form.controls['phone'].hasError('minlength') ? 'Informe um telefone válido' : '';
  }

  getErrorMessageName() {
    if (this.form.controls['name'].hasError('required')) {
      return 'Campo obrigatório';
    }

    return this.form.controls['name'].hasError('minlength') ? 'Nome deve ter mais de 3 caracteres' : '';
  }
}
