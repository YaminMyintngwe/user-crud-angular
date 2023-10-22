import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users : User[];
  id : number;
  addUser = false;

  constructor(private userService : UserService, private route : ActivatedRoute, private router : Router) {}

  ngOnInit() {
    this.retrieveAllUsers();
  }


  onDeleteUser(id : number) {
    console.log(id);
    this.userService.deleteUser(id).subscribe(
      () => {
        // this.users = this.users.filter(item => item.id !== id);
        this.retrieveAllUsers();
      }
    )
  }

  retrieveAllUsers() {
    this.userService.getAllUsers().subscribe(
      (users : User[]) => {
        this.users = users;
        console.log("User List",this.users)
      } 
    );
  }
}
