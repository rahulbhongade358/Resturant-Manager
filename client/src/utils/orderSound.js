import * as Tone from "tone";

let synth;

export const initSound = async () => {
  await Tone.start();
  synth = new Tone.Synth().toDestination();
};

export const playOrderSound = () => {
  if (!synth) return;

  synth.triggerAttackRelease("C5", "8n");
};
