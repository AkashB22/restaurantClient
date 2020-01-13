import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
interface Location{
  latitude: string;
  longitude: string;
}
@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) { }
  private locarionUrl = 'https://ipapi.co/json';

  getLocation(lat, long){
    //return this.http.get<Location>('https://ipapi.co/json');
    return this.http.get<any>(`https://locationiq.org/v1/reverse.php?key=pk.8a23ee5195f07ceafb51daff408fd31f&lat=${lat}&lon=${long}&format=json`);
  }

}
