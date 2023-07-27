"use client";
import React from "react";
import { useState } from "react";

const Footer = () => {
  const [name, setName] = useState("OmAhcOdes</>");
  return (
    <footer className="bg-gray-400 absolute bottom-0 w-full">
      <div className="mx-auto max-w-screen-xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-gray-700 font-semibold sm:justify-start">
            <h2>{name}</h2>
          </div>
          <p className="mt-2 text-center text-sm text-gray-700 lg:mt-0 lg:text-right">
            Copyright &copy; 2023. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
