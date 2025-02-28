import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-courses-management',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './courses-management.component.html',
  styleUrl: './courses-management.component.css'
})
export class CoursesManagementComponent {

}
