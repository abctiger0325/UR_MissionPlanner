import React from "react";
import ReactDOM from "react-dom";

var MainWindow = React.createClass({
    getInitialState: function () {
        return {
            message: '',
        };
    },
    handleTextChange: function (event) {
        this.setState({ message: event.target.value });
    },
    render: function () {
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
        );
    }
});

ReactDOM.render(
    <MainWindow />,
    document.getElementById('test')
);