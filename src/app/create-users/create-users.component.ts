import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateUsersFormComponent } from '../create-users-form/create-users-form.component';
import { UsersService } from '../users.service';


export interface User {
  name: string;
  id: number;
  phone: string;
}
@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {

  durationInSeconds = 5

  users: User[] = []

  formControl: FormGroup

  displayedColumns: string[] = ['id', 'name', 'phone', 'actions'];
  dataSource = new MatTableDataSource(this.users);

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dailog: MatDialog, 
    private readonly _snackBar: MatSnackBar,
    private readonly localService: UsersService
  ) { }

  ngOnInit(): void {
    this.getuser()
    this.formControl = this.fb.group({
      filter: ''
    })
  }


  getuser(){
    this.users = this.localService.getUsers()
    this.dataSource = new MatTableDataSource(this.users);
  }

  applyFilter(event: Event) {
    const filterValue = this.formControl.controls['filter'].value
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(user: User){
    this.localService.deleteUser(user)
    this.dataSource =  new MatTableDataSource(this.users);
    this.openSnackBar('Usuário removido com sucesso', 'OK')
  }

  addUser(){
    this.dailog.open(CreateUsersFormComponent, {
      width: '24rem',
      height: '20rem'
    }).afterClosed().subscribe((resp: {user: User}) => {
      if(resp){
        if(!this.users.length){
          resp.user.id = 1
        }else if(this.users.length > 0){
          resp.user.id = this.users[this.users.length - 1].id + 1
        }
        
        let user = {
          name: resp.user.name,
          phone: resp.user.phone,
          id: resp.user.id,
        }

        this.localService.addUsers(user)

        this.dataSource =  new MatTableDataSource(this.users);
        this.openSnackBar('Usuário adicionado com sucesso', 'OK')
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  
}
