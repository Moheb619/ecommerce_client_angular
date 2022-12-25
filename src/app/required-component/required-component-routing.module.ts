import { HomepageComponent } from './homepage/homepage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequiredComponentComponent } from './required-component.component';

const routes: Routes = [{ path: '', component: HomepageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequiredComponentRoutingModule {}
