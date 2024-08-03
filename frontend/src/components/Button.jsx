import React from "react";
import { Link } from "react-router-dom";

const Button = ({ link, children }) => {
  return (
    <section className="m-auto max-w-lg my-10 px-6">
      <Link
        to={link}
        className="block bg-indigo-700 hover:bg-gray-900 text-white text-center hover:text-white rounded-xl px-3 py-2"
      >
        {children}
      </Link>
    </section>
  );
};

export default Button;
