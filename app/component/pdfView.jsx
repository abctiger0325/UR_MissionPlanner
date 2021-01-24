import React from "react";
import ReactDOM from "react-dom";
import { Document, Page, PDFViewer } from '@react-pdf/renderer';

export class PdfViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1
        }
    }

    onDocumentLoadSuccess(num){

    }

    render() {
        const {  pageNum } = this.state;
        return(
            <>
                <PDFViewer>
                    <Document
                        file="../src/mannual.pdf"
                        onLoadSuccess={(e) => onDocumentLoadSuccess(e)}
                    >
                        <Page pageNumber={pageNum} />
                    </Document>
                </PDFViewer>
            </>
        ) 
    }
}