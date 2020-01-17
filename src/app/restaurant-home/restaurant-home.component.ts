import { Component, OnInit,PipeTransform, Directive, EventEmitter, Input, Output, QueryList, ViewChildren, ElementRef, ViewChild  } from '@angular/core';
import {RestaurantServiceService} from './../restaurant-service.service';
import {UserService} from './../user.service';
import {RestaurantDetails} from './../Models/RestaurantDetails';
import {Subscription, Observable, Subject, of, pipe} from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}


@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.css'],
  providers: [DecimalPipe]
})


export class RestaurantHomeComponent implements OnInit {
  restaurants: RestaurantDetails[] = [];
  constructor(private service : RestaurantServiceService, private decimalPipe: DecimalPipe, private userService: UserService) { }
  private serviceRestSub:Subscription;
  page: number = 1;
  pageSize: number = 20;
  detailsLength: number;
  restaurants$: Observable<RestaurantDetails[]>;
  filter = new FormControl('');
  cuisine : string[];
  validUser: Boolean = false;
  lat: string;
  long: string;
  location: string
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  @ViewChild("myDiv", {static: false}) divView: ElementRef;

  ngOnInit() {
    this.service.getRestaurants();
    this.validUser = this.userService.isLoggin();
    if(this.validUser){
      this.getLocation();
    } else{
      this.serviceRestSub = this.service.getRestaurantsUpdatedListener().subscribe(
        (restaurants : RestaurantDetails[])=>{
          //console.log(restaurants);
          this.restaurants = restaurants;
          this.restaurants$ = of(this.restaurants);
          this.detailsLength = this.restaurants.length;
          let temp =[];
          this.restaurants.forEach(restaurant=>{
            let cuisines = restaurant.restaurantSpecifics.cuisine.replace(/"/g, '').split(',');
            if(cuisines.length<0){
              if(!(temp.indexOf(restaurant.restaurantSpecifics.cuisine.trim()) > -1)){
                temp.push(restaurant.restaurantSpecifics.cuisine.trim())
              }
            } else{
              for(let cuisine of cuisines){
                if(!(temp.indexOf(cuisine.trim()) > -1)){
                  temp.push(cuisine.trim())
                }
              }
            }
            
          })
          //console.log(temp);
          this.cuisine = temp.slice(0, 10);
        },
        (err)=> console.log(err)
      )
    }
  }

    ngOnDestroy(){
      this.serviceRestSub.unsubscribe();
    }

    search(text: any){
      let tempArr = []
      tempArr =  this.restaurants.filter(restaurant => {
        const term = text.target.value.toLowerCase();
        //console.log(term);
        return restaurant.restaurantSpecifics.restaurantName.toLowerCase().includes(term)
      });
      //console.log(tempArr);
      this.restaurants$ = of(tempArr);
      this.detailsLength = tempArr.length;
    }

    onFilter(text){
      let tempArr = []
      tempArr =  this.restaurants.filter(restaurant => {
        const term = text.target.innerHTML.toLowerCase();
        //console.log(term);
        return restaurant.restaurantSpecifics.cuisine.toLowerCase().includes(term)
      });
      //console.log(tempArr);
      this.restaurants$ = of(tempArr);
      this.detailsLength = tempArr.length;
      this.divView.nativeElement.innerHTML = text.target.innerHTML
    }

    onSort({column, direction}: SortEvent) {

    // resetting other headers
    console.log('called Onsort');
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '') {
      this.restaurants$ = of(this.restaurants);
    } else {
      let tempArr = [...this.restaurants].sort((a, b) => {
        //console.log(a[column]);
        const res = compare(a['restaurantSpecifics'][column], b['restaurantSpecifics'][column]);
        return direction === 'asc' ? res : -res;
      })
      //console.log(tempArr);
      this.restaurants$ = of(tempArr);
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        //console.log(this.location);
        this.location = "Latitude: " + position.coords.latitude +
        "Longitude: " + position.coords.longitude;
        //console.log(position);
        this.long = '121.057508';//position.coords.latitude.toString();//'11.0168';//
        this.lat = '14.58445';//position.coords.longitude.toString();// '76.9558';//

        //to send our lat and long to our server and get a location based details
        this.service.getLocationBasedDetails(this.long, this.lat).subscribe(
          (data: RestaurantDetails[])=>{
            this.restaurants$ = of(data);
            this.restaurants = data;
            this.detailsLength = this.restaurants.length;
            let temp =[];
            this.restaurants.forEach(restaurant=>{
              let cuisines = restaurant.restaurantSpecifics.cuisine.split(',');
              if(cuisines.length<0){
                if(!(temp.indexOf(restaurant.restaurantSpecifics.cuisine.trim()) > -1)){
                  temp.push(restaurant.restaurantSpecifics.cuisine.trim())
                }
              } else{
                for(let cuisine of cuisines){
                  if(!(temp.indexOf(cuisine.trim()) > -1)){
                    temp.push(cuisine.trim())
                  }
                }
              }
              
            })
            //console.log(temp);
            this.cuisine = temp.slice(0, 10);
          }
        )
        // this.service.getLocation(this.lat, this.long).subscribe(
        //   (data)=>{
        //     console.log(data.address.country);
        //     this.location.innerHTML += "<br>Location: " + data.address.country;
        //   }
        // )
      });
    } else {
      //console.log(this.location);
      this.location = "Geolocation is not supported by this browser.";
    }
  }
}
