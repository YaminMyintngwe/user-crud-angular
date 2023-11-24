import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users : User[];
  id : number;
  addUser = false;
  subscription : Subscription;
  userId : number;
  //isModalVisible: boolean = true;
  //@ViewChild('liveToast') toast : ElementRef;
  showToast = false;

  constructor(private userService : UserService, private route : ActivatedRoute, private router : Router) {}

  ngOnInit() {
    this.retrieveAllUsers();
  }


  retrieveAllUsers() {
    this.subscription = this.userService.getAllUsers().subscribe(
      (users :  User[]) => {
        this.users = users;
        console.log("User List",this.users)
      } 
    );
  }

  openDeleteModal(id : number) {
    this.userId = id;
    console.log(this.userId);
  }

  onDeleteUser(id : number) {
    console.log(id);
    this.userService.deleteUser(this.userId).subscribe(
      () => {
        // this.users = this.users.filter(item => item.id !== id);
        this.retrieveAllUsers();
      }
    )
    //this.isModalVisible = false;
    //$((<HTMLDivElement> this.toast.nativeElement).id).show();
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 2000)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
