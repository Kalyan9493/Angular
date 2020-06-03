import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import {CreateNotificationComponent} from './create-notification/create-notification.component';
import {ViewNotificationComponent} from './admin/view-notification.component'
import {ScheduledAnnouncementsComponent} from './scheduled-announcements/scheduled-announcements.component'
import { ViewScheduledAnnouncementComponent } from './scheduled-announcements/view-scheduled-announcement/view-scheduled-announcement.component';
import { EditScheduledAnnouncementComponent } from './scheduled-announcements/edit-scheduled-announcement/edit-scheduled-announcement.component';
const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'admin',component:AdminComponent,canActivate:[AuthGuard]},
  {path: 'createnotification', component: CreateNotificationComponent,canActivate:[AuthGuard]},
  {path:'admin/:id',component: ViewNotificationComponent,canActivate:[AuthGuard]},
  {path:'scheduled-notification',component:ScheduledAnnouncementsComponent,canActivate:[AuthGuard]},
  {path:'scheduled-notification/:id',component:ViewScheduledAnnouncementComponent,canActivate:[AuthGuard]},
  {path:'edit-scheduled-notification/:id',component:EditScheduledAnnouncementComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
