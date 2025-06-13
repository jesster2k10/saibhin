/**
 * Created by Jesse Onolememen. 01/01/2021
 */

"use client";

import { Box, BoxProps, Image } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

type SourceType = "webm" | "mp4";

type Source = {
  breakpoint: string;
  type: SourceType;
  src: string;
};

interface BackgroundVideoProps extends BoxProps {
  hasOverlay?: boolean;
  placeholderSrc?: string;
  overlayBgColor?: string;
  overlayOpacity?: number;
  progressive?: boolean;
  sources: Source[];
}

const BackgroundVideo = ({
  sources = [],
  placeholderSrc,
  hasOverlay = true,
  overlayOpacity = 0.5,
  overlayBgColor,
  progressive = true,
  ...props
}: BackgroundVideoProps) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoSuspended, setVideoSuspended] = useState(false);

  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    video.current?.load();
  }, [sources]);

  const onLoadVideo = () => {
    setVideoLoaded(true);
  };

  useEffect(() => {
    setVideoLoaded(false);
  }, [sources]);

  return (
    <Box
      position="absolute"
      left={0}
      right={0}
      top={0}
      bottom={0}
      zIndex={-10}
      background="blackAlpha.800"
    >
      {hasOverlay && (
        <Box
          bg={overlayBgColor || `rgba(0, 0, 0, ${overlayOpacity})`}
          left={0}
          right={0}
          opacity={overlayBgColor ? overlayOpacity : "100%"}
          top={0}
          bottom={0}
          position="absolute"
          objectFit="cover"
          zIndex={1}
          pointerEvents="none"
        />
      )}
      {placeholderSrc && progressive && !videoSuspended && (
        <Image
          left={0}
          right={0}
          top={0}
          bottom={0}
          height="100%"
          width="100%"
          position="absolute"
          objectFit="cover"
          src={placeholderSrc}
          filter="blur(20px)"
          transform="scale(1.1)"
          transition="all ease 0.3s"
          opacity={videoLoaded ? 0 : 1}
          pointerEvents="none"
          alt="placeholder"
        />
      )}
      <Box
        {...props}
        as="video"
        objectFit="cover"
        width="100%"
        height="100%"
        autoPlay
        muted
        playsInline
        controls={false}
        loop
        ref={video}
        onLoadedData={onLoadVideo}
        onSuspend={() => setVideoSuspended(true)}
        opacity={!videoLoaded ? 0 : 1}
        transition="all ease-in-out 0.3s"
      >
        {/* {Object.entries(responsiveConfig).map(
          ([extension, { resolutions, breakpoints }]) => (
            <Fragment key={extension}>
              {resolutions.map((resolution, index) => (
                <source
                  src={getSource(resolution, extension as Extension)}
                  type={`video/${extension}`}
                  media={breakpoints[index]}
                  key={getSource(resolution, extension as Extension)}
                />
              ))}
            </Fragment>
          )
        )} */}
        {sources.map((source) => (
          <source
            src={source.src}
            key={source.src}
            media={source.breakpoint}
            type={`video/${source.type}`}
          />
        ))}
      </Box>
    </Box>
  );
};

export { BackgroundVideo };
