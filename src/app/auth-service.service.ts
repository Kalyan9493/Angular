import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private httpClient:HttpClient) { }

  login(data):Observable<any>{
    return this.httpClient.post(environment.api+'/login',data);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

 logout(){
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.clear();
  }

  getTags():Observable<any>{
    return this.httpClient.get(environment.api+'/tags');
  }

  postAnnouncement(data):Observable<any>{
    return this.httpClient.post(environment.api+'/announcements',data);
  }

  getAnnouncement():Observable<any>{
    return this.httpClient.get(environment.api+'/announcements');
  }

  getAnnouncementById(id:String):Observable<any>{
    return this.httpClient.get(environment.api+'/announcements/'+id);
  }

  getTagsByUserId(userid:String):Observable<any>{
    return this.httpClient.get(environment.api+'/userintags/'+'"'+userid+'"');
  }

  getAnnouncementByTags(tags:String):Observable<any>{
    return this.httpClient.get(environment.api+'/getannouncementbytags/'+tags);
  }

  pushNotification(pushNotificationData :any):Observable<any>{
    return this.httpClient.post(environment.api+'/firebase/notification',pushNotificationData);
  }

  getDeviceTokens():Observable<any>{
    return this.httpClient.get(environment.api+'/devicetoken');
  }

  getScheduledAnnouncements():Observable<any>{
    return this.httpClient.get(environment.api+'/scheduledannouncement')
  }
  getScheduledAnnouncementById(id:String):Observable<any>{
    return this.httpClient.get(environment.api+'/scheduledannouncement/'+id);
  }

  deleteScheduledAnnouncement(id:String):Observable<any>{
    return this.httpClient.delete(environment.api+'/scheduledannouncement/'+id);
  }

  updateAnnouncement(id:String,data):Observable<any>{
    return this.httpClient.put(environment.api+'/scheduledannouncement/'+id,data);
  }

}
