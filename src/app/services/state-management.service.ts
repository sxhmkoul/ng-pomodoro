import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService implements OnInit{

  workModeDisabled = new Subject<boolean>();
  status: boolean = false;
  dirtyPage: boolean = false;

  constructor() { 
    this.workModeDisabled.subscribe((val)=>{
      this.status = val;
      console.log('subd', val);
    })
    console.log('inited service');
  }

  ngOnInit(): void {
      
  }

  
}
