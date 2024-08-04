import React from "react";
import Hero from "../components/Hero";
import { Boxes } from "../components/background-boxes";
import CenteredParagraph from "../components/CenteredParagraph";
import { CardDemo } from "../components/CardDemo";
import Button from "../components/Button";

const Homepage = () => {
  return (
    <>
      <Hero />
      <div className="h-96 relative w-full overflow-hidden bg-indigo-700 flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full bg-indigo-700 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <Boxes />
        <h1 className="md:text-4xl text-xl text-white relative z-20">
          Have you ever needed a rubber ducky timeout? Spent hours trying to
          work out a single bug?
        </h1>
        <p className="text-center mt-2 text-neutral-300 relative z-20">
          Well, devDucky might be for you! Our state of the art IDE is connected
          to a rubber ducky that can talk you through your problems.
        </p>
      </div>
      <CardDemo />
      <Button link={`/dashboard`}>Try it out now!</Button>
    </>
  );
};

export default Homepage;
