import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  apiUrl:string = environment.apiUrl;
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
    this._http.get<any>(this.apiUrl+'restosignup').subscribe({
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
