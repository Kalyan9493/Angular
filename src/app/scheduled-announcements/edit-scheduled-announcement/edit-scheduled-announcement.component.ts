import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import { FormGroup, FormControl, Validators ,FormBuilder, RequiredValidator} from '@angular/forms';

@Component({
  selector: 'app-edit-scheduled-announcement',
  templateUrl: './edit-scheduled-announcement.component.html',
  styleUrls: ['./edit-scheduled-announcement.component.css']
})
export class EditScheduledAnnouncementComponent implements OnInit {
  notification;
  imageDisabled:Boolean = true;
  environmentURL:String = environment.api + "/";
  notificationForm:FormGroup;
  selectedFile: File=null;
  tagList:String [] = [];
  saveAnnouncementButton = false;
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private authService:AuthServiceService,private router:Router) {

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
    const id = this.route.snapshot.params['id'];
    this.authService.getScheduledAnnouncementById(id).subscribe(result =>{
     
      this.notification = result;
      this.tagList = this.notification.tags;
      this.notificationForm.patchValue({
      title:this.notification.title,
      description:this.notification.description,
      details:this.notification.details,
      link:this.notification.link,
      tags:JSON.stringify(this.notification.tags),
      scheduledTime:this.notification.scheduledDate

      })
      console.log(typeof this.notification)
      console.log(result);
    }, (error:any)=>alert("Announcements Cannot be Displayed"));

   
    
  }
  logout(){
    localStorage.clear();
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  addToTags(){
    if(this.tagList === null){
      this.tagList = [];
    }
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

  onFileSelected(event){
    this.selectedFile =<File> event.target.files[0];
  }




  updateAnnouncement(){
   
    const id = this.route.snapshot.params['id'];
    const fd = new FormData();
    if(this.selectedFile != null){
      fd.append('image',this.selectedFile,this.selectedFile.name);
    }
   
    fd.append('title',this.notificationForm.get('title').value);
    fd.append('description',this.notificationForm.get('description').value);
    fd.append('details',this.notificationForm.get('details').value);
    fd.append('link',this.notificationForm.get('link').value);
    fd.append('tags',JSON.stringify(this.tagList));
    fd.append('scheduledTime',this.notification.scheduledDate);
    console.log(this.notificationForm.get('tags').value);
    console.log(this.notification.scheduledDate)
    console.log(fd);
    console.log(this.notificationForm.value)
    console.log("Tags: "+this.notificationForm.get('tags').value);
    this.notificationForm.patchValue({
      tags:this.tagList
    })
    if(this. notificationForm.valid){
      console.log('Post Announcement Called');
      console.log(this.notificationForm.value);
      this.saveAnnouncementButton = true;
      console.log(fd)

      this.authService.updateAnnouncement(id,this.notificationForm.value).subscribe( result =>{
        console.log("Announcement :",result);
        alert("Announcement Updated Succesfully");
        this.router.navigateByUrl('/scheduled-notification')
      },(error:any)=>alert("Error in sending Annnouncement"))
    }
  }
}
