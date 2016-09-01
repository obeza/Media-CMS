import { Component, OnInit, Input } from '@angular/core';
import * as YouTubePlayer from 'youtube-player';

@Component({
  selector: 'comp-lecteurvideo',
  templateUrl: 'lecteurvideo.component.html',
  styleUrls: ['lecteurvideo.component.css']
  
})
export class LecteurvideoComponent implements OnInit {

  @Input() videoId: String;

  constructor(
  ) { }

  ngOnInit() {
    this.playYT();
  }

  playYT(){
    let player = YouTubePlayer('playerid', { height:"100%", width:"100%"});
        player.loadVideoById(this.videoId);
        player.playVideo();  
  }


}
