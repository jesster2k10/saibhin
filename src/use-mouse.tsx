import { useEffect, useRef, useState } from "react";

type Position = [x: number, y: number];

/**
 * Returns the x-y coordinate of the mouse
 */
function useMousePosition(): Position {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const mouseMoveHandler = (event: Event | MouseEvent) => {
      const mouseEvent = event as MouseEvent;
      setX(mouseEvent.clientX);
      setY(mouseEvent.clientY);
    };
    document.addEventListener("mousemove", mouseMoveHandler);
    return () => document.removeEventListener("mosuemove", mouseMoveHandler);
  }, []);

  return [x, y];
}

enum MouseState {
  /** The mouse is idle and was recently moved */
  IDLE,
  /** The mouse has either exited the page or has been inactive for a while */
  INACTIVE,
  /** The mouse is currently being moved */
  ACTIVE,
}

interface UseMouse {
  /** The current coordinate (x,y) of the mouse */
  position: Position;
  /** The current state of the mouse */
  state: MouseState;
}

interface UseMouseArguments {
  /**
   * (Optional) delay between state transitions.
   * Specify in milliseconds. Defaults to 10s
   */
  stateTransitionDelayMs?: number;
}

/**
 * Returns the current state of the mouse
 * @returns {UseMouse}
 */

function useMouse({
  stateTransitionDelayMs = 1 * 1_000,
}: UseMouseArguments = {}): UseMouse {
  const position = useMousePosition();
  const timer = useRef<NodeJS.Timeout>();
  const [mouseState, setMouseState] = useState(MouseState.INACTIVE);

  useEffect(() => {
    clearTimeout(timer.current);
    setMouseState(MouseState.ACTIVE);
    timer.current = setTimeout(
      () => setMouseState(MouseState.IDLE),
      stateTransitionDelayMs
    );
  }, position);

  useEffect(() => {
    if (mouseState !== MouseState.IDLE) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(
      () => setMouseState(MouseState.INACTIVE),
      stateTransitionDelayMs * 2
    );
  }, [mouseState]);

  useEffect(() => {
    const mouseLeaveHandler = () => setMouseState(MouseState.INACTIVE);
    window.addEventListener("mouseleave", mouseLeaveHandler);
    return () => window.removeEventListener("mouseleave", mouseLeaveHandler);
  }, []);

  return { position, state: mouseState };
}

export { useMousePosition, useMouse, MouseState };
