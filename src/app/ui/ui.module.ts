import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
import { TabularComponent } from './tabular/tabular.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '.././pipes/filter.pipe';
import { Pipe, PipeTransform } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartComponent } from './chart/chart.component';
//import { AppRoutingModule } from '././../routes/app-routing.module';
import { GETSTATSService } from '././../service/getstats.service';
import { ExcelService } from '././../service/excel.service';
import { OrderModule } from 'ngx-order-pipe';
import { NavigationComponent } from './navigation/navigation.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,   
    ReactiveFormsModule,
    NgxPaginationModule, 
    //AppRoutingModule, 
    OrderModule,
    NgSelectModule
  ],
  providers: [GETSTATSService, ExcelService,FilterPipe],
  declarations: [LayoutComponent, HeaderComponent, FooterComponent,  FilterPipe,
    MapComponent, TabularComponent, SidebarComponent, ChartComponent, NavigationComponent],
    exports: [LayoutComponent]
})
export class UiModule { }
