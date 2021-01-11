const {app, BrowserWindow} = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ 
        width: 800, 
        height: 600,
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

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

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