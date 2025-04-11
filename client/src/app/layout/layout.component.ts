import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {AsideComponent} from './side/aside.component';
import {ActivatedRoute, ActivatedRouteSnapshot, ActivationEnd, Router, RouterModule} from '@angular/router';
import {filter, map, Subscription} from 'rxjs';
import {LoaderComponent} from '../common/loader/loader.component';
import {LoaderService} from '../services/loader.service';
import {load} from 'ol/Image';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    LoaderComponent,
    AsyncPipe
  ],
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, OnDestroy{
  loader$ = inject(LoaderService).loader$;
  showAside: boolean = false;
  subscription: Subscription;
  loaderStatusLayout: boolean;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.showAside = this.recursFindChildData(this.activatedRoute.snapshot, 'showAside');

    this.subscription = this.router.events
      .pipe(
        filter((routes) => routes instanceof ActivationEnd),
        map((data) => data.snapshot)
      )
      .subscribe((data) => {
        this.showAside = this.recursFindChildData(data, 'showAside');
      });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  recursFindChildData(children: ActivatedRouteSnapshot, prop:string): boolean{
    if(!children.data[prop] && children.firstChild){
        return this.recursFindChildData(children.firstChild, prop);
      } else{
        return  !!children.data[prop];
      }
    }

  protected readonly load = load;
}
