import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
        ]
    },
    {
        path: '',
        component: LandingLayoutComponent,
        children: [
            { path: 'welcome', component: WelcomeComponent },
        ]
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '**', component: ErrorComponent }
        ]
    }
];

