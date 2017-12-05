import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { UserService} from '../services/user.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-runningauction',
  templateUrl: './runningauction.component.html',
  styleUrls: ['./runningauction.component.css']
})
export class RunningauctionComponent implements OnInit {
  user : any;
  users : object;
  products: object;
  winnerId : object;
  involvedUsers : any = [];

  constructor(
    private productService: ProductService,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.userService.getLoggedUSerDetails().subscribe(data=>{
        this.user = data;
        console.log(this.user._id);
    });
    this.userService.getAllUsersById().subscribe(data=>{
        this.users = data;
    });
    this.productService.getAllrunningProduct().subscribe(data=>{
       data.forEach((item, index) => {
         var lastBidprice = item.bid_amount;
         var lastBiduser = '';
         var lastBidTime = '';
         var lastBiduserId = '';
 
         item.bidders.forEach((user, i) => {
           if(user.amount >= lastBidprice){
              lastBidprice = user.amount;
              lastBiduser = this.users[user.user_id].name;
              lastBiduserId = this.users[user.user_id]._id;
              lastBidTime = user.date_time;
           }
         });
         data[index].lastBidprice = lastBidprice;
         data[index].lastBiduser = lastBiduser;
         data[index].lastBidTime = lastBidTime;
         data[index].lastBiduserId = lastBiduserId;
         data[index].mybid = (lastBiduserId == this.user._id) ? true:false ;
       });
       this.products = data;
     });
  }

}
