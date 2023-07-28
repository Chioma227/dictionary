import React from 'react'

const Input = ({searchValue, setSearchValue, inputRef, getWord}) => {
  return (
    <div>
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
    </div>
  )
}

export default Input
