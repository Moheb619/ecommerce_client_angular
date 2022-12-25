import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequiredComponentRoutingModule } from './required-component-routing.module';
import { RequiredComponentComponent } from './required-component.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [RequiredComponentComponent, FooterComponent],
  imports: [CommonModule, RequiredComponentRoutingModule],
  exports: [FooterComponent],
})
export class RequiredComponentModule {}
