import { environment } from '../../../environments/environment';
import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { ProvideStoresService } from '../../services/provide-stores.service';
import { Store } from 'src/app/models/store';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11'; // Map style to use
  lat = 37.75;
  lng = -122.41;

  constructor(
    private provideStoresService: ProvideStoresService,
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  ngOnInit() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map', // Container ID
      style: this.style,
      zoom: 13, // Starting zoom level
      center: [this.lng, this.lat] // Starting position [lng, lat]
    });
    this.map.addControl(new MapboxGeocoder({ // Search
      accessToken: mapboxgl.accessToken,
      mapboxgl,
      }));
    this.map.addControl(new mapboxgl.NavigationControl()); // Add zoom and rotation controls to the map.
    this.markerStores();

    // Este código fue utilizado para buscar las coordenadas para centrar el mapa
    // con el botón "ir a Ciudad de México"
    // this.map.on('click', (e) => {
    //   console.log('map.on: ', e);
    //   console.log('lngLat: ', e.lngLat);
    // });
  }

  goToMexicoCity() {
    this.map.fitBounds([[
      -99.13379765900974,
      19.58881802987723
      ], [
      -99.13379765900974,
      19.052188965899703
      ]]);
  }

  markerStores() {
    const stores = this.provideStoresService.getStores();
    console.log('stores: ', stores);

    for (let i = 0; i < stores.length; i++) {
      const el = this.renderer.createElement('div');
      el.className = 'marker';
      el.addEventListener('click', () => {
        console.log(stores[i].Name);
        const favorite: Store = {
          Name: stores[i].Name,
          Address: stores[i].Address,
          Coordinates: {
            lat: stores[i].Coordinates.lat,
            lng: stores[i].Coordinates.lng
          }
        };
        this.provideStoresService.saveFavoriteStore(favorite);
        console.log('this.provideStoresService.favorites: ', this.provideStoresService.favorites);
      });
      const marker = new mapboxgl.Marker(el) // initialize a new marker
      .setLngLat([stores[i].Coordinates.lng, stores[i].Coordinates.lat]) // Marker [lng, lat] coordinates
      .addTo(this.map); // Add the marker to the map
    }
  }
}
