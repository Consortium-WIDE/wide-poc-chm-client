import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ProcessWideResponseComponent } from './pages/process-wide-response/process-wide-response.component';
import { LoginComponent } from './pages/login/login.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { ClaimPoapComponent } from './pages/claim-poap/claim-poap.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ProcessProfileComponent } from './pages/process-profile/process-profile.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'process', component: ProcessWideResponseComponent },
            { path: 'login', component: LoginComponent },
            { path: 'leaderboard', component: LeaderboardComponent },
            { path: 'claimpoap', component: ClaimPoapComponent },
            { path: 'profile', component: EditProfileComponent },
            { path: 'processProfile/:operationType', component: ProcessProfileComponent },
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

