import React from "react";
import ReactDOM from "react-dom";
import Switch from "react-switch";

import { Counter } from './component/counter.jsx';
import { Mission }  from './component/mission.jsx';
// import { Planner } from './component/planner.jsx';
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
                Time Counter: 
                <Counter/>
                Mission: 
                <Switch
                    checked={this.state.planning}
                    onChange={() => {
                        const {planning} = this.state;
                        this.setState({
                            planning: !planning
                        })
                    }}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
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
                <Mission
                    draggable={this.state.planning}
                    file="mission.xml"
                />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);