import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message } from 'primeng/api';
import { CygNetApiService } from '../core/cygnet-api.service';

@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.scss']
})
export class TwoFactorComponent implements OnInit {
  @ViewChild("twoFactorInput") twoFactorInput: ElementRef;

  public qrImageSrc: string;
  public messages: Message[] = [];

  private showStep1: boolean = false;
  private showQrCode: boolean = false;
  private showComplete: boolean = false;

  constructor(private cygNet: CygNetApiService) {
  }

  ngOnInit() {
    this.showStep1 = true;
  }

  public async getPSK(): Promise<void> {
    this.qrImageSrc = await this.cygNet.getTwoFactorQRCode();
    this.showStep1 = false;
    this.showQrCode = true;
  }

  public async confirm() {
    let responseCode: number;

    responseCode = await this.cygNet.confirmTwoFactorRegistration(this.twoFactorInput.nativeElement.value);

    if (responseCode == 204) {
      this.showQrCode = false;
      this.showComplete = true;
    } else {
      this.showError("Confirmation failed. Status: " + responseCode);
    }
  }

  private showError(message: string) {
    this.messages.push({ severity: 'error', summary: message });
  }
}
