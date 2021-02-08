import { Box, Button, Container, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react'
import Audio from '../organisms/Audio'

const TopPage: React.FC = () => {

  //（1）filename, dataをステート定義
  const [filename, setfilename] = useState("");
  const [isAudio, setIsAudio] = useState(false)

  //（2）ダイアログを開く、ボタンのコールバックを定義
  const handleDialog = useCallback(() => {
    //（2-1）window.ipc.openfile関数を呼び出して promise の処理
    window.ipc.openFile().then((res) => {
      //（2-2）戻り値がnullでなければ
      if (res) {
        // （2-3）setfilenameとsetdataでステートを更新する
        setfilename(res.filename);
      }
    });
  }, []);

  // useEffect(() => {
  //   data && console.log(data)
  // }, [data])

  const handleOnAudio = () => {
    setIsAudio(true)
    console.log(isAudio)
  }

  return (
    <Container maxWidth="md">
      <Box>
        <Button onClick={() => window.ipc.test("Hello, Electron Main World.")}>
          ipcテストメッセージ送信
        </Button>
      </Box>

      <Box>
        <Typography>{filename}</Typography>
        <Button onClick={() => handleDialog}>JSON Open</Button>
      </Box>

      <Box>
        <Button onClick={handleOnAudio}>audio open</Button>
      </Box>
      <Box>
        {isAudio === false ? (<Typography>not yet</Typography>) : (<Audio />)}
      </Box>
    </Container>
  )
}

export default TopPage;