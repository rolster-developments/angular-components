import { registerLocaleData } from '@angular/common';
import localeCo from '@angular/common/locales/es-CO';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRouting } from './app.component.routing';

registerLocaleData(localeCo);

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule, AppRouting],
  providers: [{ provide: LOCALE_ID, useValue: 'es-CO' }]
})
export class AppModule {}
