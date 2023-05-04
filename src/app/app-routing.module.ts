import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [

{ path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
{ path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
{ path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)},
{ path: 'artist/:artistId', loadChildren: () => import('./pages/home/single-tattoo-artist/single-tattoo-artist.module').then(m => m.SingleTattooArtistModule) },
{ path: '', redirectTo: '/home', pathMatch: 'full' },

{ path: 'edit/:userId', loadChildren: () => import('./pages/edit/edit.module').then(m => m.EditModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
