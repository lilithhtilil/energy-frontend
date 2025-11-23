import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { provideHttpClient } from "@angular/common/http";
import { DailyMixComponent } from './daily-mix/daily-mix.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    DailyMixComponent
  ],
  imports: [
    BrowserModule,
    NgxChartsModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
