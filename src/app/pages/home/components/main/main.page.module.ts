import { NgModule } from '@angular/core';
import { MainComponent } from './main.page';
import { MainComponentRouting } from './main.page.routing';
@NgModule({
  declarations: [MainComponent],
  imports: [MainComponentRouting]
})
export class MainComponentModule {}
