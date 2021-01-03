import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        }
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(e) {
    this.setState({ message: e.target.value });
    }


    render(){
        return (
            <div>
                Hello world!!
                <hr />
                <input type="text" onChange={this.handleTextChange} />
                <p><strong>你輸入的是</strong></p>
                <p>
                    <span>{this.state.message}</span>
                </p>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('test')
);