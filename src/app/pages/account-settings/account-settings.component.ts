import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  

  constructor( private settingService: SettingsService) {
   }

  ngOnInit(): void {
    this.settingService.checkCurrentTheme();
  }

  /**
   * metodo que cambia el tema de la aplicacion
   * @param theme el teme que recibe por parametro
   */
  changeTheme(theme: string) {
    this.settingService.changeTheme(theme);
  }


}
