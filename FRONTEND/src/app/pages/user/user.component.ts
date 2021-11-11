import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCheck, faEdit, faPlus, faSave, faSearch, faTimes, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  // Icons
  faPlus = faPlus;
  faSearch = faSearch;
  faEdit = faEdit;
  faTimes = faTimes;
  faCheck = faCheck;
  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;
  faSave = faSave;

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
      Id: [0],
      UserName: ['', Validators.required],
      PasswordHash: ['', Validators.required],
      Description: [''],
      Status: ['A', Validators.required]
    });
  }
  // Validators.pattern(/^[a-zA-Z]+$/)

  ngOnInit(): void {
    this.loadUsers();
  }

  resetForm(){
    this.userForm = this.formBuilder.group({
      Id: [0],
      UserName: ['', Validators.required],
      PasswordHash: ['', Validators.required],
      Description: [''],
      Status: ['A', Validators.required]
    });
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
    this.resetForm();
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
      let newStatus = ((user.Status === 'A')?'I':'A');
      this.userService.delete(user.Id, newStatus).subscribe(request => {
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
