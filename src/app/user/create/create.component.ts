import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../user.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  userFrm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.userFrm = this.fb.group({
      name: ['', [ Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      photo: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userFrm.valid) {
      const value = this.userFrm.value;
      const user: User = {
        id: uuid(),
        ...value
      };
      this.http.post('http://localhost:3000/users', user)
        .subscribe(() => {
          this.router.navigateByUrl('/user');
        });
    }
  }
}
