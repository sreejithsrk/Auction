import { Component, OnInit } from '@angular/core';
import { CanActivate,ActivatedRoute, Router } from '@angular/router';
import { UserService} from '../services/user.service';

@Component({
  selector: 'email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
  providers : [UserService]
})
export class EmailVerificationComponent implements OnInit {
  verif_id: number;
  private sub: any;

  constructor(private userService:UserService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userService.verifyUser(params.id).subscribe(data => {
        console.log(data);
        if(data.success){
         alert("Success, Redirecting ...");
         this.router.navigate(['/home']);
          console.log("successfull verified user");
        
        } else {
          alert("Error on verification");
          this.router.navigate(['/login']);
          console.log("error verified user")
        }
      });

   });
  }



}
