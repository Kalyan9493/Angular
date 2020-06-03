import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { Router } from '@angular/router';
import {AuthServiceService} from '../auth-service.service';
import { FormGroup, FormControl, Validators ,FormBuilder, RequiredValidator} from '@angular/forms';
@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.component.html',
  styleUrls: ['./create-notification.component.css']
})
export class CreateNotificationComponent implements OnInit {

  notificationForm:FormGroup;
  selectedFile: File=null;
  tagList:String [] = [];
  scheduleHidden:Boolean = true;
  sendnowButton:Boolean = false;
  saveAnnouncementButton:Boolean = false;
  constructor(private router:Router,private authService:AuthServiceService,private fb:FormBuilder) { 
    this.notificationForm = this.fb.group({
      title:[''],
      description:[''],
      details:[''],
      link:[''],
      image:[''],
      tags:['',Validators.required],
      scheduledTime:['']
    })
  }

  ngOnInit(): void {
  }

  onFileSelected(event){
    this.selectedFile =<File> event.target.files[0];
  }
  logout(){
    localStorage.clear();
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  Back(){
    this.router.navigateByUrl('/admin');
  }

  PreviousNotifications(){
    this.router.navigateByUrl('/admin');
  }
  getTags(){
    this.authService.getTags().subscribe( result =>{
      console.log(result[0])
    },(error:any)=>alert("Invalid Username Or Password"))

  }
  addToTags(){
    console.log(this.tagList.length)
    var count = 0;
    for(var i=0;i < this.tagList.length;i++){
      if(this.notificationForm.get('tags').value==="" || this.notificationForm.get('tags').value === this.tagList[i]){
        count = count+1;
      }
    }
    if(this.notificationForm.get('tags').value!=="" &&(count === 0 || this.tagList.length === 0)){
      this.tagList.push(this.notificationForm.get('tags').value);
    }
    
    console.log(this.tagList)
  }
  postAnnouncement(){
   
    const fd = new FormData();
    if(this.selectedFile != null){
      fd.append('image',this.selectedFile,this.selectedFile.name);
    }
   
    fd.append('title',this.notificationForm.get('title').value);
    fd.append('description',this.notificationForm.get('description').value);
    fd.append('details',this.notificationForm.get('details').value);
    fd.append('link',this.notificationForm.get('link').value);
    fd.append('tags',JSON.stringify(this.tagList));
    fd.append('scheduledTime',this.notificationForm.get('scheduledTime').value);
    console.log(this.notificationForm.get('scheduledTime').value)
    console.log(fd);
    if(this. notificationForm.valid){
      console.log('Post Announcement Called');
      console.log(this.notificationForm.value);
      this.sendnowButton = true;
      this.saveAnnouncementButton = true;
      this.authService.postAnnouncement(fd).subscribe( result =>{
        console.log("Announcement :",result);
        alert("Message Sent Succesfully");
        this.router.navigateByUrl('/admin')
        if(this.notificationForm.get('scheduledTime').value){
          console.log("Scheduled Announcement")
        }else{
          this.authService.getDeviceTokens().subscribe(tokens =>{
            var tokenArray = [];
             tokens.forEach(element => {
               tokenArray.push(element.token);
             });
             console.log( "Token :"+tokens[0].token);
             const pushNotificationData = {
               token:tokenArray,
               payload:{
                 notification:{
                   title:result[0].title,
                   body:result[0].description
                 }
               }
   
             }
             console.log(pushNotificationData)
             this.authService.pushNotification(pushNotificationData).subscribe(result =>{
               console.log(result);
             })
           })

        }
       
      },(error:any)=>alert("Error in sending Annnouncement"))
    }
  }
  scheduleAnnouncement(){
    this.scheduleHidden = false;
  }
}
