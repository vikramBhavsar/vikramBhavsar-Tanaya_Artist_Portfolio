import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PrjRantsComponent } from './prj-rants/prj-rants.component';
import { TextFormatterComponent } from './text-formatter/text-formatter.component';
import { MainAppComponent } from './main-app/main-app.component';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    PrjRantsComponent,
    TextFormatterComponent,
    MainAppComponent,
    MarkdownPipe,
    SafeUrlPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
