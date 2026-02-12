import { Routes } from '@angular/router';
import { authenticatedGuard } from './core/guards/authenticated.guard';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { NavComponent } from './components/layouts/nav/nav.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login', 
        pathMatch: 'full',
    },

    {
        path: 'login',
        loadComponent: () =>
            import('./components/auth/login/login.component').then(
                (m) => m.LoginComponent
            ),
        canActivate: [authenticatedGuard],
    },

    {
        path: '',
        component: NavComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                title: 'Dashboard',
                loadComponent: () =>
                    import('./components/dashboard/dashboard.component').then(
                        (m) => m.DashboardComponent
                    ),
                canActivate: [roleGuard],
                data: { roles: ['ADMIN_ACCESS'] },
            },
            {
                path: 'gastos',
                title: 'Gastos',
                loadComponent: () =>
                    import('./components/gastos/gastos.component').then(
                        (m) => m.GastosComponent
                    ),
                canActivate: [roleGuard],
                data: { roles: ['ADMIN_ACCESS'] },
            }
        ]
    },

    {
        path: '**',
        redirectTo: 'login',
    },
];
