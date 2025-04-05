import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AdherentService } from '../../../core/services/adherent.service';

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
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
  pageTitle: string = 'Dashboard';

  navItems: NavItem[] = [
    {
      route: '/adherent/myspace',
      label: 'Dashboard',
      icon: 'dashboard-icon',
      iconName: 'fa-solid fa-chart-line', // Represents progress tracking
    },
    {
      route: '/adherent/course',
      label: 'Courses',
      icon: 'dumbbell-icon',
      iconName: 'fa-solid fa-dumbbell', // Represents fitness training
    },
    {
      route: '/adherent/MyCourse',
      label: 'My Courses',
      icon: 'clipboard-list-icon',
      iconName: 'fa-solid fa-clipboard-list', // Represents enrolled workout plans
    },
    {
      route: '/adherent/coaches',
      label: 'Coaches List',
      icon: 'user-coach-icon',
      iconName: 'fa-solid fa-user-tie', // Represents gym trainers
    },
    {
      route: '/adherent/Mycoaches',
      label: 'My Coaches',
      icon: 'user-coach-icon',
      iconName: 'fa-solid fa-user-tie', // Represents gym trainers
    },
    {
      route: '/adherent/IA-workout-generator',
      label: 'IA workout generator',
      icon: 'user-coach-icon',
      iconName: 'fas fa-robot', // Represents gym trainers
    },
    
];



  userEmail: string | null = null;
  isLoggedIn = true;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private _adherentService:AdherentService) { }
  notifications:any
  ngOnInit() {
    this._adherentService.getNotifications().subscribe((r: any) => {
      // Filter unread notifications based on the 'isReadAdherent' field
      this.notifications = r.notifications.filter((notification: any) => !notification.isReadAdherent);
      console.log(this.notifications); // Only unread notifications will be in the array
    });
    // Update page title based on current route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updatePageTitle();
      });
  }
  getNotificationText(type: string): string {
    switch (type) {
      case 'abonnement_expire':
        return 'Your subscription has expired.';
      case 'new_session':
        return 'A new session has been added.';
      default:
        return 'You have a new notification.';
    }
  }
  updateToRead(id:any){
    this._adherentService.updateNotificationStatus(id).subscribe(r=>{
      console.log(r)
    })
  }
  

  updatePageTitle() {
    const currentUrl = this.router.url;
    const routeTitle = this.navItems.find(
      (item) => currentUrl.startsWith(item.route)
    );

    this.pageTitle = routeTitle ? routeTitle.label : 'Admin Dashboard';
  }
  logout() {
    sessionStorage.clear(); 
    this.router.navigate(['/']);
  }
}

