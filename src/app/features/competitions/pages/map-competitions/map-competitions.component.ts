import { ChangeDetectionStrategy, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../../../environments/environment';
import { MarkersMapCompetitionsComponent } from "../../components/markers-map-competitions/markers-map-competitions.component";
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

mapboxgl.accessToken = environment.mapboxKey;

interface Marker{
  lat:number,
  lng:number
}

@Component({
  selector: 'app-map-competitions',
  imports: [MarkersMapCompetitionsComponent, MatIcon, MatButtonModule],
  templateUrl: './map-competitions.component.html',
  styleUrl: './map-competitions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapCompetitionsComponent { 
  divElement = viewChild<ElementRef>('map');

  menuCompetitions = signal<boolean>(false);
  
  map = signal<mapboxgl.Map | null>(null);
  coordinates = signal({
    lng: -75.44388653970637,
    lat: -8.579882038543204,
  })

  zoom = signal<number>(5.5);
  markers = signal<Marker[]>([])

  // Array para guardar los marcadores creados
  private markersList: mapboxgl.Marker[] = [];

  constructor(){
    effect(()=>{
      if(!this.map()) return;
      
      const map = this.map()!;
      
      this.markers().forEach(c => {
        const mapboxMarker = new mapboxgl.Marker({
          color: "#FF0000"
        }).setLngLat(c).addTo(map);

        this.markersList.push(mapboxMarker);
      });

    })
  }

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

    this.map.set(map);
  }

  //Marcar Competiciones
  markersCompetitions($event: Marker[]){
    this.clearMarkers();
    this.markers.set($event);

    if(!this.map()) return;

    this.map()?.flyTo({
      center: this.coordinates(),
      zoom: this.zoom()
    })
  }

  //Limpiar Marcaciones
  clearMarkers() {
    this.markers.set([])
    this.markersList.forEach(m => m.remove()); // los quita del mapa
    this.markersList = []; // limpia el array
  }

  //Ubicar Marcador
  flyToMarker($event:Marker){
    if(!this.map()) return;

    this.map()?.flyTo({
      center: $event,
      zoom: 12
    })

  }

  onClickBtnMenu(){
    this.menuCompetitions.set(!this.menuCompetitions())
  }
}
