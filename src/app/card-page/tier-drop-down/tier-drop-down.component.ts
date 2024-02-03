import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-tier-drop-down',
  templateUrl: './tier-drop-down.component.html',
  styleUrls: ['./tier-drop-down.component.css']
})
export class TierDropDownComponent {
  isOpen = false ;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    
  }


}
