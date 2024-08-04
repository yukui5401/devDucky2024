"use client";
import { animate, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export function CardDemo() {
  return (
    <Card>
      <CardSkeletonContainer>
        <Skeleton />
      </CardSkeletonContainer>
      <CardTitle>Our tech stack</CardTitle>
      <CardDescription>
        From Unsloth to Express.js, our application uses a variety of languages
        to deliver the best user experience possible.
      </CardDescription>
    </Card>
  );
}

const Skeleton = () => {
  const scale = [1, 1.1, 1];
  const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
  const sequence = [
    [
      ".circle-1",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-2",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-3",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-4",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-5",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
  ];

  useEffect(() => {
    // @ts-ignore
    animate(sequence, {
      repeat: Infinity,
      repeatDelay: 1,
    });
  }, []);
  return (
    <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
      <div className="flex flex-row flex-shrink-0 justify-center items-center gap-2">
        <Container className="h-8 w-8 circle-1">
          <MongoDBLogo className="h-4 w-4 " />
        </Container>
        <Container className="h-12 w-12 circle-2">
          <UnslothLogo className="h-6 w-6 dark:text-white" />
        </Container>
        <Container className="circle-3">
          <ReactLogo className="h-8 w-8 dark:text-white" />
        </Container>
        <Container className="h-12 w-12 circle-4">
          <NodeLogo className="h-6 w-6 " />
        </Container>
        <Container className="h-8 w-8 circle-5">
          <OllamaLogo className="h-4 w-4 " />
        </Container>
      </div>

      <div className="h-40 w-px absolute top-20 m-auto z-40 bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move">
        <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
          <Sparkles />
        </div>
      </div>
    </div>
  );
};
const Sparkles = () => {
  const randomMove = () => Math.random() * 2 - 1;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 2 + 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-black dark:bg-white"
        ></motion.span>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "max-w-sm w-full mx-auto p-8 rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-gray-800 dark:text-white py-2",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-sm font-normal text-neutral-600 dark:text-neutral-400 max-w-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

export const CardSkeletonContainer = ({
  className,
  children,
  showGradient = true,
}: {
  className?: string;
  children: React.ReactNode;
  showGradient?: boolean;
}) => {
  return (
    <div
      className={cn(
        "h-[15rem] md:h-[20rem] rounded-xl z-40",
        className,
        showGradient &&
          "bg-neutral-300 dark:bg-[rgba(40,40,40,0.70)] [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]"
      )}
    >
      {children}
    </div>
  );
};

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        `h-16 w-16 rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)]
    shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]
    `,
        className
      )}
    >
      {children}
    </div>
  );
};

export const MongoDBLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="512" cy="512" r="512" style={{ fill: "#13aa52" }} />
      <path
        d="M648.86 449.44c-32.34-142.73-108.77-189.66-117-207.59-9-12.65-18.12-35.15-18.12-35.15-.15-.38-.39-1.05-.67-1.7-.93 12.65-1.41 17.53-13.37 30.29-18.52 14.48-113.54 94.21-121.27 256.37-7.21 151.24 109.25 241.36 125 252.85l1.79 1.27v-.11c.1.76 5 36 8.44 73.34H526a726.68 726.68 0 0 1 13-78.53l1-.65a204.48 204.48 0 0 0 20.11-16.45l.72-.65c33.48-30.93 93.67-102.47 93.08-216.53a347.07 347.07 0 0 0-5.05-56.76zM512.35 659.12s0-212.12 7-212.08c5.46 0 12.53 273.61 12.53 273.61-9.72-1.17-19.53-45.03-19.53-61.53z"
        style={{ fill: "#fff" }}
      />
    </svg>
  );
};

export const UnslothLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="222.000000pt"
      height="227.000000pt"
      viewBox="0 0 222.000000 227.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,227.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M1120 1910 c-30 -11 -77 -19 -104 -20 -240 -1 -489 -194 -582 -450
