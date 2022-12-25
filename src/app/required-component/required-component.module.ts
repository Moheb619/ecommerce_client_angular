import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequiredComponentRoutingModule } from './required-component-routing.module';
import { RequiredComponentComponent } from './required-component.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [RequiredComponentComponent, FooterComponent, HomepageComponent],
  imports: [CommonModule, RequiredComponentRoutingModule],
  exports: [FooterComponent],
})
export class RequiredComponentModule {}
