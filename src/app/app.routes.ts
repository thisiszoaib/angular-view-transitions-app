import { Routes } from '@angular/router';
import { VideosDashboardComponent } from './pages/videos-dashboard/videos-dashboard.component';
import { VideoViewComponent } from './pages/video-view/video-view.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tag/All/sort/asc',
  },
  {
    path: 'tag/:tag/sort/:sort',
    component: VideosDashboardComponent,
  },
  {
    path: 'video/:id',
    component: VideoViewComponent,
  },
];
