import {AfterContentInit, AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import {ILocation} from '../../models/tour/tour';
import * as olProj from 'ol/proj';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  standalone: true,
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit{
    map: Map;
    @Input() tourLocation: ILocation;
    @ViewChild('map') mapDom: ElementRef;

    ngAfterViewInit(): void {
      console.log([this.tourLocation.lng, this.tourLocation.lat]);
      this.map = new Map({
        target: this.mapDom.nativeElement,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: olProj.fromLonLat([this.tourLocation.lng, this.tourLocation.lat]),
          zoom: 5,
        }),
      });
    }
}
