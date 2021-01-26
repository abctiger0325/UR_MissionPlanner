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

function createWindow() {
    mainWindow = new BrowserWindow({ 
        // width: 800, 
        // height: 600,
        fullscreen: true,
        webPreferences: {
            // nodeIntegration: true,
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

        let data = fs.readFileSync('./app/src/mission.xml', { encoding: 'utf-8' });
        e.returnValue = data
    })

    ipcMain.on('clicked',(e,arg) => {
        // console.log(arg)
        mainWindow.webContents.send('clickedTran',arg);
        e.returnValue = true;
    })

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    mainWindow.webContents.openDevTools();
    mainWindow.setMenuBarVisibility(false)

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
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