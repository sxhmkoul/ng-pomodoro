import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {

  constructor() { }

  workModeDisabled: boolean = false;
}
