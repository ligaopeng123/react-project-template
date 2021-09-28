// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1400,
		height: 768,
		minWidth: 1400,//窗口的最小宽度，单位: 像素值,
		minHeight: 768,//窗口的最小高度，单位: 像素值,
		backgroundColor: '#00000000', // 窗口背景色
		transparent: true, // 设置透明窗体
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false, // 渲染进程是否可使用require
			preload: path.join(__dirname, 'preload.js')
		},
		frame: false// process.env.REACT_APP_ENV !== 'production' // 关闭窗口
	});

	// and load the index.html of the app. http://localhost:9001/
	// 环境管理
	if (process.env.REACT_APP_ENV === 'production') {
		mainWindow.loadFile('./build/index.html');
		mainWindow.webContents.openDevTools();
	} else {
		mainWindow.loadURL('http://localhost:9001/');
		mainWindow.webContents.openDevTools();
	}
	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	});
	// 调试界面
	// mainWindow.webContents.openDevTools()
}

const ipc = require('electron').ipcMain;
//接收
ipc.on('test', function (msg) {
	console.log(msg)
});


//接收窗口最小化通信
ipc.on('window-min', () => {
	mainWindow.minimize();
});

//接收窗口变小（还原到原状态）通信
ipc.on('window-max', () => {
	if (mainWindow.isMaximized()) {
		mainWindow.unmaximize();
	} else {
		mainWindow.maximize();
	}
});

//接收窗口最大化通信
ipc.on('window-close', () => {
	mainWindow.close();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) createWindow()
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
