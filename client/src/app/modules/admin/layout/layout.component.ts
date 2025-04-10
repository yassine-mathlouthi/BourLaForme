import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseComponent } from '../courses/add-course/add-course.component';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { SubscriptionsService } from '../../../core/services/admin.service';

interface NavItem {
  route: string;
  label: string;
  icon: string;
  iconName:String
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule,CommonModule, MatButtonModule, MatMenuModule],
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
      route: '/admin/Subscription',
      label: 'Subscription',
      icon: 'subs-icon',
      iconName:"fa-solid fa-coins"
    },
    {
      route: '/admin/coaches',
      label: 'Coaches management',
      icon: 'users-icon',
      iconName:'fa-solid fa-users',
    },
    {
      route: '/admin/accounts',
      label: 'Accounts management',
      icon: 'users-icon',
      iconName:"fa-solid fa-users"
      
    },
    {
      route: '/admin/courses',
      label: 'Courses',
      icon: 'courses-icon',
      iconName:"fa-solid fa-dumbbell"
    },
    {
      route: '/admin/tarif',
      label: 'Tarif',
      icon: 'dashboard-icon',
      iconName:'fa-solid fa-dollar-sign',
    },
  ];

  userEmail: string | null = null;
  isLoggedIn = true;

  constructor(private router: Router,public dialog: MatDialog,private _adminService : SubscriptionsService) { }
  notifications:any
  ngOnInit() {
    this._adminService.getNotifications().subscribe((r: any) => {
      // Filter unread notifications based on the 'isReadAdherent' field
      this.notifications = r.notifications.filter((notification: any) => !notification.isReadAdmin);
      console.log(this.notifications); // Only unread notifications will be in the array
    });
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
  logout() {
    sessionStorage.clear(); 
    this.router.navigate(['/']);
  }
  getNotificationText(notification: any): string {
    switch (notification.type) {
      case 'abonnement_expire':
        return `${notification.user.prenom} ${notification.user.nom}'s subscription has expired.`;;
      case 'new_session':
        return 'A new session has been added.';
      default:
        return 'You have a new notification.';
    }
  }
  updateToRead(id:any){
    this._adminService.updateNotificationStatus(id).subscribe((r: any)=>{
      console.log(r)
    })
  }
  

}
