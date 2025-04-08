import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import {ILocation} from '../../models/tour/tour';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  private map: Map;
  @Input() location: ILocation = {lat: 0, lng: 0};
  @ViewChild('map') mapDom: ElementRef;

  ngAfterViewInit(): void {
    this.map = new Map({
      target: this.mapDom.nativeElement,
      layers: [
        new TileLayer({ source: new OSM() })
      ],
      view: new View({
        center: olProj.fromLonLat([this.location.lng, this.location.lat]),
        zoom: 5
      })
    });
  }



  ngOnDestroy() {
    if (this.map) {
      this.map.setTarget(undefined);
    }
  }
}
