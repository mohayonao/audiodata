var assert = require("power-assert");
var AudioData = require("../lib/audiodata");

describe("AudioData", function() {
  var audiodata = {
    sampleRate: 44100,
    channelData: [
      new Float32Array([ 0, 1, 2, 3, 4 ]),
      new Float32Array([ 5, 6, 7, 8, 9 ]),
    ],
  };
  describe(".isAudioData(obj: any): boolean", function() {
    it("should return true if obj is implemented AudioData interface", function() {
      assert(AudioData.isAudioData(audiodata) === true);
      assert(AudioData.isAudioData(null) === false);
      assert(AudioData.isAudioData({ sampleRate: 44100 }) === false);
    });
  });
  describe(".getSampleRate(audiodata: AudioData): number", function() {
    it("should return sampleRate", function() {
      assert(AudioData.getSampleRate(audiodata) === 44100);
    });
  });
  describe(".getNumberOfChannels(audiodata: AudioData): number", function() {
    it("should return numberOfChannels", function() {
      assert(AudioData.getNumberOfChannels(audiodata) === 2);
    });
  });
  describe(".getLength(audiodata: AudioData): number", function() {
    it("should return length", function() {
      assert(AudioData.getLength(audiodata) === 5);
    });
  });
  describe(".getDuration(audiodata: AudioData): number", function() {
    it("should return duration", function() {
      assert(AudioData.getDuration(audiodata) === 5 / 44100);
    });
  });
  describe(".getChannelData(audiodata: AudioData, channels: number): Float32Array", function() {
    it("should return channelData[channels]", function() {
      assert(AudioData.getChannelData(audiodata, 0) === audiodata.channelData[0]);
      assert(AudioData.getChannelData(audiodata, 1) === audiodata.channelData[1]);
    });
  });
  describe(".toAudioBuffer(audiodata: AudioData, audioContext: AudioContext): AudioBuffer", function() {
    it("should return AudioBuffer", function() {
      var audioContext = new global.AudioContext();
      var audioBuffer = AudioData.toAudioBuffer(audiodata, audioContext);

      assert(audioBuffer instanceof global.AudioBuffer);
      assert(audioBuffer.sampleRate === 44100);
      assert(audioBuffer.length === 5);
      assert.deepEqual(audioBuffer.getChannelData(0), audiodata.channelData[0]);
      assert.deepEqual(audioBuffer.getChannelData(1), audiodata.channelData[1]);
    });
  });
  describe(".fromAudioBuffer(audioBuffer: AudioBuffer): AudioData", function() {
    it("should return AudioData", function() {
      var audioContext = new global.AudioContext();
      var audioBuffer = audioContext.createBuffer(2, 5, 44100);

      audioBuffer.getChannelData(0).set([ 0, 1, 2, 3, 4 ]);
      audioBuffer.getChannelData(1).set([ 5, 6, 7, 8, 9 ]);

      var audiodata = AudioData.fromAudioBuffer(audioBuffer);

      assert(audiodata.sampleRate === 44100);
      assert.deepEqual(audiodata.channelData[0], audioBuffer.getChannelData(0));
      assert.deepEqual(audiodata.channelData[1], audioBuffer.getChannelData(1));
    });
  });
});
