import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : string ="";
  password: string="";
 
  contactForm = new FormGroup({
    password : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required, Validators.email])
  })
  decodedToken: any;
 
  constructor(private router:Router ,private http:HttpClient, private projectservice: ProjectService ) { }
 
  ngOnInit(): void {
    const decodedTokenString = localStorage.getItem('token');
    if (decodedTokenString) {
      this.decodedToken = jwtDecode(decodedTokenString);
    }
    localStorage.clear()
  }
 
  login()
  {

    if (this.contactForm.invalid) {
      // alert("Please fill in all the required fields.");
      return;
    }

    let bodyData={
    "email": this.email,
    "password":this.password,
  };
   this.projectservice.loginUser(bodyData).subscribe((resultData:any)=>
   {
     console.log(resultData);
     
     const token = resultData;
     localStorage.setItem('token', token);
     localStorage.setItem('role',this.decodedToken.role)

      console.log(localStorage.getItem('role'))
 
     
      
        alert("Successfully Logined");
 
        this.router.navigateByUrl('/dashboard');
      
     },
    (error) => {
      let errorMessage: string;
      if (error.status === 403) {
        errorMessage = 'Invalid email or password';
      } else {
        errorMessage = 'An error occurred. Please try again.';
      }
      alert(errorMessage);
    }
    );
  }
 
 
}
