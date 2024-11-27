import { Component } from '@angular/core';
import { CardFormComponent } from './card-form/card-form.component';
import { CardListComponent } from "./card-list/card-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CardListComponent,
    CardFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FRONTEND';
}
