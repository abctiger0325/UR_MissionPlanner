import React from "react";
import UIfx from 'uifx';
import SevenSegmentDisplay from "react-seven-segment-display";

export class CounterSimp extends React.Component {
    constructor(props) {
        super(props);
        let tmp = (this.props.min * 60 + this.props.sec) * 100;
        let timeLeftVar = this.secondsToTime(tmp);
        // console.log(timeLeftVar)
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

        this.state = {
            //time: 100 * 60 * 5
            tms: tmp,
            time: timeLeftVar,
            prepared: false,
            beep,
            end,
        }
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }


    secondsToTime(secs) {
        let ms = secs % 100;
        secs = Math.floor(secs / 100);
        // console.log(secs,ms);
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "m": minutes,
            "s": seconds,
            "ms": ms
        };
        // console.log(obj);
        return obj;
    }

    // componentDidMount() {
    //     let timeLeftVar = this.secondsToTime(this.state.tms);
    //     console.log(timeLeftVar)
    //     this.setState({ time: timeLeftVar });
    // }

    startTimer() {
        if (this.timer == 0 && this.state.tms > 0) {
            // console.log("dong")
            this.timer = setInterval(this.countDown, 10);
        }
    }

    stopTimer(){
        clearInterval(this.timer);
    }

    countDown() {
        const {prepared, end, beep} = this.state;
        // console.log("ding")
        // Remove one second, set state so a re-render happens.
        let tms = this.state.tms - 1;
        this.setState({
            time: this.secondsToTime(tms),
            tms: tms,
        });

        // Check if we're at zero.
        if (tms == 0) {
            clearInterval(this.timer);
        }
    }
    render() {
        const {time, beep} = this.state;
        // console.log(time)
        let min = time["m"];
        let sec = time["s"];
        let ms = time["ms"];
        // console.log(min,sec,ms);
        return(
            <>

                <div className="timerView">
                    <div className={"segment"}>
                        <SevenSegmentDisplay
                            value={Math.floor(min / 10)}
                            onColor="#00ffd0"
                            offColor="#01382e"
                            height={5}
                            width={25}
                        />
                    </div>
                    <div className={"segment"}>
                        <SevenSegmentDisplay
                            value={min % 10}
                            onColor="#00ffd0"
                            offColor="#01382e"
                            height={5}
                            width={25}
                        />
                    </div>
                    :
                    <div className={"segment"}>
                        <SevenSegmentDisplay
                            value={Math.floor(sec / 10)}
                            onColor="#00ffd0"
                            offColor="#01382e"
                            height={5}
                            width={25}
                        />
                    </div>
                    <div className={"segment"}>
                        <SevenSegmentDisplay
                            value={sec % 10}
                            onColor="#00ffd0"
                            offColor="#01382e"
                            height={5}
                            width={25}
                        />
                    </div>
                    :

                    <div className={"segment"}>
                        <SevenSegmentDisplay
                            value={Math.floor(ms / 10)}
                            onColor="#00ffd0"
                            offColor="#01382e"
                            height={5}
                            width={10}
                        />
                    </div>
                    <div className={"segment"}>
                        <SevenSegmentDisplay
                            value={ms % 10}
                            onColor="#00ffd0"
                            offColor="#01382e"
                            height={5}
                            width={10}
                        />
                    </div>
                </div>
                <div>
                    <button onClick={() => {
                        // console.log(Time);
                        this.startTimer()
                    }}>Start</button>
                    <button onClick={() => {
                        this.stopTimer()
                    }}>Stop</button>
                    <button onClick={() => {
                        let tmp = (this.props.min * 60 + this.props.sec) * 100;
                        let timeLeftVar = this.secondsToTime(tmp);

                        this.setState({
                            tms: tmp,
                            time: timeLeftVar,
                            prepared: false
                        });
                    }}>Reset</button>
                    {(this.state.prepared === false) ?
                        (<button onClick={() => {
                            this.stopTimer();
                            beep.play();
                            let tmp = (15 * 60) * 100;
                            let timeLeftVar = this.secondsToTime(tmp);

                            this.setState({
                                tms: tmp,
                                time: timeLeftVar,
                                prepared: true
                            })
                        }}
                        >Next Session</button>) 
                        : null
                    }
                </div>
            </>
        )
    }
}