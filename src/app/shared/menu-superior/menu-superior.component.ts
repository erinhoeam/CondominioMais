import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.scss']
})
export class MenuSuperiorComponent implements OnInit {

  isCollapsed: boolean = true;
  private token: string;
  public user;
  edificioNome:String;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('dv.service.user'));
   }

  ngOnInit() {
    this.edificioNome = this.user.edificioNome;
  }
  usuarioLogado(): boolean {
    this.token = localStorage.getItem('dv.service.token');
    if (!this.token) {
      return false;
    }

    return true;
  }
}
