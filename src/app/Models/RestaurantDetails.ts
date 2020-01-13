import {Restaurant} from './Restaurant'
export interface RestaurantDetails{
    __v: string;    ​​​​
    _id: string;
    address: string;
    ​​​​city: string;    ​​​​
    countryCode: Number;    ​​​​
    location: {
        coordinates: Number[],
        _id: string,
        type: string
    };
    locality: string;
    localityVerbose: string;
    coords: string;
    restaurantID: string;
    restaurantSpecifics: Restaurant
}