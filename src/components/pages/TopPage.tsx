import { Box, Button, Container, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react'
import Audio from '../organisms/Audio'

const TopPage: React.FC = () => {

  const [filename, setfilename] = useState("");
  const [data, setData] = useState({});
  const [isAudio, setIsAudio] = useState(false)

  const handleDialog = useCallback(() => {
    window.ipc.openFile().then((res) => {
      if (res) {
        setfilename(res.filename);
        setData(JSON.parse(res.content))
      }
    });
  }, []);

  useEffect(() => {
    data && console.log(data)
  }, [data])

  const handleOnAudio = () => {
    setIsAudio(true)
    console.log(isAudio)
  }

  return (
    <Container maxWidth="md">
      <Box m={1}>
        <Button variant="contained" onClick={() => window.ipc.test("Hello, Electron Main World.")}>
          ipcテストメッセージ送信
        </Button>
      </Box>

      <Box m={1}>
        <Typography>{filename}</Typography>
        <Button variant="contained" onClick={handleDialog}>JSON Open</Button>
      </Box>

      <Box m={1}>
        <Button variant="contained" onClick={handleOnAudio}>audio open</Button>
      </Box>
      <Box m={1}>
        {isAudio === false ? (<Typography>not yet</Typography>) : (<Audio />)}
      </Box>
    </Container>
  )
}

export default TopPage;