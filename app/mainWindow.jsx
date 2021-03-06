import React from "react";
import ReactDOM from "react-dom";
import Switch from "react-switch";

import { Counter } from './component/counter.jsx';
import { Mission }  from './component/mission.jsx';
import {CounterSimp} from './component/counterSimp.jsx';
// import { PdfViewer } from './component/pdfView.jsx';
const { ipcRenderer } = window.require('electron');


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            planning: false,
            // minute: '',

        }
        // this.handleTextChange = this.handleTextChange.bind(this);
    }



    render(){
        return (
            <div>
                <div className="counter">
                    <p className="textOne">Time Counter: </p>
                    <CounterSimp
                        min = {5}
                        sec = {0}
                    />
                </div>
                {/* <Counter/> */}
                <div className="mission">
                    <div className="missionHeader">
                        <p className="textOne">Mission:</p> 
                        <div className="switchMode">
                            <p className="textOne">Plan Mode:</p> 
                            <Switch
                                checked={this.state.planning}
                                onChange={() => {
                                    const {planning} = this.state;
                                    this.setState({
                                        planning: !planning
                                    })
                                }}
                                onColor="#93dbc3"
                                onHandleColor="#309c78"
                                handleDiameter={20}
                                // uncheckedIcon={false}
                                // checkedIcon={false}
                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                height={20}
                                width={48}
                                className="react-switch"
                                id="material-switch"
                            />
                        </div>
                    </div>
                    <Mission
                        draggable={this.state.planning}
                        file="mission.xml"
                    />
                </div>
                {/* <PdfViewer/> */}
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);