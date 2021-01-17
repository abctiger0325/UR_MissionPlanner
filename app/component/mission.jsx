import React from "react";
import XMLData from '../src/mission.xml';
import RGL, { WidthProvider, GridLayout  } from "react-grid-layout";

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
        let missions = XMLData.Plan.Mission.map((d, i) => {
            console.log(d)
            let name = d.$.prereg === undefined ? "MissionContainer" : "MissionContainer Disabled";
            return (
                <div
                    key={i}
                    className={name}
                    {...d.$}
                >
                    {d._}
                </div>)
        })

        let layout = XMLData.Plan.Mission.map((d, i) => {
            // console.log(d)
            return {
                x: 0,
                y: i,
                w: 3,
                h: 1,
                i: d.$.id,
                // isDraggable: able
            }
        })
        this.mission = React.createRef();
        this.state = {
            missions,layout,
            draggable: this.props.draggable,
            limit: []
        }
        console.log(this.state)
    }

    componentDidUpdate(prevProps){
        if (prevProps.draggable !== this.props.draggable){
            let limit = [];
            let layout = XMLData.Plan.Mission.map((d, i) => {
                // console.log(d)
                if (d.$.prereg !== undefined) {
                    let obj = XMLData.Plan.Mission.find(e => e.$.id === d.$.prereg);
                    // console.log(obj);
                    limit.push({
                        preId : obj.$.id,
                        limitPlace: i
                    })
                }
                return {
                    x: 0,
                    y: i,
                    w: 3,
                    h: 1,
                    i: i.toString(),
                    // isDraggable: able
                }
            })

            this.setState({
                layout,
                draggable: this.props.draggable,
                limit
            },() => console.log(this.state.limit))
        }
    }

    handleDrag(lay, oldItem, newItem, placeholder, e, element){
        // console.log(element.getAttribute("id"));
        const {limit,layout,missions} = this.state;
        let filterRes = limit.filter(x => x.preId === element.getAttribute("id"))
        console.log(filterRes)
        if ((filterRes.length > 0) && (newItem.y >= filterRes[0].limitPlace)){
            this.setState({layout})
            return
        }
        // console.log(missions,oldItem)
        const obj = missions.splice(oldItem.y,1);
        missions.splice(newItem.y,0,obj[0]);
        let buf = missions.map((d,i) => {
            console.log(d.key , i.toString());
            if (d.key === i.toString()) return d;
            let data = XMLData.Plan.Mission[d.key]
            let name = data.$.prereg === undefined ? "MissionContainer" : "MissionContainer Disabled";
            console.log(data)
            return (
                <div
                    key={i}
                    className={name}
                    {...data.$}
                >
                    {data._}
                </div>
            )

        })
        console.log(buf)
        this.setState({missions:buf})
    }

    render() {
        const {missions, layout, draggable} = this.state
        console.log(draggable);
        const ReactGridLayout = WidthProvider(RGL);

        return (
            <>
                <ReactGridLayout
                    layout={layout}
                    isResizable={false}
                    isDraggable={draggable}
                    cols = {1}
                    rowHeight = {60}
                    width = {600}
                    draggableCancel=".Disabled"
                    onDragStop={(layout, oldItem, newItem, placeholder, e, element) => this.handleDrag(layout, oldItem, newItem, placeholder, e, element)}
                >
                    {missions}
                </ReactGridLayout>
            </>
        )
    }
}