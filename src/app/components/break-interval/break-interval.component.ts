import { AfterViewChecked, AfterViewInit, Component, ContentChild, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-break-interval',
  templateUrl: './break-interval.component.html',
  styleUrls: ['./break-interval.component.scss']
})
export class BreakIntervalComponent implements OnInit, AfterViewInit {
  expired: boolean = false;
  @ViewChild('breakSound') breakSound !: ElementRef

  constructor(){}

  checkExpiry = ($flag: boolean) => {
    this.expired = $flag;
    // console.log($flag);
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.breakSound.nativeElement.play();
  }
}
