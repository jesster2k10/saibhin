"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useDelayedEffect } from "./use-delay";
import {
  IoPlayCircleOutline,
  IoPlaySkipForwardCircleOutline,
  IoPlaySkipBackCircleOutline,
  IoPauseCircleOutline,
} from "react-icons/io5";
import clsx from "clsx";

interface AlbumTitleProps {
  animationDelayMs?: number;
  transitionDurationMs?: number;
  trackList: string[];
  albumTitle: string;
}

const AlbumTitle: React.FC<AlbumTitleProps> = ({
  albumTitle,
  animationDelayMs = 3500,
  transitionDurationMs = 2000,
  trackList = [],
}) => {
  const [primary, ...secondary] = albumTitle.split(" ");
  const [trackIndex, setTrackIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentTrackRef = useRef<HTMLLIElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  const interval = useRef<NodeJS.Timeout>();
  const tracks = [secondary.join(""), ...trackList];

  const backtrack = () => {
    setTrackIndex((previousIndex) => {
      const newIndex = previousIndex - 1;
      return Math.max(newIndex, 0);
    });
  };

  const advance = () => {
    setTrackIndex((previousIndex) => {
      const newIndex = previousIndex + 1;
      if (newIndex > trackList.length) return 0;
      return newIndex;
    });
  };

  useEffect(() => {
    clearInterval(interval.current);
    if (!isAnimating) return;
    interval.current = setInterval(advance, transitionDurationMs);
  }, [isAnimating]);

  useDelayedEffect(() => {
    // setIsAnimating(true);
  }, animationDelayMs);

  useEffect(() => {
    if (currentTrackRef.current) {
      setTrackWidth(currentTrackRef.current.offsetWidth);
    }
  }, [trackIndex]);

  const trackVariants: Variants = {
    initial: (direction) => ({
      opacity: 0,
      y: direction > 0 ? 50 : -50,
      rotateX: direction > 0 ? -90 : 90,
    }),
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5 },
    },
    exit: (direction) => ({
      opacity: 0,
      y: direction > 0 ? -50 : 50,
      rotateX: direction > 0 ? 90 : -90,
      transition: { duration: 0.5 },
    }),
  };

  const averageTrackWidth = useMemo<number>(() => {
    let sum = 0;
    for (let track of tracks) {
      const words = track.split(" ");
      const charSize = 8;
      const wordSize = words
        .map((word) => word.length * charSize)
        .reduce((i, c) => i + c, 0);
      sum += wordSize + words.length * (charSize * charSize);
    }
    return sum / tracks.length;
  }, [tracks]);

  return (
    <div className="group space-y-4">
      <motion.h1
        className="flex text-4xl sm:text-5xl lowercase font-oswald"
        initial={{ x: -trackWidth / 2 }}
        animate={{ x: -trackWidth / 2 }}
        transition={{ duration: 0.5 }}
      >
        {primary}
        <motion.ul className="w-max ml-2 sm:ml-4 font-orator uppercase overflow-hidden">
          <AnimatePresence initial={false} custom={1}>
            <motion.li
              ref={currentTrackRef}
              key={trackIndex}
              custom={1}
              variants={trackVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ minWidth: averageTrackWidth }}
              className="absolute w-max text-left whitespace-nowrap space-x-3 overflow-hidden text-overflow-ellipsis"
            >
              {tracks[trackIndex].split(" ").map((word) => (
                <span key={word}>{word}</span>
              ))}
            </motion.li>
          </AnimatePresence>
        </motion.ul>
      </motion.h1>
      <div
        className={clsx(
          "transition-all ease-in-out duration-150 flex justify-center items-center space-x-2",
          isAnimating ? "group-hover:opacity-100 opacity-0" : "opacity-100"
        )}
      >
        <button
          onClick={() => {
            clearInterval(interval.current);
            backtrack();
          }}
        >
          <IoPlaySkipBackCircleOutline size={25} />
        </button>
        <button onClick={() => setIsAnimating((previous) => !previous)}>
          {!isAnimating ? (
            <IoPlayCircleOutline size={25} />
          ) : (
            <IoPauseCircleOutline size={25} />
          )}
        </button>
        <button
          onClick={() => {
            clearInterval(interval.current);
            advance();
          }}
        >
          <IoPlaySkipForwardCircleOutline size={25} />
        </button>
      </div>
    </div>
  );
};

export { AlbumTitle };