-33 -93 -54 -200 -54 -281 0 -62 2 -69 20 -69 11 0 20 4 20 8 0 5 6 17 14 28
14 17 14 16 11 -21 -10 -102 30 -310 62 -322 23 -9 48 11 49 38 2 51 4 57 20
63 24 9 47 -16 68 -74 28 -78 46 -81 110 -20 29 27 60 50 68 50 23 0 45 -30
76 -106 37 -89 51 -92 128 -23 100 87 118 86 148 -8 22 -67 38 -81 73 -62 14
8 40 29 57 46 22 24 38 32 61 32 16 -1 66 12 110 28 79 29 80 30 101 81 26 66
34 73 34 34 0 -36 16 -50 36 -31 21 21 73 181 84 257 46 315 -98 607 -360 731
-36 17 -71 31 -77 31 -18 0 -16 17 3 28 9 5 14 18 12 28 -5 28 -114 31 -188 4z
m-115 -322 c-8 -36 -8 -36 -6 -60 1 -25 43 -23 66 2 29 32 40 24 41 -29 4
-111 65 -122 90 -16 9 38 33 88 47 97 6 4 30 -10 52 -31 22 -21 75 -60 116
-88 57 -39 81 -62 100 -99 26 -48 44 -104 35 -104 -3 0 -27 13 -54 29 -71 42
-114 55 -154 47 -97 -18 -137 -123 -78 -205 13 -19 38 -34 77 -46 32 -10 78
-27 102 -37 l44 -19 -32 -33 c-109 -113 -327 -151 -509 -90 -105 35 -172 75
-229 138 -73 80 -117 176 -80 176 6 0 52 -5 101 -10 97 -10 120 -4 164 43 30
32 34 101 9 141 -36 54 -72 68 -169 64 -49 -3 -88 -2 -88 1 0 13 47 59 86 85
28 18 68 31 125 40 46 8 95 19 109 24 39 16 42 14 35 -20z m-167 -214 c29 -20
29 -54 0 -54 -12 0 -32 -10 -46 -22 -23 -23 -24 -23 -38 -4 -19 26 -18 39 7
70 23 30 45 33 77 10z m543 -114 c24 -13 25 -49 2 -56 -10 -3 -25 -10 -33 -15
-34 -21 -43 -22 -56 -4 -18 24 -18 28 7 59 22 28 48 33 80 16z"
        />
        <path
          d="M1016 1248 c-21 -30 -20 -54 4 -78 27 -27 64 -25 88 5 34 43 7 94
-50 95 -17 0 -33 -8 -42 -22z"
        />
        <path
          d="M890 1145 c0 -33 32 -77 66 -91 19 -8 39 -12 44 -9 5 3 26 -1 46 -10
20 -8 46 -15 57 -15 29 0 87 41 87 62 0 29 -17 29 -49 2 -35 -29 -84 -27 -79
2 2 9 -5 21 -14 27 -13 9 -20 6 -35 -10 -24 -28 -60 -15 -74 27 -12 32 -49 43
-49 15z"
        />
        <path
          d="M2008 766 c3 -5 -5 -7 -16 -4 -12 4 -25 2 -28 -3 -3 -5 -15 -9 -27
-10 -12 0 -16 -3 -9 -6 19 -8 14 -23 -8 -23 -21 0 -204 -109 -196 -117 2 -3
53 21 113 53 59 32 128 68 153 81 58 31 68 41 37 40 -14 -1 -23 -6 -19 -11z"
        />
      </g>
    </svg>
  );
};

export const ReactLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-11.5 -10.23174 23 20.46348"
    >
      <title>React Logo</title>
      <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" stroke-width="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
};
export const NodeLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="128.000000pt"
      height="128.000000pt"
      viewBox="0 0 128.000000 128.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,128.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M450 1045 c-96 -57 -186 -109 -200 -115 -59 -26 -57 -19 -56 -289 1
-265 3 -273 51 -285 14 -4 25 -10 25 -15 0 -15 65 -51 91 -51 44 0 96 20 123
47 l26 26 -2 231 -3 231 -25 0 -25 0 -3 -214 c-3 -236 -5 -243 -64 -256 -24
-6 -40 0 -84 29 l-54 36 0 200 c1 110 -2 205 -5 210 -6 9 37 60 50 60 5 0 84
43 177 96 l169 96 187 -109 187 -109 0 -224 0 -224 -187 -109 -187 -109 -51
28 c-40 22 -55 26 -68 17 -9 -5 -17 -16 -17 -24 0 -15 87 -76 122 -85 16 -4
80 27 240 119 l218 124 0 263 0 263 -215 123 c-118 68 -222 124 -230 124 -8 0
-94 -47 -190 -105z"
        />
        <path
          d="M684 816 c-45 -20 -74 -62 -74 -108 0 -59 37 -90 142 -122 47 -15 93
-35 102 -45 37 -41 -3 -81 -81 -81 -57 0 -90 17 -102 52 -14 40 -54 37 -59 -5
-16 -134 290 -155 324 -23 18 73 -29 124 -148 160 -113 34 -141 62 -100 99 25
23 83 30 131 17 33 -9 45 -18 53 -41 8 -25 15 -30 37 -27 57 7 26 95 -45 124
-42 18 -139 17 -180 0z"
        />
      </g>
    </svg>
  );
};

