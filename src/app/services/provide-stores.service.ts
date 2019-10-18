import { Injectable } from '@angular/core';
import JsonStores from '../../assets/store_directory.json';
import { Store } from '../models/store.js';

@Injectable({
  providedIn: 'root'
})
export class ProvideStoresService {

  favorites: Store[] = [];

  constructor() {
    console.log('Reading local json files');
    console.log(JsonStores);
    // tslint:disable-next-line: prefer-for-of
    // for (let i = 0; i < JsonStores.length; i++) {
    // }
   }

   getStores() {
    return JsonStores;
   }

   setFavoriteStores() {
    return this.favorites;
   }
}
