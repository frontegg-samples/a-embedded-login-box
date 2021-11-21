import { Component, OnInit, OnDestroy } from '@angular/core';
import { FronteggAuthService, FronteggAppService } from '@frontegg/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = true;
  loadingSubscription: Subscription;
  user?: any;

  constructor(private fronteggAuthService: FronteggAuthService, private fronteggAppService: FronteggAppService) {
    this.loadingSubscription = fronteggAppService.isLoading$.subscribe((isLoading) => this.isLoading = isLoading)
  }

  ngOnInit(): void {
    this.fronteggAuthService?.user$.subscribe((user) => {
      this.user = user
    })
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe()
  }

  onShowAccessToken(): void {
    alert(this.user?.accessToken);
  }

  onLogout(): void {
    window.location.href = "/account/logout";
  }
}
