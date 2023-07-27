"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import Loader from "./loader/Loader";

const Main = () => {
  //states

  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({
    message: "",
    title: "",
    resolution: "",
  });
  const [displayItems, setDisplayItems] = useState({
    name: "",
    definitionOne: "",
    definitionTwo: "",
    definitionThree: "",
    exampleOne: "",
    exampleTwo: "",
    exampleThree: "",
    synonyms: [""],
    partOfSpeech: "",
    pronunciation: "",
  });

  let inputRef = useRef();

  //getword function

  const getWord = async () => {
    if (inputRef.current?.value === "") {
      console.log("empty");
    } else {
      try {
        setLoading(true);
        let userSearch = inputRef.current?.value;
        const resp = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${userSearch}`
        );
        const data = resp.data[0];
        console.log(data);
        setDisplayItems({
          ...displayItems,
          name: data?.word,
          definitionOne: data?.meanings[1]?.definitions[0]?.definition,
          definitionTwo: data?.meanings[0]?.definitions[0]?.definition,
          definitionThree: data?.meanings[2]?.definitions[0]?.definition,
          exampleOne: data?.meanings[0]?.definitions[0]?.example,
          exampleTwo: data?.meanings[0]?.definitions[1]?.example,
          exampleThree: data?.meanings[0]?.definitions[2]?.example,
          partOfSpeech: data?.meanings[0]?.partOfSpeech,
          pronunciation: data?.phonetic,
        });
        setLoading(false);
        setSearchValue("");
      } catch (error) {
        setLoading(false);
        setIsError(true);
        setError({
          ...error,
          title: error.response.data.title,
          message: error.response.data.message,
          resolution: error.response.data.resolution,
        });
        console.log(error);
      }
    }
  };

  return (
    <>
      <section>
        <main className="mt-[30px]">
          <div className="mb-[30px] md:px-[8rem] px-[2rem] text-[19px] ">
            <h2 className=" font-mono">
              Search<span className=" text-gray-500 text-[30px]">It</span>
            </h2>
          </div>
          <section className="flex justify-center">
            <div className=" relative sm:w-[400px] w-[260px]  text-gray-400 border rounded-md shadow-sm shadow-slate-50">
              <input
                className=" outline-none indent-2 py-[6px] px-[3px] text-black rounded-md sm:w-[330px] w-[190px]"
                type="text"
                value={searchValue}
                ref={inputRef}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="enter word to search..."
              />
              <button
                onClick={getWord}
                className="absolute left-auto right-[5px] top-0 bottom-0 rounded-md"
              >
                search
              </button>
            </div>
          </section>
        </main>

        {/* {isError ? (
          <div>error</div>
        ) : ( */}
        <section className="mt-[50px] lg:px-[14rem] md:px-[7rem] sm:px-[3rem] px-[30px]">
          {loading ? (
            <Loader />
          ) : (
            <div>
              <div className="mb-[20px]">
                {displayItems.name && (
                  <h2 className="text-[30px]"> Word: {displayItems.name};</h2>
                )}
                {displayItems.partOfSpeech && (
                  <p className="text-[20px] ">
                    Part of speech: {displayItems.partOfSpeech}
                  </p>
                )}
              </div>
              {displayItems.pronunciation && (
                <p className="mb-[20px]">
                  Pronounciation: {displayItems.pronunciation}
                </p>
              )}
              <p>{displayItems.definitionOne}</p>
              <small>{displayItems.exampleOne}</small>
              {displayItems.definitionTwo && (
                <p>{displayItems.definitionTwo}</p>
              )}
              {displayItems.exampleTwo && (
                <small>{displayItems.exampleTwo}</small>
              )}
              {displayItems.definitionThree && (
                <p>{displayItems.definitionThree}</p>
              )}
              {displayItems.exampleThree && (
                <small>{displayItems.exampleThree}</small>
              )}
            </div>
          )}
        </section>
        {/* )} */}
      </section>
    </>
  );
};

export default Main;
