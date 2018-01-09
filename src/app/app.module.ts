import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { 
  MatButtonModule, 
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatOptionModule
} from '@angular/material';

import { DataAPIService } from './data-api.service'
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CardsComponent } from './components/cards/cards.component';
import { HostDialogComponent, HostDialog } from './dialogs/host-dialog/host-dialog.component';
import { 
  DetailsDialog, 
  JoinDialog, 
  LeaveDialog, 
  MembersDialog } from './components/cards/cards.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    SearchBarComponent,
    CardsComponent,
    HostDialogComponent,
    HostDialog,
    JoinDialog,
    DetailsDialog,
    LeaveDialog,
    MembersDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule
  ],
  entryComponents: [
    HostDialog,
    JoinDialog,
    DetailsDialog,
    LeaveDialog,
    MembersDialog
  ],
  providers: [DataAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
