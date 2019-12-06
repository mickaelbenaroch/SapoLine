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
import { BagsComponent } from './components/main-page/pages/bags/bags.component';
import { JacketsComponent } from './components/main-page/pages/jackets/jackets.component';
import { ItemsDisplayerComponent } from './components/items-displayer/items-displayer.component';
import { SingleItemComponent } from './components/single-item/single-item.component';

const appRoutes: Routes = [
  { path: '' , component: MainPageComponent},
  { path: 'shoes', component: ShoesComponent},
  { path: 'tops', component: TopsComponent},
  { path: 'bottoms', component: BottomsComponent},
  { path: 'accessories', component: AccessoriesComponent},
  { path: 'bags', component: BagsComponent},
  { path: 'jackets', component: JacketsComponent},
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
    BagsComponent,
    JacketsComponent,
    ItemsDisplayerComponent,
    SingleItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    HttpServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
