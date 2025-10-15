// src/app/features/home/home.routes.ts
import { Routes } from '@angular/router';
import { LayoutRankingsComponent } from './pages/layout-rankings/layout-rankings.component';
import { ForPersonsRankingsComponent } from './pages/for-persons-rankings/for-persons-rankings.component';

export const RANKINGS_ROUTES: Routes = [
    {
        path: '',
        component: LayoutRankingsComponent,
        children: [
            {
                path: ':event/:modality',
                title: 'Rankings | Cubing Peru',
                component: ForPersonsRankingsComponent
            }
        ]
    },
    {
        path: '**', 
        redirectTo: '333/single'
    }
];