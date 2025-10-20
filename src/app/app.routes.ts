import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      title: 'Cubing Peru',
      loadChildren: () =>
        import('./features/home/home.routes').then(m => m.HOME_ROUTES)
    },
    {
      path: 'competitions',
      loadChildren: () =>
        import('./features/competitions/competitions.routes').then(m => m.COMPETITIONS_ROUTES)
    },
    {
      path: 'persons',
      loadChildren: () =>
        import('./features/persons/persons.routes').then(m => m.PERSONS_ROUTES)
    },
    {
      path: 'rankings',
      loadChildren: () =>
        import('./features/rankings/rankings.routes').then(m => m.RANKINGS_ROUTES)
    },
    {
      path: 'sor',
      loadChildren: () =>
        import('./features/sum-of-ranks/sum-of-ranks.routes').then(m => m.SOR_ROUTES)
    },
    {
      path: 'records',
      loadChildren: () =>
        import('./features/records/records.routes').then(m => m.RECORDS_ROUTES)
    },
    {
      path:'**',
      redirectTo:''
    }
];
