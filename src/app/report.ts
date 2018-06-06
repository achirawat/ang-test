import * as math from 'mathjs'
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

const Line = (value, pageBreak = false) => {
    if (pageBreak) {
        return { text: 'line ' + value, pageBreak: 'before' }
    } else {
        return { text: 'line ' + value }
    }

}
const Header = (pageBreak = false) => {
    if (pageBreak) {
        return { text: 'Header ', pageBreak: 'before' }
    } else {
        return { text: 'Header ' }
    }

}
const Footer = (pageBreak = false) => {
    if (pageBreak) {
        return { text: 'Footer ', pageBreak: 'after' }
    } else {
        return { text: 'Footer ' }
    }
}
const Detail = (totalLine, linesPerPage, firstTime = false) => {
    let result = [];
    let pageNo = 0
    let numOfPage = Math.ceil(totalLine / linesPerPage)

    for (let lineNo = 1; lineNo <= totalLine; lineNo++) {
        if (lineNo == 1) {
            if (firstTime) {
                result.push(Header())
                result.push(Line(lineNo))
            } else {
                result.push(Header(true))
                result.push(Line(lineNo))
            }

        }
        else if (lineNo % linesPerPage == 1) {
            result.push(Header(true))
            result.push(Line(lineNo))
            if (lineNo == totalLine) {
                result.push(Footer())
            }
        }
        else {
            result.push(Line(lineNo))
            if (lineNo % linesPerPage == 0 || lineNo == totalLine) {
                result.push(Footer())
            }
        }
    }
    return result
}
const report = (pageNo, numOfPage) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let docDefinition = {
        header: function(pageNo, numOfPage){ 
            return { text: pageNo + '/' + numOfPage, alignment: 'right' }
        },
        footer: function(pageNo, numOfPage){ 
            return { text: pageNo + '/' + numOfPage, alignment: 'right' }
        },
        content: [
            Detail(21, 5, true),
            Detail(30, 9),
        ]
    };
    pdfMake.createPdf(docDefinition).open();
}

export { report };