import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SwPush} from '@angular/service-worker';

const VAPID_PUBLIC = "BAWZEHAAfI9610zX2CuxXgcO9ZvtBxzdKlAJDcE19rEJ1WjRk1o2NV7DDdp-MLlq1Ueh4dZOBv3gLHeo3-LDOKc";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  formGroup:FormGroup;
  constructor(private authService:AuthServiceService, private router:Router,private swPush: SwPush) {
   }
  ngOnInit(): void {
    this.initForm();
    this.subcribeAnnouncement(this.swPush,this.authService);
  }
  initForm(){
    this.formGroup = new FormGroup({
      username:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
    })
  }

  loginProcess(){
    if(this.formGroup.valid){
      this.authService.login(this.formGroup.value).subscribe( result =>{
        
        if(result){
          localStorage.setItem('token',result.token);
          localStorage.setItem('name',result.name);
          localStorage.setItem('isAdmin',result.isAdmin);
          localStorage.setItem('id',result.id);
          this.router.navigate(['/admin']);
         // alert("welcome Admin "+result.name);
        }
      },(error:any)=>alert("Invalid Username Or Password"))
    }
  }

  subcribeAnnouncement(swPush,authService){
    if (swPush.isEnabled) {
      swPush
        .requestSubscription({
          serverPublicKey: VAPID_PUBLIC,
        })
        .then(subscription => {
          // send subscription to the server

          authService.sendSubscriptionToTheServer(subscription).subscribe()
        })
        .catch(console.error)
    }else{
      console.log("swPush Not Enabled");
    }
  };
}
