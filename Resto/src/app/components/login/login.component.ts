import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private _http: HttpClient,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: [''],
      password: [''],
    });
  }

  logIn() {
    this._http.get<any>('http://localhost:3000/signup').subscribe({
      next: (res) => {
        const user = res.find((a: any) => {
          return (
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
          );
        });
        if (user) {
          alert(user.name + ' logged in successfully');
          this._router.navigate(['/restaurent']);
          this.loginForm.reset();
        } else {
          alert('Invalid credentials');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
