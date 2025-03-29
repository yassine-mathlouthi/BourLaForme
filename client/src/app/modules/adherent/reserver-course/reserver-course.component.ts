import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CoursesService } from '../../../core/services/courses.service';
import { SubscriptionsService } from '../../../core/services/subscriptions.service';

@Component({
  selector: 'app-reserver-course',
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: './reserver-course.component.html',
  styleUrl: './reserver-course.component.css'
})
export class ReserverCourseComponent implements OnInit {
  constructor(private router: Router,private _coursesService:CoursesService,private _subscriptionService:SubscriptionsService){}
  data:any
  Tarif:any
  ngOnInit(): void {
    this._coursesService.getAllCourses().subscribe(r=>{
      this.data=r
      console.log(r)
    })

  }
  body:{
    courseId:string
  }={courseId:''}
  resrverCourse(courseId:any){
    console.log(courseId)
    this.body.courseId=courseId
    console.log(this.body,"json")
    this._coursesService.reserverCour(this.body).subscribe(r=>{
      console.log(r)
    })

  }

}
