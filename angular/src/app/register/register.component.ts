import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 
     firstName : string ="";
     lastName : string ="";
     email: string = "";
     password: string="";
     username: string="";
     role: string="";

     contactForm = new FormGroup({
      password : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required, Validators.email]),
     
      username : new FormControl('', [Validators.required]),
      firstName :new FormControl('', [Validators.required]),
      lastName : new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
     
    })

    constructor(private router:Router,private http:HttpClient,private projectservice:ProjectService){
   
    }
  ngOnInit(): void {
  }
   
    save(){

      if (this.contactForm.invalid) {
        alert("Please fill in all the required fields.");
        return;
      }




      let bodyData={
        "firstName": this.firstName,
        "lastName" : this.lastName,
        "email":this.email,
        "password":this.password,
        "role":this.role,
        "username":this.username
      };
      console.log(bodyData)
       this.projectservice.registerUser(bodyData).subscribe((resultData:any)=>
       {
        
         console.log(resultData)
         const token = resultData;
         localStorage.setItem('token', token);
         alert("Successfully Registered");
         this.router.navigateByUrl('/login');
       });
   
    }
  }

