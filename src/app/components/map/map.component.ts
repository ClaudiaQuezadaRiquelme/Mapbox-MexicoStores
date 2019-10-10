import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { ProvideStoresService } from '../../services/provide-stores.service';

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
    private provideStoresService: ProvideStoresService
  ) { }

  ngOnInit() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map', // Container ID
      style: this.style,
      zoom: 13, // Starting zoom level
      center: [this.lng, this.lat] // Starting position [lng, lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl()); // Add zoom and rotation controls to the map.

    this.map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl,
      }));

    // this.provideStoresService;
    this.markerStores();
  }

  markerStores() {
    const stores = this.provideStoresService.getStores();
    console.log('stores: ', stores);

    for (let i = 0; i < stores.length; i++) {
      console.log('store[', i , ']: ', stores[i]);
      console.log('store[', i , '].Coordinates.lat: ', stores[i].Coordinates.lat);
      console.log('store[', i , '].Coordinates.lng: ', stores[i].Coordinates.lng);
      const marker = new mapboxgl.Marker() // initialize a new marker
      .setLngLat([stores[i].Coordinates.lng, stores[i].Coordinates.lat]) // Marker [lng, lat] coordinates
      .addTo(this.map); // Add the marker to the map
    }
  }
}
