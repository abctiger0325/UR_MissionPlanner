import React from "react";
import XMLData from '../src/mission.xml';
import RGL, { WidthProvider, GridLayout  } from "react-grid-layout";
import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';
const { ipcRenderer } = window.require('electron');

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


        // let data = require('../src/'+ this.props.file)
        // console.log(data)
        // const data = XMLData.Plan.Mission;
        let data = ipcRenderer.sendSync('mounted', true);
        // console.log(data,XMLData)
        data = data.match(/[^<]+/g)
        data = data.filter(x => !x.includes('/'))
        data.shift();
        data = data.map((d, i) => {
            let tmp = d.match(/[^>]+/g)
            let attr = tmp[0];
            attr = attr.match(/[^\s]+/g)
            attr.shift();
            const attrObj = new Object;
            attr.forEach((d, i) => {
                let a = d.match(/[^=]+/g)
                let v = a[1].match(/\w+/g)
                Object.defineProperty(attrObj, a[0], {
                    value: v[0],
                    enumerable: true
                })
            })
            // console.log(attrObj)
            let info = tmp[1]
            const res = new Object();
            Object.defineProperties(res, {
                _: {
                    value: info,
                    enumerable: true
                },
                $: {
                    value: attrObj,
                    enumerable: true
                }
            })
            // console.log(res)
            return res
        })

        this.state = {
            data
        }
        // console.log(this.state.data)
        // const dataURI = "data:text/xml;base64," + encodeBase64(JSON.stringify(data));
        // saveAs(dataURI, 'testing.xml');


        let missions = this.renderDOM();

        let res = this.renderLayout();
        let layout = res[0];
        let limit = res[1];

        this.state = {
            missions,layout,
            draggable: this.props.draggable,
            limit,
            data
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
        const {data} = this.state;
        let missions = data.map((d, i) => {
            // console.log(d)
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
        const {data} = this.state;
        let layout = data.map((d, i) => {
            // console.log(d)
            if (d.$.prereg !== undefined) {
                let obj = data.find(e => e.$.id === d.$.prereg);
                let num = data.findIndex(e => e.$.id === d.$.prereg);
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
                w: 1,
                h: 1,
                i: i.toString(),
                maxW: 300
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
        const {data} = this.state;
        const listObj = data.splice(oldItem.y, 1);
        data.splice(newItem.y, 0, listObj[0])
        let missionsNew = this.renderDOM();

        let res = this.renderLayout();
        let layoutNew = res[0];
        let limitNew = res[1];

        // console.log(list,XMLData.Plan.Mission)
        this.setState({
            missions:missionsNew, 
            layout:layoutNew,
            limit:limitNew,
            data
        })
    }

    renderXML(data){
        let head = "<Plan>\n";
        let tail = "</Plan>";
        let body = data.map((d, i) => {
            // console.log(d)
            let attr = d.$
            let attrString = ""
            // console.log(Object.keys(attr))
            Object.keys(attr).forEach((k,i) => {
                // console.log(k,i)
                attrString = attrString.concat(
                    `${k}="${attr[k]}" `
                )
            })
            let tmp = d._
            let regex = /\w+|\s\b/g
            tmp = tmp.match(regex)
            if (tmp[0] === " ")tmp.shift()
            tmp = tmp.join('')
            // console.log(tmp)
            return `<Mission ${attrString}>${tmp}</Mission>\n`
        })
        // console.log(body)
        return head + body.join('') + tail;
    }

    render() {
        const {missions, layout, draggable,data} = this.state
        console.log(draggable);
        const ReactGridLayout = WidthProvider(RGL);
        console.log(ReactGridLayout)

        return (
            <>
                <ReactGridLayout
                    layout={layout}
                    isResizable={false}
                    isDraggable={draggable}
                    cols = {1}
                    rowHeight = {60}
                    width = {300}
                    // draggableCancel=".Disabled"
                    onDragStop={(layout, oldItem, newItem, placeholder, e, element) => this.handleDrag(layout, oldItem, newItem, placeholder, e, element)}
                >
                    {missions}
                </ReactGridLayout>
                <button onClick={() => {
                    let file = this.renderXML(data)
                    // console.log(file)
                    const dataURI = "data:text/xml;base64," + encodeBase64(file);
                    saveAs(dataURI, this.props.file);
                }}>Save</button>
            </>
        )
    }
}