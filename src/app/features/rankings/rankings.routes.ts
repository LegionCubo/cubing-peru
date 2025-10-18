// src/app/features/home/home.routes.ts
import { Routes } from '@angular/router';
import { LayoutRankingsComponent } from './pages/layout-rankings/layout-rankings.component';
import { ForPersonsRankingsComponent } from './pages/for-persons-rankings/for-persons-rankings.component';
import { ForResultsRankingsComponent } from './pages/for-results-rankings/for-results-rankings.component';

export const RANKINGS_ROUTES: Routes = [
    {
        path: '',
        component: LayoutRankingsComponent,
        children: [
            {
                path: ':event/:modality',
                title: 'Rankings | Cubing Peru',
                component: ForPersonsRankingsComponent
            },
            {
                path: ':event/:modality/historico',
                title: 'Rankings Historico | Cubing Peru',
                component: ForResultsRankingsComponent
            }
        ]
    },
    {
        path: '**', 
        redirectTo: '333/single'
    }
];