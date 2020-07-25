import { Component, OnInit } from '@angular/core';

interface Track {
  name: string;
  artist: string;
  duration: number; // In milliseconds
  isPlaying: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isPlaying = false;
  tracks: Track[];
  playingTrack: Track;
  playedTime = 0;
  interval: any; // for simulating playing audio..

  constructor() { }

  ngOnInit() {
    this.tracks = [
      {
        name: 'My Everything',
        artist: 'Ali Kiba',
        duration: 175000,
        isPlaying: true
      },
      {
        name: 'Someone lived This',
        artist: 'John Doe',
        duration: 194000,
        isPlaying: false
      },
      {
        name: 'Summer Wind',
        artist: 'Yami Yami',
        duration: 207000,
        isPlaying: false
      },
      {
        name: 'Orphanage',
        artist: 'Hamisa',
        duration: 246000,
        isPlaying: false
      },
      {
        name: 'From the sun',
        artist: 'Makame Faki',
        duration: 257000,
        isPlaying: false
      },
      {
        name: 'Hell The World',
        artist: 'Michael Jackson',
        duration: 288000,
        isPlaying: false
      }
    ];

    this.playingTrack = this.tracks[0];
  }

  play() {
    this.isPlaying = true;
    this.interval = setInterval(() => {
      this.playedTime += 1000;

      if (this.playedTime === this.playingTrack.duration) {
        this.stop();
      }
    }, 1000);
  }

  stopCurrentPlayingTrack(): number {
    const playingTrackIndex = this.tracks.findIndex(playingTrack => playingTrack.isPlaying);
    this.tracks[playingTrackIndex].isPlaying = false;
    this.stop(); // stop current playing audio

    return playingTrackIndex;
  }

  next() {
    const playingTrackIndex = this.stopCurrentPlayingTrack();
    const nextTrackIndex = playingTrackIndex < this.tracks.length - 1 ? playingTrackIndex + 1 : 0;
    this.setNexOrPreviousPlayingTrack(nextTrackIndex);
  }

  previous() {
    const playingTrackIndex = this.stopCurrentPlayingTrack();
    const nextTrackIndex = playingTrackIndex > 0 ? playingTrackIndex - 1 : this.tracks.length - 1;
    this.setNexOrPreviousPlayingTrack(nextTrackIndex);
  }

  setNexOrPreviousPlayingTrack(index: number) {
    this.playingTrack = this.tracks[index];
    this.tracks[index].isPlaying = true;
    this.play();
  }

  selectTrackFromList(selectedTrack: Track, index: number) {
    this.stopCurrentPlayingTrack();
    this.tracks[index].isPlaying = true;
    this.playingTrack = selectedTrack;
    this.play();
  }

  pause() {
    this.isPlaying = false;
    clearInterval(this.interval);
  }

  stop() {
    this.pause();
    this.playedTime = 0;
  }
}
