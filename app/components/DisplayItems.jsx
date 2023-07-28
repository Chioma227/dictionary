import React from "react";
import Loader from "./loader/Loader";
import Audio from "./Audio";

const DisplayItems = ({ displayItems, loading, audioUrl }) => {
  return (
    <div>
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
              <section className="sm:flex block items-center gap-4 justify-start mb-[20px]">
                <p className="">
                  Pronounciation: <i>{displayItems.pronunciation}</i>
                </p>
                <div>
                  {audioUrl && (
                    <Audio style={{ width: "90px" }} audioUrl={audioUrl} />
                  )}
                </div>
              </section>
            )}

            {displayItems.definitionOne && (
              <p>- {displayItems.definitionOne}</p>
            )}
            {displayItems.exampleOne && (
              <small className="ml-[9px]">
                e.g:
                <i> {displayItems.exampleOne}</i>
              </small>
            )}
            {displayItems.definitionTwo && (
              <p className="mt-[10px]">- {displayItems.definitionTwo}</p>
            )}
            {displayItems.exampleTwo && (
              <small className="ml-[9px]">
                e.g:
                <i> {displayItems.exampleTwo}</i>
              </small>
            )}
            {displayItems.definitionThree && (
              <p className="mt-[10px]">- {displayItems.definitionThree}</p>
            )}
            {displayItems.exampleThree && (
              <small className="ml-[9px]">
                e.g
                <i> {displayItems.exampleThree}</i>
              </small>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default DisplayItems;
