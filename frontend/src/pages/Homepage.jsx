import React from "react";
import Hero from "../components/Hero";
import CenteredParagraph from "../components/CenteredParagraph";
import Button from "../components/Button";

const Homepage = () => {
  return (
    <>
      <Hero />
      <CenteredParagraph>
        Have you ever needed a rubber ducky timeout? Spent hours trying to work
        out a single bug? Well, DevDucky might be for you! Our state of the art
        IDE is connected to a rubber ducky that can talk you through your
        problems.
      </CenteredParagraph>
      <Button>Try it out now!</Button>
    </>
  );
};

export default Homepage;
