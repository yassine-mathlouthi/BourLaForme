import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../main-layout/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  
}
