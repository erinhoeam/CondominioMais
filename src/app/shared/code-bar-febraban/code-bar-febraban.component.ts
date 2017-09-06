import { Component, OnInit, Input } from '@angular/core';

import { BarCodeUtil } from 'app/utils/barcode-util';

@Component({
  selector: 'code-bar-febraban',
  templateUrl: './code-bar-febraban.component.html',
  styleUrls: ['./code-bar-febraban.component.scss']
})
export class CodeBarFebrabanComponent implements OnInit {

  @Input() codeBar:string;
  codeBarReturn:string;
  constructor() {

   }

  ngOnInit() {
    this.codeBarReturn = BarCodeUtil.generateBarcodeSequence(this.codeBar);
  }

}
