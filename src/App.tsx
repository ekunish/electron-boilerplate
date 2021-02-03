import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  //（1）filename, dataをステート定義
  const [filename, setFilename] = useState("");
  const [data, setData] = useState({});

  //（2）ダイアログを開く、ボタンのコールバックを定義
  const handleDialog = useCallback(() => {
    //（2-1）window.ipc.openFile関数を呼び出して Promise の処理
    window.ipc.openFile().then((res) => {
      //（2-2）戻り値がnullでなければ
      if (res) {
        // （2-3）setFilenameとsetDataでステートを更新する
        setFilename(res.filename);
        setData(JSON.parse(res.content));
      }
    });
  }, []);

  useEffect(() => {
    data && console.log(data)
  }, [data])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <button onClick={() => window.ipc.test("Hello, Electron Main World.")}>
          ipcテストメッセージ送信
        </button>
        <div>
          <span>{filename}</span>
          <button onClick={handleDialog}>JSON Open</button>
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div >
  );
}

export default App;
