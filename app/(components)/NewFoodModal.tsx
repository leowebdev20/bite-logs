import Link from "next/link";
import React, { useEffect, useState } from "react";
import RandomFoods from "../assets/randomFoods.json";

const NewFoodModal = ({ text, content }: any) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newFood, setNewFood] = useState<string>("");
  const [randomFoods, setRandomFoods] = useState<string[]>(RandomFoods);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * randomFoods.length);
    setNewFood(randomFoods[randomIndex]);
  }, [showModal]);

  const Modal = ({ onClose, date }: any) => {
    return (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden p-6 outline-none focus:outline-none">
          <div className="relative mx-auto my-6 w-auto max-w-3xl">
            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
              <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
                <h3 className="text-xl text-slate-800">
                  Let’s try <strong>{newFood}</strong> and see how it goes
                </h3>
                <button
                  className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-gray-700 outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="block h-6 w-6 bg-transparent text-2xl text-gray-700 outline-none focus:outline-none">
                    ⨯
                  </span>
                </button>
              </div>
              <div className="relative flex-auto p-6">
                <p className="my-4 text-lg leading-relaxed text-slate-800">
                  👋 Hey, ready for a delicious experiment? Try introducing
                  <strong> {newFood}</strong> into your meals and log your
                  unique responses in our food journal. Your insights will not
                  only enrich your personal log but also contribute to our
                  shared understanding of how different foods affect us.
                </p>
              </div>
              <div className="border-blueGray-200 roundedb flex items-center justify-end gap-2 border-t border-solid p-6">
                <button
                  // className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  className="btn w-auto border border-light-t bg-white text-light-t shadow hover:bg-white hover:shadow-lg"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <Link
                  href={{
                    pathname: "/entry/create/",
                    query: { newFood: newFood },
                  }}
                >
                  <button
                    // className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    className="btn w-auto bg-green-t shadow hover:shadow-lg"
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
        <div className="fixed inset-0 z-40 bg-gray-700 opacity-25"></div>
      </>
    );
  };

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
      {showModal ? <Modal /> : null}
    </>
  );
};

export default NewFoodModal;
