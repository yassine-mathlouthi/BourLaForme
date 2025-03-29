import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../core/services/courses.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-courses',
  standalone: true, 
  imports: [CommonModule,MatButtonModule,RouterModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit {
  constructor(private _coursesService:CoursesService){}
  data:any
  ngOnInit() {
    this._coursesService.getAllCoursesReserved().subscribe(r=>{
      console.log(r)
      this.data=r.reservations
      console.log(sessionStorage.getItem('token'))
    })
  }

}
