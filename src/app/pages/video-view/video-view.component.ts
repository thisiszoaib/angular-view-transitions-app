import { Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { YoutubeService } from '../../services/youtube.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-video-view',
  standalone: true,
  imports: [RouterModule, YouTubePlayerModule],
  template: `
    <div class="bg-black">
      <nav class=" bg-teal-800 p-4 text-white font-semibold text-lg flex gap-3">
        <button (click)="location.back()" class="material-icons">
          arrow_back
        </button>
        <div class="w-fit [view-transition-name:main-toolbar-text]">
          My Videos
        </div>
      </nav>

      <div class="p-10 min-h-screen">
        @if(apiLoaded()) {
        <youtube-player
          [style.view-transition-name]="'video-' + id"
          class="w-[900px] block m-auto"
          [width]="900"
          [height]="500"
          [videoId]="id"
        />
        }
      </div>
    </div>
  `,
  styles: `
  `,
})
export class VideoViewComponent {
  apiLoaded = inject(YoutubeService).apiLoaded;
  location = inject(Location);

  @Input()
  id!: string;
}
