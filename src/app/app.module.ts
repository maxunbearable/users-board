import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { UserService } from './services/users-api.service';
import { UsersPageComponent } from './components/users-page.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, UsersPageComponent],
  providers: [HttpClient, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
