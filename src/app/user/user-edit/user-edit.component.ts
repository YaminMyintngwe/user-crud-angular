import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  id : number;
  editUser = false;
  userForm : FormGroup;
  constructor(private route : ActivatedRoute, private userService : UserService, private router : Router ) {}


  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
        this.id = params['id'];
        console.log(this.id);
        this.editUser = this.id != 0;
        console.log(this.editUser);
      }
    );

    this.userForm = new FormGroup({
      'name' : new FormControl('',[Validators.required]),
      'email' : new FormControl('',[Validators.required, Validators.email]),
      'phoneNumber' : new FormControl('',[Validators.required, Validators.minLength(9), Validators.maxLength(11),Validators.pattern(/^09[0-9]*/)]),
      'gender' : new FormControl('',[Validators.required]),
      'address' : new FormControl('',Validators.required)
    });

    if(this.editUser) {
      this.userService.getUserById(this.id).subscribe(
        (user : User) => {
          this.userForm.patchValue(user);
        }
      )
    }
    
  }
  
  onSubmit() {
    if(this.editUser) {
      console.log(this.id);
      this.userService.updateUser(this.id, this.userForm.value).subscribe(
        updateUser => {
          console.log(updateUser);
          this.router.navigate(['../'], {relativeTo : this.route});
        }
      )
    } else {
      this.userService.addUser(this.userForm.value).subscribe(
        newUser => {
          console.log(newUser);
          this.router.navigate(['../'], {relativeTo : this.route});
        }
      )
    }
  }

  onClear() {
    this.userForm.reset();
    this.editUser = false;
  }
}
