import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import * as path from 'path';
import * as isDev from 'electron-is-dev';
import * as fs from 'fs'

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true, //（4-1）セキュリティ設定
      preload: path.join(__dirname, "preload.js"), //（4-2）レンダラープロセス初期化スクリプト指定
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:3000/index.html');
  } else {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  }

  win.on('closed', () => win = null);

  // Hot Reloading
  if (isDev) {
    // 'node_modules/.bin/electronPath'
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron'),
      forceHardReset: true,
      hardResetMethod: 'exit'
    });
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

//（8）IPC通信のテスト実装
ipcMain.handle("test", (event, message) => {
  console.log("test message:", message);
});


//（1）invokeできるopenFileを定義する
ipcMain.handle("openFile", (event) => {
  //（2）処理の中身が非同期なのでasync関数を定義
  const read = async () => {
    //（3）dialog.showOpenDialogでファイルオープンダイアログを開く
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ["openFile"],
      title: "JSONファイルを開く",
      defaultPath: ".",
      filters: [{ name: "JSON file", extensions: ["json"] }],
    });

    //（4）canceledなら、nullを返す
    if (canceled) {
      return null;
    }

    //（5）ダイアログで指定されたファイルをUTF-8とみなして読み込む
    const content = await fs.promises.readFile(filePaths[0], {
      encoding: "utf-8",
    });

    //（6）filenameとcontentのオブジェクトを返す
    return { filename: filePaths[0], content };
  };

  //（7）定義されたasync関数を実行する
  return read();
});