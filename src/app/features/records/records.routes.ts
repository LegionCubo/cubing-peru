// src/app/features/home/home.routes.ts
import { Routes } from '@angular/router';
import { LayoutRecordsComponent } from './pages/layout-records/layout-records.component';
import { PageRecordsComponent } from './pages/page-records/page-records.component';

export const RECORDS_ROUTES: Routes = [
    {
        path: '',
        component: LayoutRecordsComponent,
        children: [
            {
                path: '',
                title: 'Récords | Cubing Peru',
                component: PageRecordsComponent
            }
        ]
    },
    {
        path: '**', 
        redirectTo: ''
    }
];