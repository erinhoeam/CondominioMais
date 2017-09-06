import { Component } from '@angular/core';

import { CommonService } from './../../services/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    constructor(private commonService:CommonService){
        
    }

    verificarPermissao(claimName:String,claimValue:String):boolean{
        return this.commonService.verificarClaim(claimName,claimValue);
    }

    isActive = false;
    showMenu = '';
    eventCalled() {
        this.isActive = !this.isActive;
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

}
