import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/main-page/header/header.component';
import { FooterComponent } from './components/main-page/footer/footer.component';
import { HttpServiceService } from './services/http-service/http-service.service';
import { GaleryComponent } from './components/main-page/galery/galery.component';
import { MenuComponent } from './components/main-page/menu/menu.component';
import { ShoesComponent } from './components/main-page/pages/shoes/shoes.component';
import { AccessoriesComponent } from './components/main-page/pages/accessories/accessories.component';
import { BottomsComponent } from './components/main-page/pages/bottoms/bottoms.component';
import { TopsComponent } from './components/main-page/pages/tops/tops.component';
import { DressesComponent } from './components/main-page/pages/dresses/dresses.component';
import { JacketsComponent } from './components/main-page/pages/jackets/jackets.component';
import { ItemsDisplayerComponent } from './components/items-displayer/items-displayer.component';
import { SingleItemComponent } from './components/single-item/single-item.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/interceptor/http-interceptor.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemDetailComponent } from './components/item-detail/item-detail.component'
import { ItemServiceService } from './services/item-service/item-service.service';
import { MatDialogModule } from '@angular/material/dialog';
import { BuyModalComponent } from './components/modal/buy-modal/buy-modal/buy-modal.component';
import { FormsModule } from '@angular/forms';
import { TranslateServiceService } from './services/translate/translate-service.service';
import { CartComponent } from './components/cart/cart.component';
import { PaymentMethodsComponent } from './components/modal/payment-methods/payment-methods.component';

const appRoutes: Routes = [
  { path: '' , component: MainPageComponent},
  { path: 'shoes', component: ShoesComponent},
  { path: 'tops', component: TopsComponent},
  { path: 'bottoms', component: BottomsComponent},
  { path: 'accessories', component: AccessoriesComponent},
  { path: 'dresses', component: DressesComponent},
  { path: 'jackets', component: JacketsComponent},
  { path: 'itemDetail', component: ItemDetailComponent},
  { path: 'cart', component: CartComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    GaleryComponent,
    MenuComponent,
    ShoesComponent,
    AccessoriesComponent,
    BottomsComponent,
    TopsComponent,
    DressesComponent,
    JacketsComponent,
    ItemsDisplayerComponent,
    SingleItemComponent,
    ItemDetailComponent,
    BuyModalComponent,
    CartComponent,
    PaymentMethodsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    NgxUiLoaderModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [
    HttpServiceService,
    HttpClient,
    HttpInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    ItemServiceService,
    TranslateServiceService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    BuyModalComponent,
    PaymentMethodsComponent
  ]
})
export class AppModule { }
