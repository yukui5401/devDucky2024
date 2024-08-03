// grid of StatCards
import React from "react";
import StatCard from "./StatCard";

const CardGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 rounded-sm gap-6 p-6">
      <StatCard>
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="text-gray-600">
          Card content goes here. This is where you can describe the details of
          the card.
        </p>
      </StatCard>
      <StatCard>
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="text-gray-600">
          Card content goes here. This is where you can describe the details of
          the card.
        </p>
      </StatCard>
      <StatCard>
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="text-gray-600">
          Card content goes here. This is where you can describe the details of
          the card.
        </p>
      </StatCard>
      <StatCard>
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="text-gray-600">
          Card content goes here. This is where you can describe the details of
          the card.
        </p>
      </StatCard>
    </div>
  );
};

export default CardGrid;
