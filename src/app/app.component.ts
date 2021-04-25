import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CallService } from './call.service';
import { SignalingService } from './signaling.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  @ViewChild('remoteVideo') remoteVideo: ElementRef;

  constructor(
    private callService: CallService,
    private signalingService: SignalingService
  ) {}

  ngOnInit(): void {
    this.signalingService
      .getMessages()
      .subscribe((payload) => this._handleMessage(payload));
  }

  public async makeCall(): Promise<void> {
    await this.callService.makeCall(this.remoteVideo);
  }

  private async _handleMessage(data): Promise<void> {
    switch (data.type) {
      case 'offer':
        await this.callService.handleOffer(data.offer, this.remoteVideo);
        break;

      case 'answer':
        await this.callService.handleAnswer(data.answer);
        break;

      case 'candidate':
        this.callService.handleCandidate(data.candidate);
        break;

      default:
        break;
    }
  }
}
