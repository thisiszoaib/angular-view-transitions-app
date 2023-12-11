import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  http = inject(HttpClient);
  videos = signal<any[]>([]);

  constructor() {
    this.fetchVideos();
  }

  fetchVideos() {
    // Add any playlist IDs you want to include in the list of videos
    const playlistIds = [''];
    const yourKey = ''; // Replace this with your google console key for accessing the youtube API
    let playListItemsUrl =
      'https://www.googleapis.com/youtube/v3/playlistItems?key=${yourKey}&part=snippet,contentDetails&maxResults=25';

    const combined = playlistIds.map((playlistId) =>
      this.http.get<any>(`${playListItemsUrl}&playlistId=${playlistId}`)
    );

    const videos: any[] = [];

    forkJoin(combined).subscribe((results) => {
      results.forEach((result) => {
        videos.push(...result.items);
      });

      this.videos.set(videos);
    });
  }
}
