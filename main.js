const {app, BrowserWindow, ipcMain} = require('electron');
app.commandLine.appendSwitch('no-sandbox');

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