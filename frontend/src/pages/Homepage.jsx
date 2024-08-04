import React from "react";
import Hero from "../components/Hero";
import { Boxes } from "../components/background-boxes";
import CenteredParagraph from "../components/CenteredParagraph";
import { CardDemo } from "../components/CardDemo";
import Button from "../components/Button";
import duckBehind from "../assets/duck-behind.jpg"; // Import image
import duckFront from "../assets/duck-front.jpg"; // Import image

const Homepage = () => {
  return (
    <>
      <Hero />
      <div className="h-96 relative w-full overflow-hidden bg-indigo-700 flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full bg-indigo-700 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <Boxes />
        <h1 className="text-3xl text-center text-white relative z-20">
          Have you ever needed a rubber ducky timeout? Spent hours trying to
          work out a single bug?
        </h1>
        <p className="text-center mt-2 text-neutral-300 relative z-20">
          Well, Sir Quacksalot might be for you! Our state-of-the-art IDE is
          connected to a rubber ducky that can talk you through your problems.
        </p>
      </div>
      <div className="bg-custom-green grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 p-4">
        <div className="flex flex-col items-center">
          <img
            src={duckBehind}
            alt="The back of Sir Quacksalot connected to a laptop via a wire."
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
          <figcaption className="mt-2 text-center text-neutral-700 text-sm font-semibold">
            Sir Quacksalot, wired and raring to go!
          </figcaption>
        </div>

        <div className="flex flex-col items-center justify-between p-4">
          <CardDemo />
          <Button link={`/ide`} className="mt-4">
            Try it out now!
          </Button>
        </div>

        <div className="flex flex-col items-center">
          <img
            src={duckFront}
            alt="The front of Sir Quacksalot connected to a laptop via a wire."
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
          <figcaption className="mt-2 text-center text-neutral-700 text-sm font-semibold">
            Sir Quacksalot, front and center, ready to help you debug!
          </figcaption>
        </div>
      </div>
    </>
  );
};

export default Homepage;
