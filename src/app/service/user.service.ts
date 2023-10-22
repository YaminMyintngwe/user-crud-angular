import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>('/api/users');
  }

  getUserById(id : number): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`)
  }

  addUser(user : User) {
    return this.http.post('/api/users', user);
  }

  updateUser(id : number, newUser : User) {
    return this.http.put(`/api/users/?id=${id}` , newUser);
  }

  deleteUser(id : number) {
    return this.http.delete(`/api/users/?id=${id}`);
  }
}
