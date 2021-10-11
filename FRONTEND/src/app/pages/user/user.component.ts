import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  searchForm: FormGroup;
  users: User[];
  userForm: FormGroup;
  userModalRef!: NgbModalRef;

  @ViewChild("user_modal")
  userModal!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private config: NgbModalConfig, 
    private modalService: NgbModal
  ) { 
    this.config.backdrop = 'static';
    this.config.keyboard = false;
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
    this.users = [];
    this.userForm = this.formBuilder.group({
      id: [0],
      username: ['', Validators.required],
      passwordhash: [''],
      description: [''],
      status: ['A', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.userService.all().subscribe(request => {
      if(request.status === 'OK'){
        this.users = request.data;
      } else {
        alert(request.error); // ALERT
      }
    }, error => {
      console.log(error); // ALERT
    })
  }

  filterUsers(){
    if(this.searchForm.value.search){
      this.userService.filter(this.searchForm.value.search).subscribe(request => {
        if(request.status === 'OK'){
          this.users = request.data;
        } else {
          alert(request.error); // ALERT
        }
      }, error => {
        console.log(error); // ALERT
      })
    } else {
      this.loadUsers();
    }
  }

  newUser(content: any){
    this.userForm.reset();
    this.userModalRef = this.modalService.open(content);
  }

  editUser(content: any, user: User){
    if(user) this.userForm.patchValue({...user});
    this.userModalRef = this.modalService.open(content);
  }

  saveUser(){
    if(!this.userForm.valid) return; // ALERT

    let user = this.userForm.value;

    this.userService.save(user).subscribe(request => {
      if(request.status === 'OK'){
        this.userModalRef.close();
        this.filterUsers(); // ALERT
      } else {
        alert(request.error); // ALERT
      }
    }, error => {
        console.log(error); // ALERT
    });
  }

  deleteUser(user: User){
    if(user){
      let newStatus = ((user.status === 'A')?'I':'A');
      this.userService.delete(user.id, newStatus).subscribe(request => {
        if(request.status === 'OK'){
          this.filterUsers();// ALERT
        } else {
          alert(request.error); // ALERT
        }
      }, error => {
        console.log(error); // ALERT
      })
    }
  }

}
