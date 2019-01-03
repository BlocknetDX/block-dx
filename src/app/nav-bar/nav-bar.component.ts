import { Component, Input, ViewEncapsulation, OnInit, NgZone } from '@angular/core';

import { AppService } from '../app.service';
import { Currentprice } from '../currentprice';
import { CurrentpriceService } from '../currentprice.service';
import {NumberFormatPipe} from '../pipes/decimal.pipe';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavBarComponent implements OnInit {
  public symbols: string[];
  public currentPrice: Currentprice;

  public navCollapsed: boolean;
  public pairSelectorActiveState: boolean;

  public appName: string;
  public appVersion: string;

  constructor(
    private appService: AppService,
    private currentpriceService: CurrentpriceService,
    private numberFormatPipe: NumberFormatPipe,
    private zone: NgZone
  ) {
    this.appName = window.electron.ipcRenderer.sendSync('getAppName');
    this.appVersion = window.electron.ipcRenderer.sendSync('getAppVersion');
  }

  ngOnInit() {

    this.appService.marketPairChanges.subscribe((symbols) => {
      this.zone.run(() => {
        this.symbols = symbols;

        this.currentpriceService.currentprice.subscribe((cp) => {
          this.zone.run(() => {
            this.currentPrice = cp;
          });
        });

      });
    });

  }

  toggleNav() {
    this.navCollapsed = !this.navCollapsed;
  }

  openGeneralSettings(e) {
    e.preventDefault();
    window.electron.ipcRenderer.send('openGeneralSettings');
    this.toggleNav();
  }

  openSettings(e) {
    e.preventDefault();
    window.electron.ipcRenderer.send('openSettings');
    this.toggleNav();
  }

  openConfigurationWizard(e) {
    e.preventDefault();
    window.electron.ipcRenderer.send('openConfigurationWizard');
    this.toggleNav();
  }

  checkForUpdates(e) {
    e.preventDefault();
    if(window.electron.ipcRenderer.sendSync('updateError')) {
      const { openExternal } = window.electron.remote.shell;
      openExternal('https://github.com/BlocknetDX/blockdx-ui/releases/latest');
    } else {
      const status = window.electron.ipcRenderer.sendSync('checkForUpdates');
      switch(status) {
        case 'available':
          break;
        case 'downloading':
          alert('An update is currently being downloaded. A prompt will appear when complete.');
          break;
        case 'downloaded':
          // alert('Update has been downloaded and will be installed once you restart the application.');
          break;
        default:
          alert('There are no Block DX updates available at this time.');
      }
      this.toggleNav();
    }
  }

  openNotices(e) {
    e.preventDefault();
    window.electron.ipcRenderer.send('openTOS');
    this.toggleNav();
  }

  openLink(e, name) {
    e.preventDefault();
    const { openExternal } = window.electron.remote.shell;
    switch(name) {
      case 'reddit':
        openExternal('https://www.reddit.com/r/theblocknet/');
        break;
      case 'twitter':
        openExternal('https://twitter.com/The_Blocknet/');
        break;
      case 'api':
        openExternal('https://api.blocknet.co/#xbridge-api');
        break;
      case 'exchanges':
        openExternal('https://docs.google.com/document/d/1kIjXjQfoANGkSywGLKH4F6H8HtGesgIoP-_3AuZuuQI/preview');
        break;
      case 'faq':
        openExternal('https://www.blocknet.co/blockdx-faq/');
        break;
      case 'fees':
        openExternal('https://www.blocknet.co/blockdx-fees/');
        break;
      case 'help':
        openExternal('https://sites.google.com/view/blocknet/blockdx');
        break;
      case 'community':
        openExternal('https://discord.gg/7RHfBdY');
        break;
      case 'supportTicket':
        openExternal('https://blocknetsupport.cayzu.com/Tickets/Create');
        break;
      case 'discord':
        openExternal('https://discord.gg/2e6s7H8');
        break;
    }
    this.toggleNav();
  }

}
