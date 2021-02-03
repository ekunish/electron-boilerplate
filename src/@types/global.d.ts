interface Window {
  //（1）対象はWindowというインターフェース
  ipc: {
    test: (message: string) => void; //（2）test関数の型定義
    openFile: () => Promise<{ filename: string; content: string } | null>; //（2）openFile関数を定義
  };
}