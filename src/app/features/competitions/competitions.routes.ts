// src/app/features/home/home.routes.ts
import { Routes } from '@angular/router';
import { ListCompetitionsComponent } from './pages/list-competitions/list-competitions.component';
import { MapCompetitionsComponent } from './pages/map-competitions/map-competitions.component';
import { LayoutCompetitionsComponent } from './pages/layout-competitions/layout-competitions.component';

export const COMPETITIONS_ROUTES: Routes = [
    {
        path: '',
        component: LayoutCompetitionsComponent,
        children: [
            {
                path: 'list',
                title: 'Competencias | Cubing Peru',
                component: ListCompetitionsComponent
            },
            {
                path: 'map',
                title: 'Mapa Competencias | Cubing Peru',
                component: MapCompetitionsComponent
            },
        ]
    },
    {
        path: '**', 
        redirectTo: 'list'
    }
];