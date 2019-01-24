import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.interface';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  user: User;
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }


  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      mergeMap(
        params => {
          const id = params.get('id');
          return this.http.get<User>(`http://localhost:3000/users/${id}`);
        }
      )
    ).subscribe(user => this.user = user);
  }
}
