import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { StickyHeaderDirective } from './directive/sticky-header.directive';


@NgModule({
  declarations: [
    AppComponent,
    StickyHeaderDirective    
  ],
  imports: [
    BrowserModule,
    UiModule,
    HttpClientModule,
    HttpModule  
  ],
  //providers: [GETSTATSService],
  bootstrap: [AppComponent]
})
export class AppModule { }
