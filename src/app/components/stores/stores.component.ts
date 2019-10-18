import { Component, OnInit } from '@angular/core';
import { ProvideStoresService } from '../../services/provide-stores.service';
import { Store } from 'src/app/models/store';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  favoriteStores: Store[];

  constructor(private provideStoresService: ProvideStoresService) { }

  ngOnInit() {
    this.favoriteStores = this.provideStoresService.setFavoriteStores();
  }

  isNotMyFavorite(store) {
    console.log('isNotMyFavorite() works');
    console.log('is not my favorite anymore: ', store);
    for (let i = (this.favoriteStores.length - 1); i >= 0; i--) {
      if (this.favoriteStores[i].Name === store) {
        this.favoriteStores.splice(i, 1);
      }
    }
    // elimina también la tienda del array del servicio porque this.favoriteStores y this.provideStoresService.favorites tienen la misma referencia
    console.log('this.favoriteStores: ', this.favoriteStores);
    console.log('this.provideStoresService.favorites', this.provideStoresService.favorites);
  }

}
