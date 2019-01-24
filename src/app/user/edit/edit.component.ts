import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user.interface';
import { v4 as uuid } from 'uuid';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  user: User;
  userFrm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userFrm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      photo: ['', Validators.required]
    });
    this.activatedRoute.paramMap.pipe(
      mergeMap(
        params => {
          const id = params.get('id');
          return this.http.get<User>(`http://localhost:3000/users/${id}`);
        }
      )
    ).subscribe(user => {
      this.user = user;
      this.userFrm.patchValue(user);
    });
  }
  onSubmit() {
    if (this.userFrm.valid) {
      const value = this.userFrm.value;
      const user: User = {
        id: uuid(),
        ...value
      };
      this.http.patch(`http://localhost:3000/users/${this.user.id}`, user)
        .subscribe(() => {
          this.router.navigateByUrl('/user');
        });
    }
  }
}
