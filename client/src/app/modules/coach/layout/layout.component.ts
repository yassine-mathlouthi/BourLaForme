import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

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
      route: '/coach/myspace',
      label: 'Dashboard',
      icon: 'dashboard-icon', // Keeping this class for styling consistency
      iconName: 'fa-solid fa-house', // Changed to house icon for "home/dashboard"
    },
    {
      route: '/coach/Profile',
      label: 'My Profile', // Added "My" for personal touch
      icon: 'profile-icon', // Updated class to be more specific
      iconName: 'fa-solid fa-user', // Changed to user icon for profile
    },
    {
      route: '/coach/Planning',
      label: 'Client Management', // "Client" singular for clarity, capitalized "Management"
      icon: 'clients-icon', // Updated class to reflect clients
      iconName: 'fa-solid fa-user-group', // Changed to user-group for multiple clients
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


}
