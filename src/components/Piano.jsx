import { useEffect, useRef, useState } from "react";
import { notes } from "../utils/notes";
import Keyboard from "./Keyboard";

export default function Piano() {
  const [activeNote, setActiveNote] = useState(null);
  const audioCtx = useRef(null);
  const activeOscillators = useRef({});

  const startNote = (noteName, freq) => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    if (activeOscillators.current[noteName]) return;

    const oscillator = audioCtx.current.createOscillator();
    const gainNode = audioCtx.current.createGain();

    oscillator.type = "sine"; // "square", "triangle", "sawtooth" su opcije
    oscillator.frequency.value = freq;

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.current.destination);

    gainNode.gain.setValueAtTime(0.2, audioCtx.current.currentTime);
    oscillator.start();

    activeOscillators.current[noteName] = { oscillator, gainNode };
  };

  const stopNote = (noteName) => {
    const active = activeOscillators.current[noteName];
    if (active) {
      active.gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioCtx.current.currentTime + 0.05
      );
      active.oscillator.stop(audioCtx.current.currentTime + 0.05);
      delete activeOscillators.current[noteName];
    }
  };

  // Miš klik
  const handleMouseDown = (note) => {
    setActiveNote(note.name);
    startNote(note.name, note.freq);
  };

  const handleMouseUp = (note) => {
    setActiveNote(null);
    stopNote(note.name);
  };

  // Tastatura
  useEffect(() => {
    const handleKeyDown = (e) => {
      const note = notes.find((n) => n.key === e.key.toLowerCase());
      if (note) {
        setActiveNote(note.name);
        startNote(note.name, note.freq);
      }
    };

    const handleKeyUp = (e) => {
      const note = notes.find((n) => n.key === e.key.toLowerCase());
      if (note) {
        setActiveNote(null);
        stopNote(note.name);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <Keyboard
      notes={notes}
      handleMouseDown={handleMouseDown}
      handleMouseUp={handleMouseUp}
      activeNote={activeNote}
    />
  );
}
