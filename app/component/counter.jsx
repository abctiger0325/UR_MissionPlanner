import React from "react";
import Timer from "react-compound-timer";

export class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prepared: false
            // second: '',
            // minute: '',
        }
        // this.handleTextChange = this.handleTextChange.bind(this);
    }

    // handleTextChange(e) {
    // this.setState({ message: e.target.value });
    // }

    render() {
        const {prepared} = this.state;
        return (
            <>
                <Timer
                    initialTime={this.props.initTime}
                    timeToUpdate={50}
                    direction="backward"
                    startImmediately={false}
                    checkpoints = {[
                        {
                            time: 0,
                            callback: () => {
                                if (prepared) {
                                } else {
                                }
                            }
                        }
                    ]}
                >
                    {({ start, stop, reset, setTime }) => (
                        <>
                            <div>
                                <Timer.Minutes
                                    formatValue={
                                        value => (value).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
                                    }
                                /> :
                                <Timer.Seconds
                                    formatValue={
                                        value => (value).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
                                    }
                                /> :
                                <Timer.Milliseconds
                                    formatValue={value => {
                                        // console.log(value)
                                        let tmp = Math.trunc(value / 10);
                                        return (tmp).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
                                    }
                                    }
                                />
                            </div>
                            <div>
                                <button onClick={start}>Start</button>
                                <button onClick={stop}>Stop</button>
                                <button onClick={() => reset && setTime(this.props.initTime) && function() {
                                    this.setState({
                                        prepared: false
                                    });
                                }}>Reset</button>
                                <button onClick={() => setTime(15 * 1000 * 60) && function() {
                                    this.setState({
                                        prepared: true
                                    })
                                }}>Next Session</button>
                            </div>
                        </>
                    )}
                </Timer>
            </>
        )
    }
}
