"use client";
import { useState } from "react";

const BasicModal = ({
  errorMessage,
  errorTitle,
  resolution,
  isModalOpen,
  setIsModalOpen,
}) => {
  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex items-center justify-center absolute z-50 left-0 right-0 bottom-0 top-0 h-screen w-[100%] modal-bg">
      <section className="border border-gray-400 sm:w-[400px] w-[300px] sm:h-[200px] h-[170px] sm:px-[0] sm:py-[0] px-[11px] py-[11px] bg-gray-300 rounded-lg text-black flex items-center justify-center flex-col">
        <div className="text-center">
          {errorTitle && <h2 className=" font-semibold">{errorTitle}!</h2>}
          {errorMessage && <p className="mt-[20px] text-[15px] mb-[30px]">{errorMessage}</p>}
          
        </div>
        <div className=" flex justify-end items-end">
          <div>
            <button onClick={closeModal}>close</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicModal;
