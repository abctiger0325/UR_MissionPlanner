var { Timer } = require('easytimer.js');
var timer = new Timer();

// var planner = $.parseXML("./src/mission.xml");
// var xml = $(planner);


function playBeep(sound,time,speed){
    let timeout = setInterval(function () {
        $(sound)[0].pause();
        $(sound)[0].currentTime = 0;
        clearInterval(timeout)
    }, time);
    $(sound)[0].playbacsoundkRate = speed;
    $(sound)[0].play();
}

function timesUpEvent() {
    // console.log($("#timer-counter").attr('prepare'));
    if ($("#timer-counter").attr('prepare') === "true") {
        playBeep("#soundSkip", 400, 3.5);
        $("#skip-button").css("display", "none");
        timer.stop();
        timer.start({ precision: 'secondTenths', target: { minutes: 15 }, startValues: { minutes: 14, seconds: 55 } });
        $("#timer-counter").attr('prepare', false);
    } else {
        playBeep("#soundEnd", 1000, 1);
        timer.stop();
        $("#start-button").css("display", "inline-block");
        $("#pause-button").css("display", "none");
        $("#skip-button").css("display", "inline-block");
        $("#timer-counter")
            .attr('prepare', true)
            .attr('reset', true);
        $('#timer-counter .values').html(timer.getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths']));
    }
}


$(document).ready(
    function(){
        let zero = "00:00:00:0";

        $('#timer-counter .values')
            // .css("color", "red")
            .html(zero);

        // $('#test').click(function(){
        //     $('#planner').append('<div id="app"></div><script src="./built/mainWindow.js"></script>')
        // })
            
        $("#start-button").click(function () {
            // console.log("ding");
            timer.start({ precision: 'secondTenths', startValues: { minutes: 4,seconds:55 },target: {minutes: 5}});

            timer.addEventListener('secondTenthsUpdated', function (e) {
                // console.log(timer.getTimeValues());
                $('#timer-counter .values').html(timer.getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths']));
                // console.log($("#timer-counter").attr('prepare'));
            });
            if ($("#timer-counter").attr('reset') === "false") {
                timer.addEventListener('targetAchieved', () => timesUpEvent());
            }

            $("#start-button").css("display", "none");
            $("#pause-button").css("display", "inline-block");
            // console.log(timer);
        });

        $("#pause-button").click(function() {
            timer.pause();
            $("#start-button").css("display", "inline-block");
            $("#pause-button").css("display", "none");
        })

        $("#reset-button").click(function () {
            timer.stop();
            $("#start-button").css("display", "inline-block");
            $("#pause-button").css("display", "none");
            $("#skip-button").css("display", "inline-block");
            $("#timer-counter")
                .attr('prepare', true)
                .attr('reset', true);
            $('#timer-counter .values').html(timer.getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths']));
        })

        $("#skip-button").click(function(){
            timesUpEvent()
        })

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
                // if ($("#pdf").attr('init') === "false") {
                //     $("#pdf")
                //         .css('width', '100%')
                //         .html('<webview width="100%" height="100%" src="http://files.materovcompetition.org/2021/2021_EXPLORER_Manual_14Sept2020.pdf"></webview>')
                //         .attr("init", "true")
                // }
            }
        })
    
        // console.log(xml);
    }
)

