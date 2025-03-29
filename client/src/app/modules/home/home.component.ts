import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '../../core/services/courses.service';
import { SubscriptionsService } from '../../core/services/subscriptions.service';
import { NavbarComponent } from '../../main-layout/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private router: Router,private _coursesService:CoursesService,private _subscriptionService:SubscriptionsService){}
  data:any
  Tarif:any
  ngOnInit(): void {
    this._coursesService.getAllCourses().subscribe(r=>{
      this.data=r
      console.log(r)
    })
    this._subscriptionService.getSubscriptionTypes().subscribe(r=>{
      console.log(r)
      this.Tarif=r;
    })

  }
  goToCourseDetail(courseId:any){
    this.router.navigate(['/course', courseId])
  }

  
}
