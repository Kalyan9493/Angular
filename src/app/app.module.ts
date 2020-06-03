import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import {TokenInterceptorService} from './token-interceptor.service';
import { CreateNotificationComponent } from './create-notification/create-notification.component';
import { ViewNotificationComponent } from './admin/view-notification.component';
import { ServiceWorkerModule, SwUpdate, SwPush } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ScheduledAnnouncementsComponent } from './scheduled-announcements/scheduled-announcements.component';
import { ViewScheduledAnnouncementComponent } from './scheduled-announcements/view-scheduled-announcement/view-scheduled-announcement.component';
import { EditScheduledAnnouncementComponent } from './scheduled-announcements/edit-scheduled-announcement/edit-scheduled-announcement.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    CreateNotificationComponent,
    ViewNotificationComponent,
    ScheduledAnnouncementsComponent,
    ViewScheduledAnnouncementComponent,
    EditScheduledAnnouncementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(update:SwUpdate,push:SwPush){
    if(push.isEnabled){
    update.available.subscribe(update =>{
      console.log("Update Available");
    })

    push.messages.subscribe(msg =>{
      console.log(msg);
      alert(msg);
    })

    const key = 'BAWZEHAAfI9610zX2CuxXgcO9ZvtBxzdKlAJDcE19rEJ1WjRk1o2NV7DDdp-MLlq1Ueh4dZOBv3gLHeo3-LDOKc';
    push.requestSubscription({serverPublicKey:key}).then(pushSubscription =>{
      console.log(pushSubscription.toJSON());
    })
  }

  }

 }
