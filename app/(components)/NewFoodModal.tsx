import Link from "next/link";
import React, { useState } from "react";

const NewFoodModal = ({ text, content }: any) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newFood, setNewFood] = useState<string>("Chicken Breast");
  return (
    <>
      <button
        // className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        className="w-full p-6 text-left "
        type="button"
        onClick={() => setShowModal(true)}
      >
        <h4>{text}</h4>
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-6">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl text-slate-800">
                    Let’s try <strong>{newFood}</strong> and see how it goes
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-gray-700 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-gray-700 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ⨯
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-800 text-lg leading-relaxed">
                    👋 Hey, ready for a delicious experiment? Try introducing
                    <strong> {newFood}</strong> into your meals and log your
                    unique responses in our food journal. Your insights will not
                    only enrich your personal log but also contribute to our
                    shared understanding of how different foods affect us.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 roundedb gap-2">
                  <button
                    // className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    className="btn shadow hover:shadow-lg w-auto bg-white border border-blue-400 text-blue-400 hover:bg-white"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <Link href="/entry/create">
                    <button
                      // className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      className="btn shadow hover:shadow-lg w-auto"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Add an entry with this food
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-gray-700"></div>
        </>
      ) : null}
    </>
  );
};

export default NewFoodModal;
