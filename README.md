# audiodata
[![Build Status](http://img.shields.io/travis/mohayonao/audiodata.svg?style=flat-square)](https://travis-ci.org/mohayonao/audiodata)
[![NPM Version](http://img.shields.io/npm/v/audiodata.svg?style=flat-square)](https://www.npmjs.org/package/audiodata)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

> definition of audio data interface

## Definition

```js
interface AudioData {
  sampleRate: number;
  channelData: Float32Array[];
}
```

## Utilities

```js
function getSampleRate(audiodata) {
  return audiodata.sampleRate;
}

function getNumberOfChannels(audiodata) {
  return audiodata.channelData.length;
}

function getLength(audiodata) {
  return audiodata.channelData[0].length;
}

function getDuration(audiodata) {
  return audiodata.channelData[0].length / audiodata.sampleRate;
}

function getChannelData(audiodata, channels) {
  return audiodata.channelData[channels];
}

function toAudioBuffer(audiodata, audioContext) {
  var numberOfChannels = getNumberOfChannels(audiodata);
  var length = getLength(audiodata);
  var sampleRate = getSampleRate(audiodata);
  var audioBuffer = audioContext.createBuffer(numberOfChannels, length, sampleRate);

  for (var i = 0; i < numberOfChannels; i++) {
    audioBuffer.getChannelData(i).set(getChannelData(audiodata, i));
  }

  return audioBuffer;
}

function fromAudioBuffer(audioBuffer) {
  var sampleRate = audioBuffer.sampleRate;
  var channelData = new Array(audioBuffer.numberOfChannels);

  for (var i = 0; i < channelData.length; i++) {
    channelData[i] = audioBuffer.getChannelData(i);
  }

  return {
    sampleRate: sampleRate,
    channelData: channelData
  };
}
```

## License
MIT
