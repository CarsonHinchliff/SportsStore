import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AuthService } from "../model/auth.service";

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public username: string;
  public password: string;
  public errorMessage: string;

  constructor(private router: Router,
  private authSvc: AuthService) { }

  ngOnInit() {
  }

  authenticate(form: NgForm){
    if(form.valid)    {
      this.authSvc.authenticate(this.username, this.password)
      .subscribe(res => {
        if(res){
          this.router.navigateByUrl("/admin/main");
        }
        this.errorMessage = "Authentication Failed";
      });      
    }
    else{
      this.errorMessage = "Form Data Invalid";
    }
  }

}
