import { ChangeDetectionStrategy, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-map-competitions',
  imports: [],
  templateUrl: './map-competitions.component.html',
  styleUrl: './map-competitions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapCompetitionsComponent { 
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  coordinates = signal({
    lng: -75.44388653970637,
    lat: -8.579882038543204,
  })
  zoom = signal<number>(5.5);

  zoomEfect = effect(() => {
    if(!this.map()) return;

    this.map()!.setZoom(this.zoom());
  })

  async ngAfterViewInit() {
    if(!this.divElement()?.nativeElement) return;

    const element = this.divElement()!.nativeElement;
    const { lng, lat } = this.coordinates();
    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
    });

    this.mapListeners(map)
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    });

    map.on('moveend', ()=>{
      const center = map.getCenter();
      this.coordinates.set(center);
    })

    this.map.set(map);
  }
}
