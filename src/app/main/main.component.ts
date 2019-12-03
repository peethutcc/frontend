import { Component, OnInit } from '@angular/core';
import { ParseapiService } from '../parseapi.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    public ps:ParseapiService,
    private ngZone: NgZone,
    public router: Router
    ) { }

  ngOnInit() {
    if(localStorage.getItem("islogin") == 'true' && localStorage.getItem("isapprove") == 'false' ){
      alert("โปรดติดต่อผู้ดูแลระบบเพื่อทำการยืนยัน");
      this.ngZone.run(() => this.router.navigate(['/']));
    }else if(localStorage.getItem("islogin") == 'false' ||localStorage.getItem("islogin") == undefined ){
      this.ngZone.run(() => this.router.navigate(['/']));
    
    };

    
  }

}
