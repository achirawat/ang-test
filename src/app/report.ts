import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

const report = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let docDefinition = { 
        content: [
            {text: 'line 1'},
            {text: 'line 2'},
            {text: 'line 3'},
            {text: 'line 4'},
            {text: 'line 5'},
            {text: 'line 6', pageBreak: 'before'},
            {text: 'line 7'},
        ]
    };
    pdfMake.createPdf(docDefinition).open();
}

export { report };