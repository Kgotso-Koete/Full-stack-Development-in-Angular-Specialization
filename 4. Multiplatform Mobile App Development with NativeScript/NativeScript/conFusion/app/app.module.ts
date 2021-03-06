import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
// Additional modules
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
// Components
import { MenuComponent } from "./menu/menu.component";
import { DishdetailComponent } from "./dishdetail/dishdetail.component";
import { HomeComponent } from "./home/home.component";
import { ContactComponent } from "./contact/contact.component";
import { AboutComponent } from "./about/about.component";
// Shared services
import { DishService } from "./services/dish.service";
import { ProcessHTTPMsgService } from "./services/process-httpmsg.service";
import { baseURL } from "./shared/baseurl";
import { PromotionService } from "./services/promotion.service";
import { LeaderService } from "./services/leader.service";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptHttpModule,
    HttpClientModule,
    NativeScriptUISideDrawerModule
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent
  ],
  providers: [
    { provide: "baseURL", useValue: baseURL },
    DishService,
    ProcessHTTPMsgService,
    PromotionService,
    LeaderService
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
