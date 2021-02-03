import { contextBridge, ipcRenderer } from "electron";

//（1）contextBridgeを使って、メインプロセスの機能をレンダリングプロセスに提供する
contextBridge.exposeInMainWorld("ipc", {
  test: (message: string) => {
    ipcRenderer.invoke("test", message); //（2）IPC通信を送信する
  },
});
