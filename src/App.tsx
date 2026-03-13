import { useEffect } from "react";
import "./App.css";
import { convertMilliseconds } from "./tools";
import { useTimer } from "./useTimer";

const storageKey = (s: string) => `10-hours/${s}`;
const timeLeft = 36000000;

function formatCountdown(ms: number) {
  const { hours, minutes, seconds } = convertMilliseconds(ms);
  return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function formatTitle(ms: number) {
  const { hours, minutes, seconds } = convertMilliseconds(ms);
  const value = hours || minutes || seconds;
  const units = hours ? "Hours" : minutes ? "Minutes" : "Seconds";
  return `${value} ${units}`;
}

function App() {
  const [timer, setTimer] = useTimer(() => {
    const stored = localStorage.getItem(storageKey("remaining"));
    return stored && !isNaN(Number(stored)) ? Number(stored) : timeLeft;
  });

  useEffect(() => {
    document.title = `${timer ? formatTitle(timer) : "Rejoice"}`;
    localStorage.setItem(storageKey("remaining"), String(timer));
  }, [timer]);

  return (
    <>
      <h1>{timer ? formatCountdown(timer) : "Rejoice"}</h1>
      <button onClick={() => setTimer(timeLeft)}>Reset</button>
    </>
  );
}

export default App;
