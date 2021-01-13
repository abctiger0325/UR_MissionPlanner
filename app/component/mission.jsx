import React from "react";
import XMLData from '../src/mission.xml';

// var rawFile = new XMLHttpRequest();
// rawFile.open("GET", XMLData, false);
// rawFile.onreadystatechange = () => {
//     if (rawFile.readyState === 4) {
//         if (rawFile.status === 200 || rawFile.status == 0) {
//             var xmlasstring = rawFile.responseText;
//             console.log('Your xml file as string', xmlasstring)
//         }
//     }

export class Mission extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     data: ''
        // }
    }

    // componentDidMount(){

    // }

    render() {
        console.log(XMLData);
        let missions = XMLData.Plan.Mission.map((d,i) => {
            console.log(d)
            return (<div key={i}>{d._}</div>)
        })
        return (
            <>
                {missions}
            </>
        )
    }
}