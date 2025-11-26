// src/app/features/home/home.routes.ts
import { Routes } from '@angular/router';
import { LayoutKinchRanks } from './pages/layout-kinch-ranks/layout-kinch-ranks';
import { KinchRanksPage } from './pages/kinch-ranks-page/kinch-ranks-page';

export const KINCH_ROUTES: Routes = [
    {
        path: '',
        component: LayoutKinchRanks,
        children: [
            {
                path: '',
                title: 'Kinch Ranks | Cubing Peru',
                component: KinchRanksPage
            }
        ]
    },
    {
        path: '**', 
        redirectTo: ''
    }
];