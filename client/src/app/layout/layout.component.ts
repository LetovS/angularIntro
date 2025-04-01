import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {AsideComponent} from './side/aside.component';
import {ActivatedRoute, ActivatedRouteSnapshot, ActivationEnd, Router, RouterModule} from '@angular/router';
import {filter, map, Subscription} from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    AsideComponent],
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, OnDestroy{

  showAside: boolean = false;
  subscription: Subscription;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

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
  console.log('children', children)
  if(!children.data[prop] && children.firstChild){
      return this.recursFindChildData(children.firstChild, prop);
    } else{
      return  !!children.data[prop];
    }
  }
}
