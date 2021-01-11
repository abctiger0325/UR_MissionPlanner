import React from "react";
import Timer from "react-compound-timer";
import UIfx from 'uifx';


const withTimer = timerProps => WrappedComponent => wrappedComponentProps => (
    <Timer {...timerProps}>
        {timerRenderProps =>
            <WrappedComponent {...wrappedComponentProps} timer={timerRenderProps} />}
    </Timer>
);

class Wrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prepared: false,
            beep: '',
            end: ''
        }
        // console.log(this.props)
    }

    // checkpoints = {
    //     [
    //     {
    //         time: 0,
    //         callback: () => {
    //             if (prepared) {
    //                 end.play();
    //             } else {
    //                 beep.play();
    //                 this.setState({
    //                     prepared: true
    //                 }, () => {
    //                     console.log(...)
    //                 })
    //             }
    //         }
    //     }
    //     ]}

    componentDidMount(){
        const { setCheckpoints,  setTime, start } = this.props.timer;
        const {prepared} = this.state;

        const end = new UIfx(
            '../app/src/end.mp3',
            {
                volume: 0.7
            }
        );
        const beep = new UIfx(
            '../app/src/beep.mp3',
            {
                volume: 0.7
            }
        )

        setCheckpoints([
            {
                time: 0,
                callback: () => {
                    if (!prepared){
                        setTime(15 * 1000 * 60);
                        start();
                        beep.play();
                        this.setState({
                            prepared: true
                        })
                    } else {
                        end.play();
                    }
                }
            }
        ])

        this.setState({
            end,beep
        })
    }

    render() {
        const {prepared, beep, end} = this.state;
        const Time = this.props.timer;

        return (
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
                        formatValue={
                            value => {
                            // console.log(value)
                            let tmp = Math.trunc(value / 10);
                            return (tmp).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
                        }}
                    />
                </div>
                <div>
                    <button onClick={() => {
                        Time.start();
                        // console.log(Time);
                    }}>Start</button>
                    <button onClick={() => {
                        Time.stop();
                    }}>Stop</button>
                    <button onClick={() => {
                        Time.reset();
                        Time.setTime(1000 * 5 * 60);
                        this.setState({
                            prepared: false
                        });
                    }}>Reset</button>
                    {(this.state.prepared === false)?
                    (<button onClick={() => {
                        Time.setTime(15 * 1000 * 60);
                        beep.play();
                        this.setState({
                            prepared: true
                        })}}
                    >Next Session</button>):null}
                </div>
            </>
        )
    }
}

export const Counter = withTimer({
    initialTime: 1000 * 60 * 5,
    // initialTime: 1000 * 5,
    timeToUpdate: 50,
    direction:"backward",
    startImmediately: false,
})(Wrapper)
