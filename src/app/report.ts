import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

const Line = (value, pageBreak = false) => {
    if (pageBreak) {
        return { text: 'line ' + value, pageBreak: 'before' }
    } else {
// const Line = (value) => {
    return { text: 'line ' + value }
    }

}
const Header = () => {
        return { text: 'Header ' }
}
const Footer = (pageBreak = false) => {
    if (pageBreak) {
        return { text: 'Footer ', pageBreak: 'after' }
    } else {
        return { text: 'Footer ' }
    }
}
const Detail = (totalLine, linesPerPage, firstTime = false) => {
    // debugger
    let result = [];
    for (let lineNo = 1; lineNo <= totalLine; lineNo++) {
        if (lineNo == 1) {
                result.push(Header())
                result.push(Line(lineNo))
        }
        else if (lineNo % linesPerPage == 1) {
            result.push(Header())
            result.push(Line(lineNo))
        } else {
            result.push(Line(lineNo))
            if (lineNo % linesPerPage == 0) {
                result.push(Footer(true))
            }
        }

    }
    return result
}
const report = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let docDefinition = {
        content: [
            Detail(20, 5, true),
            Detail(30, 9),
        ]
    };
    pdfMake.createPdf(docDefinition).open();
}

export { report };