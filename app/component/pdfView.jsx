import React from "react";
import ReactDOM from "react-dom";
const { ipcRenderer } = window.require('electron');

export class PdfViewer extends React.Component {
    constructor(props) {
        super(props);
        let data = ipcRenderer.sendSync('pdf', true);
        this.state = {
            pageNum: 1
        }
    }


    render() {
        return(
            <>
                123
            </>
        ) 
    }
}