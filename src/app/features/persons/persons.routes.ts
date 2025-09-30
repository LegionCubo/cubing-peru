// src/app/features/home/home.routes.ts
import { Routes } from '@angular/router';
import { LayoutPersonsComponent } from './pages/layout-persons/layout-persons.component';
import { ListPersonsComponent } from './pages/list-persons/list-persons.component';
import { DelegatesPersonsComponent } from './pages/delegates-persons/delegates-persons.component';
import { OrganisersPersonsComponent } from './pages/organisers-persons/organisers-persons.component';

export const PERSONS_ROUTES: Routes = [
    {
        path: '',
        component: LayoutPersonsComponent,
        children: [
            {
                path: '',
                title: 'Competidores | Cubing Peru',
                component: ListPersonsComponent
            },
            {
                path: 'delegates',
                title: 'Delegados | Cubing Peru',
                component: DelegatesPersonsComponent
            },
            {
                path: 'organisers',
                title: 'Organizadores | Cubing Peru',
                component: OrganisersPersonsComponent
            },
        ]
    },
    {
        path: '**', 
        redirectTo: ''
    }
];