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

   detectDuplicateStore(store: string) { // detecta si agregaste una tienda que ya estaba en la lista y la elimina
     let count = 0;
     for (let i = this.favorites.length - 1; i >= 0; i--) {
       if (this.favorites[i].Name === store) {
         count++;
       }
       if (count > 1) {
         console.log('detectDuplicateStore() is donne');
         alert('Ya agregaste esa tienda a tus favoritas.');
         this.favorites.splice((this.favorites.length - 1), 1); // elimina la duplicada que querías agregar
         count--;
       }
    }
   }

   saveFavoriteStore(store: Store) {
    this.favorites.push(store);
    this.detectDuplicateStore(store.Name);
   }
}
