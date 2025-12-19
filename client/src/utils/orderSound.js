import * as Tone from "tone";

let synth = null;

export const initSound = async () => {
  await Tone.start();
  console.log("🔊 Audio Enabled");
  synth = new Tone.Synth().toDestination();
};

export const playOrderSound = async () => {
  if (!synth) {
    await Tone.start();
    synth = new Tone.Synth().toDestination();
  }

  synth.triggerAttackRelease("C5", "8n");
};
