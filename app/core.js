// var planner = $.parseXML("./src/mission.xml");
// var xml = $(planner);
const pdfjsLib = require('../public/pdfjs/build/pdf.js');
const { ipcRenderer } = require('electron');

pdfjsLib.GlobalWorkerOptions.workerSrc ='../public/pdfjs/build/pdf.worker.js';

function pdfRender(){
    let link = __dirname + "/src/mannual.pdf"
    let pdf = pdfjsLib.getDocument(link)
    pdf.promise.then(function(pdfRes){
        pdfRes.getPage(1).then(function(page){
            console.log("dong")
            let scale = 1;
            let viewport = page.getViewport(scale);
            // console.log($("#pdf"))
            let context = $("#pdf")[0].getContext('2d')
            $("#pdf").height(viewport.height)
            $("#pdf").width(viewport.width)
            let renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        })
        // console.log("ding")
    })
}

$(document).ready(
    function(){
        // console.log(pdfjsLib.GlobalWorkerOptions.workerSrc)
        // pdfRender();
        ipcRenderer.on('clickedTran', (e,arg) => {
            console.log("ding",arg)
            let filepath = __dirname + "/src/mannual.pdf"
            arg = parseInt(arg) + 1
            let dir = __dirname + `/../public/pdfjs/web/viewer.html?file=${filepath}#page=${arg}`

            $("#pdf").empty();
            $("#pdf").append(
                `<iframe src=${dir}></iframe>`
            )
            $('#toggle')
                .css('transform', "rotate(180deg)")
                .attr('status', "on")
            $("#mannual")
                .css('width', '')
                .css('flex', '3')
            if ($("#pdf").attr('init') === "false") {
                $("#pdf")
                    .css('width', '100%')
                    // .html('<webview id="foo" src="https://docs.google.com/gview?embedded=true&url=files.materovcompetition.org/2021/2021_EXPLORER_Manual_14Sept2020.pdf" style="display:inline-flex;width:100%;height:100%"></webview>')
                    .attr("init", "true")
            }

        })

        let filepath = __dirname + "/src/mannual.pdf"
        let dir = __dirname + `/../public/pdfjs/web/viewer.html?file=${filepath}`
        // console.log(dir)
        $("#pdf").append(
            `<iframe src=${dir}></iframe>`
        )

        let width = $(".MissionContainer").width();
        console.log(width)
        $(".MissionContainer").css("min-width",width);
        ipcRenderer.on('relimit', (e, arg) => {
            $(".MissionContainer").css("min-width", width);
        })
        $(".saveArea").css("min-width",$(".saveArea").width())
        $("#toggle").click(function () {
            // console.log($('#toggle').attr('status'));
            if ($('#toggle').attr('status') === "on") {
                // $(".textTwo").css("font-size", "2.2vw")
                $('#toggle')
                    .css('transform', "rotate(0deg)")
                    .attr('status', 'off');
                $("#mannual")
                    .css('flex', '')
                    .css('width', "24")
            } else {
                $('#toggle')
                    .css('transform', "rotate(180deg)")
                    .attr('status', "on")
                $("#mannual")
                    .css('width', '')
                    .css('flex', '3')
                if ($("#pdf").attr('init') === "false") {
                    $("#pdf")
                        .css('width', '100%')
                        // .html('<webview id="foo" src="https://docs.google.com/gview?embedded=true&url=files.materovcompetition.org/2021/2021_EXPLORER_Manual_14Sept2020.pdf" style="display:inline-flex;width:100%;height:100%"></webview>')
                        .attr("init", "true")
                }
                // $(".textTwo").css("font-size", "1.75vw")
            }
        })
    
        // console.log(xml);
    }
)

