import { Component, Input, computed, inject, signal } from '@angular/core';
import { VideosService } from '../../services/videos.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-videos-dashboard',
  standalone: true,
  imports: [DatePipe, RouterModule],
  template: `
    <nav class=" bg-teal-600 p-4 text-white font-semibold text-lg">
      <div class="w-fit [view-transition-name:main-toolbar-text]">
        My Videos
      </div>
    </nav>
    <div class="bg-slate-200 min-h-screen px-10 pt-7">
      <div class="flex gap-8 justify-center items-center mb-7">
        <div class="py-2 px-7 rounded-full bg-white w-fit flex gap-5">
          @for(tag of tags; track tag) {
          <a routerLink="/tag/{{ tag }}/sort/{{ currentSort() }}">{{ tag }}</a>
          }
        </div>
        <div>
          <a
            class="bg-teal-600 py-2 px-7 rounded-full text-white"
            routerLink="/tag/{{ currentTag() }}/sort/{{
              currentSort() === 'asc' ? 'desc' : 'asc'
            }}"
            >Sort</a
          >
        </div>
      </div>

      <div class="grid grid-cols-3 gap-10">
        @for (video of videos(); track video) {
        <div
          class="rounded-2xl shadow-xl cursor-pointer bg-white"
          routerLink="/video/{{ video?.contentDetails?.videoId }}"
          [style.view-transition-name]="
            'video-' + video?.contentDetails?.videoId
          "
        >
          <img
            class="rounded-t-2xl object-cover w-[100%] h-[200px]"
            [src]="video?.snippet?.thumbnails?.standard?.url"
          />
          <div class="p-5">
            {{ video?.snippet?.publishedAt | date }}
          </div>
        </div>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class VideosDashboardComponent {
  currentTag = signal('All');
  @Input() set tag(val: string) {
    this.currentTag.set(val);
  }

  currentSort = signal('asc');
  @Input() set sort(val: string) {
    this.currentSort.set(val);
  }

  tags = ['All', 'Material', 'Chat', 'SignUp', 'Maps'];

  videosService = inject(VideosService);
  videos = computed(() => {
    if (this.currentTag() === 'All')
      return this.videosService
        .videos()
        .sort((a, b) =>
          this.currentSort() === 'asc'
            ? new Date(a.snippet?.publishedAt).getTime() -
              new Date(b.snippet?.publishedAt).getTime()
            : new Date(b.snippet?.publishedAt).getTime() -
              new Date(a.snippet?.publishedAt).getTime()
        );
    return this.videosService
      .videos()
      .filter((v) => v.snippet?.description?.includes(`#${this.currentTag()}`))
      .sort((a, b) =>
        this.currentSort() === 'asc'
          ? new Date(a.snippet?.publishedAt).getTime() -
            new Date(b.snippet?.publishedAt).getTime()
          : new Date(b.snippet?.publishedAt).getTime() -
            new Date(a.snippet?.publishedAt).getTime()
      );
  });
}
