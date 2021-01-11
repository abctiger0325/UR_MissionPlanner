import React from "react";
import ReactDOM from "react-dom";
import { Document } from 'react-pdf/dist/esm/entry.webpack';

class Viewpdf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // second: '',
            // minute: '',

        }
        // this.handleTextChange = this.handleTextChange.bind(this);
    }

    // handleTextChange(e) {
    // this.setState({ message: e.target.value });
    // }


    render() {
        return (
            <Document
                fileUrl="./src/mannual.pdf"
                onLoadError={console.error}
            >
                
            </Document>
            )
    }
}

ReactDOM.render(
    <Viewpdf />,
    document.getElementById('pdf')
);