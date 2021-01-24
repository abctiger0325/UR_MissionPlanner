// var planner = $.parseXML("./src/mission.xml");
// var xml = $(planner);

$(document).ready(
    function(){
        let filepath = __dirname + "/src/mannual.pdf"
        let dir = __dirname + `/../public/pdfjs/web/viewer.html?file=${filepath}`
        $("#pdf").append(
            `<iframe src=${dir}></iframe>`
        )
        $("#toggle").click(function () {
            // console.log($('#toggle').attr('status'));
            if ($('#toggle').attr('status') === "on") {
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
            }
        })
    
        // console.log(xml);
    }
)

