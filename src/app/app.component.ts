import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { initFlowbite } from 'flowbite';
import { HomeComponent } from "./components/home/home.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'e-store';

  ngOnInit(): void {
    initFlowbite();
  }
}
