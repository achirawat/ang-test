import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

const Line = (value, pageBreak = false) => {
    if (pageBreak) {
        return { text: 'line ' + value, pageBreak: 'before' }
    } else {
        return { text: 'line ' + value }
    }
}
const Detail = (totalLine, linesPerPage, firstTime = false) => {
    let result = [];

    for (let lineNo = 1; lineNo <= totalLine; lineNo++) {
        if (lineNo == 1) {
            if (firstTime) {
                result.push(Line(lineNo))
            } else {
                result.push(Line(lineNo, true))
            }
        }
        else if (lineNo % linesPerPage == 1) {
            result.push(Line(lineNo, true))
        }
        else {
            result.push(Line(lineNo))
        }
    }
    return result
}
const report = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let docDefinition = {
        header: function(pageNo, numOfPage){ 
            return { columns: [
                { text: 'Header', alignment: 'left' },
                { text: pageNo + '/' + numOfPage, alignment: 'right' }
            ] }
        },
        footer: function(pageNo, numOfPage){ 
            let a =  { text: 'Footer', absolutePosition: {x:72*7 ,y:0 } };
            let foot = {
                columns: [
                    { text: '', alignment: 'center' },
                    // { text: 'Footer', alignment: 'center' },
                    // { text: 'Footer', absolutePosition: {x:72*7 ,y:0 } },
                    a,
                    { text: pageNo + '/' + numOfPage, alignment: 'right' }
                ]
            }
            return foot
        },
        content: [
            Detail(21, 5, true),
            Detail(30, 9),
        ]
    };
    pdfMake.createPdf(docDefinition).open();
}

export { report };