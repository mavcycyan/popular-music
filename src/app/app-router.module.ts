import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FrontPageComponent} from './front-page/front-page.component';
import {AlbumsPageComponent} from './albums-page/albums-page.component';

const routes: Routes = [
    {path: '', component: FrontPageComponent},
    {path: 'albums/:genre', component: AlbumsPageComponent},
    {path: 'albums', redirectTo: 'albums/rock'},
    {path: '**', redirectTo: ''},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})


export class AppRouterModule {}
