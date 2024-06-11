import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {


  constructor() {}
  ngOnInit(): void {
   
  }

  onMouseEnter(event: MouseEvent) {
    (event.target as HTMLElement).style.borderColor = '#0dcaf0';
  }

  onMouseLeave(event: MouseEvent) {
    (event.target as HTMLElement).style.borderColor = 'transparent';
  }
}



