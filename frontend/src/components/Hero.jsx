import React from "react";

// do we want like a background image? can use Adobe stock or something maybe
// title and subtitle are a work in progress
const Hero = ({
  title = "Say goodbye to hours of headbanging.",
  subtitle = "Introducing... devDucky! An integrated IDE that does more than code",
}) => {
  return (
    <section className="bg-custom-green py-20 mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-black sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="my-4 text-xl text-white">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
