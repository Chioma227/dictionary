"use client";
import axios from "axios";
import Input from "./Input";
import { useRef } from "react";
import BasicModal from "./modal/Modal";
import React, { useState } from "react";
import DisplayItems from "./DisplayItems";

const Main = () => {
  //states
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [error, setError] = useState({
    title: "",
    message: "",
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
      alert("Enter a word!");
    } else {
      try {
        setLoading(true);
        let userSearch = inputRef.current?.value;
        const resp = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${userSearch}`
        );
        const data = resp.data[0];
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
        if (resp.status === 200) {
          if (data.phonetics && data.phonetics.length > 0) {
            const audioUrl = data.phonetics[0].audio;
            setAudioUrl(audioUrl);
          } else {
            setAudioUrl("");
          }
        } else {
          setAudioUrl("");
        }
        setLoading(false);
        setSearchValue("");
      } catch (error) {
        setLoading(false);
        setSearchValue("");
        setIsModalOpen(true);
        if (error.code === "ERR_NETWORK") {
          setError({
            ...error,
            message: error.message + " !",
          });
        } else if (error.code === "ECONNABORTED") {
          setError({
            ...error,
            message: error.message + " !",
          });
        } else {
          setError({
            ...error,
            title: error.response.data.title,
            message: error.response.data.message,
            resolution: error.response.data.resolution,
          });
        }
      }
    }
  };

  return (
    <>
      <section>
        <Input
          inputRef={inputRef}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          getWord={getWord}
        />
        <DisplayItems loading={loading} displayItems={displayItems} audioUrl={audioUrl} />
        {isModalOpen && (
          <BasicModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            errorTitle={error.title}
            errorMessage={error.message}
            resolution={error.resolution}
          />
        )}
       
      </section>
    </>
  );
};

export default Main;
