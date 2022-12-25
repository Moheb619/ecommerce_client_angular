import { CartService } from './../../shared/services/cart.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.checkout();
  }

  checkout() {
    this.subscription.push(
      this.cartService.deleteAllCartItem().subscribe((d) => {})
    );
  }
  ngOnDestroy() {
    this.subscription.forEach((f) => f.unsubscribe());
  }
}
