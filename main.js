const {app, BrowserWindow, ipcMain} = require('electron');
// const fetch = require("node-fetch");
app.commandLine.appendSwitch('no-sandbox');
// pdfjsLib.GlobalWorkerOptions.workerSrc =
//     "../../build/webpack/pdf.worker.bundle.js";


// function pdfRender() {
//     let filepath = __dirname + "/src/mannual.pdf"
//     pdfjsLib.getDocument(filepath).promise.then(function () {
//         console.log("ding")
//     })
// }


var mainWindow;
var timerState = false;

function createWindow() {
    mainWindow = new BrowserWindow({ 
        // width: 800, 
        // height: 600,
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
            plugins: true
        }
    });
    // pdfWindow = new BrowserWindow({
    //     width: 800,
    //     height: 600
    // });

    // pdfWindow.loadURL('http://files.materovcompetition.org/2021/2021_EXPLORER_Manual_14Sept2020.pdf');

    // pdfWindow.on('closed', function () {
    //     mainWindow = null;
    // });

    ipcMain.on('mounted',(e) => {
        let fs = require('fs');

        let data = fs.readFileSync( __filename + '/../src/mission.xml', { encoding: 'utf-8' });
        // let data = fs.readFileSync('./src/mission.xml', { encoding: 'utf-8' });
        e.returnValue = data
    })

    ipcMain.on('clicked',(e,arg) => {
        // console.log(arg)
        if (arg !== "ACK")
            mainWindow.webContents.send('clickedTran',arg);
        else {
            mainWindow.webContents.send('relimit', true);
        }
        e.returnValue = true;
    })

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    // mainWindow.webContents.openDevTools();
    mainWindow.setMenuBarVisibility(false)

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    mainWindow.webContents.on('before-input-event', (event, input) => {
        if (input.type === 'keyUp'){
            if (input.key === ' ') {
                timerState = !timerState;
                console.log(timerState)
                mainWindow.webContents.send('timer', timerState);
            } else if (input.key.toLocaleLowerCase() === 'r') {
                timerState = false
                mainWindow.webContents.send('reload', true);
            } else if (input.key === "Escape"){
                app.quit();
            }
            event.preventDefault()
        }  
    })
}

app.on('ready', createWindow);

// app.on('web-contents-created', function (e,web) {
//     let fs = require('fs');

//     let data = fs.readFileSync('./app/src/mission.xml');

//     console.log("ding")
//     web.webContents.send('pdf', data);
// })

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

var handleStartupEvent = function () {
    if (process.platform !== 'win32') {
        return false;
    }

    var squirrelCommand = process.argv[1];

    switch (squirrelCommand) {
        case '--squirrel-install':
        case '--squirrel-updated':
            install();
            return true;
        case '--squirrel-uninstall':
            uninstall();
            app.quit();
            return true;
        case '--squirrel-obsolete':
            app.quit();
            return true;
    }

    function install() {
        var cp = require('child_process');
        var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
        var target = path.basename(process.execPath);
        var child = cp.spawn(updateDotExe, ["--createShortcut", target], { detached: true });
        child.on('close', function (code) {
            app.quit();
        });
    }
    function uninstall() {
        var cp = require('child_process');
        var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
        var target = path.basename(process.execPath);
        var child = cp.spawn(updateDotExe, ["--removeShortcut", target], { detached: true });
        child.on('close', function (code) {
            app.quit();
        });
    }

};

if (handleStartupEvent()) {
    return;
}