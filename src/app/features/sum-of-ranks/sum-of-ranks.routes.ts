// src/app/features/home/home.routes.ts
import { Routes } from '@angular/router';
import { LayoutSumOfRanksComponent } from './pages/layout-sum-of-ranks/layout-sum-of-ranks.component';
import { SorSumOfRanksComponent } from './pages/sor-sum-of-ranks/sor-sum-of-ranks.component';

export const SOR_ROUTES: Routes = [
    {
        path: '',
        component: LayoutSumOfRanksComponent,
        children: [
            {
                path: ':modality',
                title: 'Sum Of Ranks | Cubing Peru',
                component: SorSumOfRanksComponent
            }
        ]
    },
    {
        path: '**', 
        redirectTo: 'sor/single'
    }
];