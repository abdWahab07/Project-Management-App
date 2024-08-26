import { NgModule } from '@angular/core';
import { NgStyle } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TaskService1 } from './tasks/task-create/createTask.services';
import { BarChartModule } from '@swimlane/ngx-charts';
import { TaskService } from './services/task.service';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarService } from './services/navbar.service';
import { CommonModule } from '@angular/common';
import { listServices } from './services/list.service';
import { ProjectService } from './projects/project-create/project-create.services';
import { ProjectService1 } from './services/projects.service1';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthInterceptor } from './authentication/auth.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NgStyle,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BarChartModule,
    NgxChartsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],

  providers: [NavbarService, listServices, ProjectService, DatePipe, ProjectService1, TaskService1, NgbModule, TaskService,   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],

  bootstrap: [AppComponent],

})
export class AppModule { }
