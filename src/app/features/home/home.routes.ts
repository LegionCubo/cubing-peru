// src/app/features/home/home.routes.ts
import { Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: '', component: MainPageComponent }
    ]
  }
];