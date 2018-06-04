import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello'

  constructor(){
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(docDefinition).open();
  }
}
