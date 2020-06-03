import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import {environment} from '../../environments/environment'

@Component({
  selector: 'app-scheduled-announcements',
  templateUrl: './scheduled-announcements.component.html',
  styleUrls: ['./scheduled-announcements.component.css']
})
export class ScheduledAnnouncementsComponent implements OnInit {
  public announcementList: any = [];
  environmentURL:String = environment.api + "/";
  name:String ='';
  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.authService.getScheduledAnnouncements().subscribe(result =>{
      console.log(result);
      this.announcementList = result;
    },(error:any)=>alert("Announcements Cannot be Displayed"));
  }

  logout(){
    localStorage.clear();
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  goToViewScheduledAnnouncement(notificationId:String) {
    this.router.navigate(['/scheduled-notification',notificationId]);
  }

  deleteScheduledAnnouncement(id:String){
    this.authService.deleteScheduledAnnouncement(id).subscribe(result =>{
      alert("Announcement Deleted Succesfully");
      window.location.reload();
    });
  }

  editScheduledAnnouncement(id:String){
    this.router.navigate(['/edit-scheduled-notification',id]);
  }

}
