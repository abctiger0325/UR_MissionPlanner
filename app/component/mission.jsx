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
        // let missions = XMLData.Plan.Mission.map((d, i) => {
        //     console.log(d)
        //     let name = d.$.prereg === undefined ? "MissionContainer" : "MissionContainer Disabled";
        //     return (
        //         <div
        //             key={i}
        //             className={name}
        //             {...d.$}
        //         >
        //             {d._}
        //         </div>)
        // })

        let missions = this.renderDOM();

        let res = this.renderLayout();
        let layout = res[0];
        let limit = res[1];

        this.state = {
            missions,layout,
            draggable: this.props.draggable,
            limit
        }
        console.log(this.state)
    }

    componentDidUpdate(prevProps){
        if (prevProps.draggable !== this.props.draggable){
            let res = this.renderLayout();
            let layout = res[0];
            let limit = res[1];

            this.setState({
                layout,
                draggable: this.props.draggable,
                limit
            },() => console.log(this.state.limit))
        }
    }

    inRange(e,rule,newPos){
        let obj = e.getAttribute("id");
        let preRule = rule.filter(x => (x.preId) === obj);
        let reqRule = rule.filter(x => (x.regId) === obj);
        let prePass = true, reqPass = true;
        // console.log(preRule, reqRule,newPos)

        if (preRule.length > 0) prePass = (newPos < preRule[0].limitPlaceLower);
        if (reqRule.length > 0) reqPass = (newPos > reqRule[0].limitPlaceUpper);
        // console.log(prePass,reqPass)
        return prePass && reqPass;
    }

    renderDOM(){
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
        return missions
    }

    renderLayout(){
        let limit = [];
        let layout = XMLData.Plan.Mission.map((d, i) => {
            // console.log(d)
            if (d.$.prereg !== undefined) {
                let obj = XMLData.Plan.Mission.find(e => e.$.id === d.$.prereg);
                let num = XMLData.Plan.Mission.findIndex(e => e.$.id === d.$.prereg);
                // console.log(num)
                limit.push({
                    preId: obj.$.id,
                    limitPlaceUpper: num,
                    limitPlaceLower: i,
                    regId: d.$.id
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
        return [layout,limit]
    }

    handleDrag(lay, oldItem, newItem, placeholder, e, element){
        // console.log(element.getAttribute("id"),newItem.y);
        const {limit,layout,missions} = this.state;

        let filterRes = limit.filter(x => (x.preId === element.getAttribute("id") || x.regId === element.getAttribute("id")))
        // console.log(filterRes)
        if (filterRes.length > 0){
            if (!this.inRange(element,filterRes,newItem.y)){
                this.setState({layout})
                return
            }
        }
        const list = XMLData.Plan.Mission;
        const listObj = list.splice(oldItem.y, 1);
        list.splice(newItem.y, 0, listObj[0])
        let missionsNew = this.renderDOM();

        let res = this.renderLayout();
        let layoutNew = res[0];
        let limitNew = res[1];

        console.log(list,XMLData.Plan.Mission)
        this.setState({
            missions:missionsNew, 
            layout:layoutNew,
            limit:limitNew
        })
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
                    // draggableCancel=".Disabled"
                    onDragStop={(layout, oldItem, newItem, placeholder, e, element) => this.handleDrag(layout, oldItem, newItem, placeholder, e, element)}
                >
                    {missions}
                </ReactGridLayout>
            </>
        )
    }
}