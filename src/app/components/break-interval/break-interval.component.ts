import { Component } from '@angular/core';

@Component({
  selector: 'app-break-interval',
  templateUrl: './break-interval.component.html',
  styleUrls: ['./break-interval.component.scss']
})
export class BreakIntervalComponent {
  expired: boolean = false;
  
  constructor(){}

  checkExpiry = ($flag: boolean) => {
    this.expired = $flag;
    // console.log($flag);
  }
}
