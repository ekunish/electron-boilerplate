interface Window {
  //（1）対象はWindowというインターフェース
  ipc: {
    test: (message: string) => void; //（2）test関数の型定義
  };
}