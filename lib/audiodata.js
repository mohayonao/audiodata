function isAudioData(obj) {
  return !!(obj && typeof obj.sampleRate === "number" && Array.isArray(obj.channelData));
}

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
  var i;

  if (audioBuffer.copyToChannel) {
    for (i = 0; i < numberOfChannels; i++) {
      audioBuffer.copyToChannel(getChannelData(audiodata, i), i);
    }
  } else {
    for (i = 0; i < numberOfChannels; i++) {
      audioBuffer.getChannelData(i).set(getChannelData(audiodata, i));
    }
  }

  return audioBuffer;
}

function fromAudioBuffer(audioBuffer) {
  var sampleRate = audioBuffer.sampleRate;
  var channelData = new Array(audioBuffer.numberOfChannels);
  var i;

  for (i = 0; i < channelData.length; i++) {
    channelData[i] = audioBuffer.getChannelData(i);
  }

  return {
    sampleRate: sampleRate,
    channelData: channelData,
  };
}

module.exports = {
  isAudioData: isAudioData,
  getSampleRate: getSampleRate,
  getNumberOfChannels: getNumberOfChannels,
  getLength: getLength,
  getDuration: getDuration,
  getChannelData: getChannelData,
  toAudioBuffer: toAudioBuffer,
  fromAudioBuffer: fromAudioBuffer,
};
