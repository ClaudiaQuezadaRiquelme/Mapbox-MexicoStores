import { Injectable } from '@angular/core';
import JsonStores from '../../assets/store_directory.json';

@Injectable({
  providedIn: 'root'
})
export class ProvideStoresService {

  constructor() {
    console.log('Reading local json files');
    console.log(JsonStores);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < JsonStores.length; i++) {
      console.log(JsonStores[i]);
      console.log('lat: ', JsonStores[i].Coordinates.lat);
      console.log('lng: ', JsonStores[i].Coordinates.lng);
    }
   }

   getStores() {
    return JsonStores;
   }
}
