import { Box, Button, Typography } from '@material-ui/core';
import React, { useCallback, useState } from 'react'

const Audio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  // const [sampleSource, setSampleSource] = useState<AudioBufferSourceNode>()

  var sampleSource = {} as AudioBufferSourceNode

  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  const ctx = new AudioContext();

  const setupSample = async () => {
    const response = await fetch("../../sample.mp3");
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }


  const playSample = (ctx: AudioContext, audioBuffer: AudioBuffer) => {
    sampleSource = ctx.createBufferSource()

    if (!sampleSource) return

    console.log(sampleSource)
    sampleSource.buffer = audioBuffer
    console.log(sampleSource)
    sampleSource.connect(ctx.destination);
    sampleSource.start();

    setIsPlaying(true)
  }


  const handleOnPlay = async () => {
    // if (isPlaying) return

    console.log("handleOnPlay")

    const sample = await setupSample()
    playSample(ctx, sample)
  }


  const handleOnStop = async () => {
    sampleSource.disconnect()
    // await sampleSource?.stop();
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
        <Button onClick={handleOnPlay}>play</Button>
        <Button onClick={handleOnStop}>stop</Button>
      </Box>
    </Box>
  )
}

export default Audio;