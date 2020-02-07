import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { TranslateServiceService } from 'src/app/services/translate/translate-service.service';
import { LanguageEnum } from 'src/app/enums/language-enum';
import { PlatformEnum } from 'src/app/enums/platform-enum';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit {

  public total: any;
  public platform: string;
  public languageEnum = LanguageEnum;
  private phoneNumber = "972527452527";
  private message = "";
  public phoneToPay = "052-429-8438";
  constructor(public dialogRef: MatDialogRef<PaymentMethodsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentMethodsComponent,
    public httpService: HttpServiceService,
    public translateService: TranslateServiceService,
    public langService: TranslateServiceService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router) { 
      this.total = this.data.total;
    }

  ngOnInit() {
    console.log(this.getMobileOperatingSystem());
    this.platform = this.getMobileOperatingSystem();
    this.message = this.langService.translate('Whatsapp');
  }

  private goToUrl(url: string): void {
    window.open(url);
  }

  toMyOrder(): void {
    this.dialogRef.close();
    this.router.navigateByUrl('account');
  }

  private getMobileOperatingSystem() : string{
    var userAgent = navigator.userAgent || navigator.vendor;
  
        // Windows Phone must come first because its UA also contains "Android"
      if (/windows phone/i.test(userAgent)) {
          return PlatformEnum.WindowsMobile;
      }
  
      if (/android/i.test(userAgent)) {
          return PlatformEnum.Android;
      }
  
      // iOS detection from: http://stackoverflow.com/a/9039885/177710
      if (/iPad|iPhone|iPod/.test(userAgent)) {
          return PlatformEnum.Apple;
      }
  
      return PlatformEnum.Web;
  }

private getLinkWhastapp() : string{
  this.phoneNumber = this.phoneNumber
  this.message = this.message.split(' ').join('%20')
  return 'https://web.whatsapp.com/send?phone=' + this.phoneNumber + '&text=%20' + this.message + '&source&data';
}

public whatsapp() : void {
    switch(this.platform) {
      case PlatformEnum.Android: case PlatformEnum.WindowsMobile:case PlatformEnum.Apple:
        let mobile = 'https://api.whatsapp.com/send?phone=' + this.phoneNumber;
        this.goToUrl(mobile);
        break;
      case PlatformEnum.Web:
        let temp = this.getLinkWhastapp();
        this.goToUrl(temp);
        break;
    }
  }

public bit(): void {
    switch(this.platform) {
      case PlatformEnum.Android: case PlatformEnum.WindowsMobile:
        this.goToUrl('https://play.google.com/store/apps/details?id=com.bnhp.payments.paymentsapp');
        break;
      case PlatformEnum.Apple:
        this.goToUrl('https://apps.apple.com/us/app/bit-byt/id1182007739?ls=1');
        break;
      case PlatformEnum.Web:
        this.goToUrl('https://www.bitpay.co.il/');
        break;
    }
  }

public pepper(): void {
    switch(this.platform) {
      case PlatformEnum.Android: case PlatformEnum.WindowsMobile:
        this.goToUrl('https://play.google.com/store/apps/details?id=com.pepper.pay');
        break;
      case PlatformEnum.Apple:
        this.goToUrl('https://apps.apple.com/app/id1138800563');
        break;
      case PlatformEnum.Web:
        this.goToUrl('https://www.pepper.co.il/pepper-pay/');
        break;
    }
  }

public paybox(): void {
    switch(this.platform) {
      case PlatformEnum.Android: case PlatformEnum.WindowsMobile:
        this.goToUrl('https://play.google.com/store/apps/details?id=com.payboxapp');
        break;
      case PlatformEnum.Apple:
        this.goToUrl('https://apps.apple.com/app/paybox/id895491053');
        break;
      case PlatformEnum.Web:
        this.goToUrl('https://www.payboxapp.com/il/home');
        break;
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
