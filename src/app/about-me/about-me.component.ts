import { Component } from '@angular/core';
import { ScrollService } from '../services/scroll.service';


@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {


  locationIconPath = 'assets/icons/location.svg';
  remoteIconPath = 'assets/icons/Icon Remote.svg';
  relocateIconPath = 'assets/icons/iconRelocate.svg'

  constructor(private scrollService: ScrollService){

  }

  onScrollToContact(){
    this.scrollService.triggerScrollContact();
  }

  locationOnHover(isHovered: boolean){
    this.locationIconPath = isHovered ? 'assets/icons/locationHover.svg' : 'assets/icons/location.svg';
  }

  remoteOnHover(isHovered: boolean){
    this.remoteIconPath = isHovered ? 'assets/icons/IconRemoteHover.svg' : 'assets/icons/Icon Remote.svg';
  }

  relocateOnHover(isHovered: boolean){
    this.relocateIconPath = isHovered ? 'assets/icons/iconRelocateHover.svg' : 'assets/icons/iconRelocate.svg';
  }




}
