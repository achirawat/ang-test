import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

const Line = (value, pageBreak = false) => {
    if (pageBreak) {
        return { text: 'line ' + value, pageBreak: 'before' }
    } else {
        return { text: 'line ' + value }
    }

}
const Detail = (totalLine, linesPerPage) => {
    let result = [];
    for (let lineNo = 1; lineNo <= totalLine; lineNo++) {
        if (lineNo % linesPerPage == 1 && lineNo != 1 ) {
            result.push(Line(lineNo, true))
        } else {
            result.push(Line(lineNo))
        }

    }
    return result
}
const report = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let docDefinition = {
        content: [
            Detail(13,6),
            Detail(15,8),
        ]
    };
    pdfMake.createPdf(docDefinition).open();
}

export { report };