export const OllamaLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="866.000000pt"
      height="650.000000pt"
      viewBox="0 0 866.000000 650.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,650.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M2995 6179 c-214 -89 -363 -382 -406 -798 -15 -141 -6 -491 16 -611
   8 -47 15 -90 15 -96 0 -6 -30 -35 -66 -64 -113 -91 -245 -263 -323 -418 -47
   -94 -97 -253 -117 -371 -24 -149 -16 -380 19 -512 32 -122 73 -219 132 -315
   l47 -75 -40 -82 c-201 -417 -187 -1048 31 -1407 37 -60 39 -67 27 -95 -47
   -116 -94 -265 -116 -368 -43 -205 -44 -476 -3 -629 l10 -38 179 0 c99 0 180 2
   180 5 0 3 -8 22 -19 43 -35 70 -46 141 -45 292 2 222 44 399 145 605 40 84 49
   111 49 156 0 53 -3 58 -60 125 -74 88 -115 169 -146 292 -86 340 -31 753 128
   966 47 63 53 75 56 130 4 66 -5 85 -98 201 -56 71 -94 146 -126 250 -25 82
   -27 104 -27 245 0 126 4 169 21 232 52 190 147 352 280 480 91 87 185 145 298
   185 75 26 88 28 249 28 211 0 220 4 281 117 97 179 216 292 407 384 137 66
   195 79 357 79 133 0 152 -2 230 -29 244 -81 429 -231 533 -431 61 -117 69
   -120 287 -120 165 -1 179 -2 250 -28 271 -99 485 -348 572 -665 32 -116 32
   -346 0 -457 -29 -102 -80 -206 -131 -270 -126 -156 -134 -209 -52 -320 59 -79
   78 -114 110 -210 126 -377 72 -843 -123 -1063 -55 -62 -56 -65 -56 -122 0 -51
   7 -73 50 -159 146 -293 189 -653 104 -878 l-23 -63 179 0 179 0 10 38 c24 90
   33 194 28 337 -7 219 -44 399 -124 599 -34 86 -35 91 -19 115 75 117 134 272
   168 444 19 95 22 145 22 322 0 293 -33 460 -131 666 l-45 96 55 91 c60 99 104
   211 133 337 15 64 19 118 18 275 0 185 -2 201 -31 310 -72 271 -229 528 -416
   679 -37 30 -67 58 -67 63 0 4 8 52 17 106 13 74 17 158 18 357 0 301 -17 426
   -83 621 -70 204 -177 351 -301 411 -49 25 -68 28 -151 28 -84 0 -101 -3 -148
   -27 -117 -61 -195 -150 -273 -313 -60 -125 -93 -239 -126 -430 -14 -82 -26
   -151 -27 -153 -2 -1 -45 20 -97 47 -178 93 -337 133 -529 135 -202 1 -366 -39
   -549 -135 -52 -27 -96 -47 -98 -45 -2 2 -10 48 -18 102 -61 410 -201 685 -400
   787 -81 41 -203 48 -280 16z m170 -351 c45 -49 105 -174 134 -280 38 -136 52
   -239 58 -414 l6 -170 -27 -41 -27 -40 -104 -7 c-57 -4 -139 -16 -182 -26 -43
   -10 -81 -15 -85 -11 -12 11 -28 185 -28 304 0 239 44 469 120 617 22 42 77
   110 90 110 4 0 25 -19 45 -42z m2415 5 c123 -140 193 -522 161 -872 -6 -69
   -13 -126 -15 -128 -2 -2 -41 6 -87 16 -46 11 -130 23 -186 27 l-102 7 -26 38
   c-23 36 -25 46 -25 163 0 233 45 466 119 622 35 74 102 164 121 164 4 0 23
   -17 40 -37z"
        />
        <path
          d="M4195 3719 c-356 -48 -647 -262 -746 -549 -17 -48 -24 -95 -27 -180
   -4 -105 -2 -123 23 -195 14 -44 36 -96 47 -115 112 -188 304 -317 538 -361
   101 -19 527 -16 616 4 274 62 475 221 561 445 35 90 43 256 18 352 -74 286
   -341 516 -676 584 -98 19 -267 27 -354 15z m354 -249 c136 -38 217 -85 312
   -179 93 -93 128 -153 149 -254 33 -163 -68 -341 -247 -430 -133 -68 -160 -72
   -438 -72 -248 0 -251 0 -330 28 -102 36 -150 64 -223 131 -98 91 -144 218
   -123 337 39 222 259 407 548 459 78 14 268 3 352 -20z"
        />
        <path
          d="M4150 3170 c-49 -49 -33 -114 42 -168 39 -27 48 -39 44 -56 -3 -12
   -8 -43 -11 -71 -6 -42 -3 -54 15 -77 19 -25 28 -28 80 -28 95 0 114 29 96 146
   l-8 52 47 33 c78 56 93 106 49 158 -21 25 -33 31 -65 31 -22 0 -57 -9 -77 -19
   -36 -19 -38 -19 -72 0 -48 25 -114 25 -140 -1z"
        />
        <path
          d="M3160 3680 c-103 -19 -182 -113 -196 -232 -12 -107 73 -212 183 -224
   77 -10 115 2 168 48 160 141 110 384 -85 410 -19 3 -51 2 -70 -2z"
        />
        <path
          d="M5365 3663 c-77 -40 -115 -103 -115 -190 1 -99 57 -190 144 -235 32
   -17 52 -19 104 -15 79 6 135 41 172 107 59 108 4 271 -112 331 -47 24 -150 25
   -193 2z"
        />
      </g>
    </svg>
  );
};
