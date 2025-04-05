import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CoachesService } from '../../../core/services/coaches.service';
import { EditProfileDialogueComponent } from '../edit-profile-dialogue/edit-profile-dialogue.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor(
    private _coachService : CoachesService,
    private dialog:MatDialog
    ){}
  data:any
  ngOnInit() {
    this._coachService.getProfileInfo().subscribe((r:any)=>{
      console.log(r)
      this.data=r.data
    })
    
  }
  editProfile(){
    console.log(11)
    const dialogRef = this.dialog.open(EditProfileDialogueComponent, {
      width: '500px' ,
      data:this.data
    });

    dialogRef.afterClosed().subscribe((result:any) => {
          
    });
  }
  

}
