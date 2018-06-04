import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

const report = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(docDefinition).open();
}

export { report };