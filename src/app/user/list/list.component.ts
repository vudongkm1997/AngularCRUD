import { Component, OnInit } from '@angular/core';
import { User } from '../user.interface';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users: User[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<User[]>('http://localhost:3000/users/')
      .subscribe(users => {
        this.users = users;
        console.table(this.users);
      });
  }

  deleteUser(id: string) {
    this.http.delete(`http://localhost:3000/users/${id}`).pipe(
      mergeMap(() => this.http.get<User[]>(`http://localhost:3000/users/${id}`)))
      .subscribe(users => {
        this.users = users;
      });
  }
}
