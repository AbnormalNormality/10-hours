import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from "react";

/**
 * @param initial - The starting time in milliseconds.
 */
export function useTimer(
  initial: number | (() => number),
): [number, Dispatch<SetStateAction<number>>] {
  const [time, setTime] = useState(initial);
  const last = useRef<number>(undefined);

  useEffect(() => {
    let frame: number;

    function update(now: number) {
      if (last.current !== undefined) {
        const delta = now - last.current;
        setTime((t) => Math.max(0, t - delta));
      }

      last.current = now;
      frame = requestAnimationFrame(update);
    }

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  return [time, setTime];
}
