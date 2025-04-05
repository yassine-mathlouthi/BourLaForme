import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoachesService } from '../../core/services/coaches.service';
import { CoursesService } from '../../core/services/courses.service';
import { SubscriptionsService } from '../../core/services/admin.service';
import { NavbarComponent } from '../../main-layout/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private _coachService:CoachesService,private router: Router,private _coursesService:CoursesService,private _subscriptionService:SubscriptionsService){}
  data:any
  Tarif:any
  coachesList:any
  ngOnInit(): void {
    this._coursesService.getAllCourses().subscribe(r=>{
      this.data=r
      console.log(r)
    })
    this._subscriptionService.getSubscriptionTypes().subscribe(r=>{
      console.log(r)
      this.Tarif=r;
    })
    this._coachService.getAllCoaches().subscribe((r:any)=>{
      this.coachesList=r.coachs

    })

  }
 /*  goToCourseDetail(courseId:any){
    this.router.navigate(['/course', courseId])
  } */

  
}
