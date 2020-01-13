import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MapsService} from './../maps.service';

@Component({
  selector: 'app-restaurant-maps',
  templateUrl: './restaurant-maps.component.html',
  styleUrls: ['./restaurant-maps.component.css']
})
export class RestaurantMapsComponent implements OnInit {
  lat: string= '';
  long: string= '';
  location: any;
  constructor(private service : MapsService, private elementRef: ElementRef) { }

  ngOnInit() {
    // this.service.getLocation().subscribe(
    //   (data)=>{
    //     this.lat = data.latitude;
    //     this.long = data.longitude;
    //     console.log(data);
    //   }
    // )

    this.location = this.elementRef.nativeElement.querySelector('#location');
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        //console.log(this.location);
        this.location.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
        //console.log(position);
        this.lat = position.coords.latitude.toString();//'11.0168';//
        this.long = position.coords.longitude.toString();// '76.9558';//
        // this.service.getLocation(this.lat, this.long).subscribe(
        //   (data)=>{
        //     console.log(data.address.country);
        //     this.location.innerHTML += "<br>Location: " + data.address.country;
        //   }
        // )
      });
    } else {
      //console.log(this.location);
      this.location.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
}
