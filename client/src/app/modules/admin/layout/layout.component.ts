import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseComponent } from '../courses/add-course/add-course.component';

interface NavItem {
  route: string;
  label: string;
  icon: string;
  iconName:String
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  pageTitle: string = 'Dashboard';

  navItems: NavItem[] = [
    {
      route: '/admin/dashboard',
      label: 'Dashboard',
      icon: 'dashboard-icon',
      iconName:'fa-solid fa-table-columns',
    },
    {
      route: '/admin/subs',
      label: 'Subscription',
      icon: 'orders-icon',
      iconName:"fa-solid fa-coins"
    },
    {
      route: '/admin/accounts',
      label: 'Accounts validation',
      icon: 'orders-icon',
      iconName:"fa-solid fa-users"
      
    },
    {
      route: '/admin/courses',
      label: 'Courses',
      icon: 'stores-icon',
      iconName:"fa-solid fa-dumbbell"
    },
  ];

  userEmail: string | null = null;
  isLoggedIn = true;

  constructor(private router: Router,public dialog: MatDialog) { }

  ngOnInit() {
    

    // Update page title based on current route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updatePageTitle();
      });
  }

  updatePageTitle() {
    const currentUrl = this.router.url;
    const routeTitle = this.navItems.find(
      (item) => currentUrl.startsWith(item.route)
    );

    this.pageTitle = routeTitle ? routeTitle.label : 'Admin Dashboard';
  }

  getArtistAvatarPlaceholder() {
    // If the email exists, extract the first two letters from the local part of the email
    if (this.userEmail) {
      const namePart = this.userEmail.split('@')[0]; // Get the part before '@'
      const initials = namePart.slice(0, 2).toUpperCase(); // Take the first two letters and convert to uppercase
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=ffd966&color=fff`;
    }

    // Default placeholder if email is not found
    return `https://ui-avatars.com/api/?name=NA&background=ffd966&color=fff`;
  }

  openDialog(): void {
    this.dialog.open(AddCourseComponent,{
      width:'600px',
    })
  }

}
