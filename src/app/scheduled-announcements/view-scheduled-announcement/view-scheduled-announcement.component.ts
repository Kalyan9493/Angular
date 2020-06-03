import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-view-scheduled-announcement',
  templateUrl: './view-scheduled-announcement.component.html',
  styleUrls: ['./view-scheduled-announcement.component.css']
})
export class ViewScheduledAnnouncementComponent implements OnInit {
  notification;
  imageDisabled:Boolean = true;
  environmentURL:String = environment.api + "/";
  constructor(private route:ActivatedRoute,private authService:AuthServiceService,private router:Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.authService.getScheduledAnnouncementById(id).subscribe(result =>{
     
      this.notification = result;
      console.log(typeof this.notification)
      if(this.notification.imageURL){
        this.imageDisabled=false;
      }
      console.log(result);
     
    }, (error:any)=>alert("Announcements Cannot be Displayed"));
  }

  logout(){
    localStorage.clear();
    this.authService.logout();
    this.router.navigateByUrl('');
  }

}
