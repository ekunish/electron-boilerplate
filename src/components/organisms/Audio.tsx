import { Box, Button, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'

const Audio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sample, setSample] = useState<AudioBuffer>()
  const [Source, setSource] = useState<AudioBufferSourceNode>()

  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  const ctx = new AudioContext();

  const setupSample = async () => {
    const response = await fetch("sample.mp3");
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }


  const playSample = (ctx: AudioContext, audioBuffer: AudioBuffer) => {
    var sampleSource = ctx.createBufferSource()

    if (!sampleSource) return

    sampleSource.buffer = audioBuffer
    sampleSource.connect(ctx.destination);
    sampleSource.start();

    setSource(sampleSource)
  }

  useEffect(() => {
    (async () => {
      var sample = await setupSample();
      setSample(sample)
    })();
  });


  const handleOnPlay = async () => {

    if (isPlaying) {
      console.log("isPlaying is true")
      return
    }

    if (!sample) {
      console.log("sample is not defined")
      return
    }

    playSample(ctx, sample)
    setIsPlaying(true)
  }


  const handleOnStop = () => {
    if (Source === undefined) {
      console.log("sampleSource  is  undefined")
      return
    }

    Source.stop();
    setIsPlaying(false)
  }

  return (

    <Box>
      <Typography>read a file as buffer</Typography>
      <Box>
        <Typography>audio</Typography>
        {/* <Button onClick={handleDialog}>mp3 Open</Button> */}
      </Box>
      <Box>
        <Button variant="contained" onClick={handleOnPlay}>play</Button>
        <> </>
        <Button variant="contained" onClick={handleOnStop}>stop</Button>
      </Box>
    </Box>
  )
}

export default Audio;