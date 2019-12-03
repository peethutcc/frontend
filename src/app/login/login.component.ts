import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ParseapiService } from '../parseapi.service';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public ps:ParseapiService,
    private ngZone: NgZone,
    public router: Router) {
    ps.init();
   }

  ngOnInit() {
    if(localStorage.getItem("isapprove") == 'true' && localStorage.getItem("islogin") == 'true' ){
      this.ngZone.run(() => this.router.navigate(['/main']));
    }
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();


  logIn(u1,u2){
    this.ps.logIn(u1,u2);
    
  }
}
