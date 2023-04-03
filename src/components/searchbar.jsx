import React, { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { BiBluetooth } from "react-icons/bi";
import "../index.css";

const items = [
  {
    id: 1,
    name: "Accu-Chek Aviva Connect",
    img: "https://www.accu-chek.ca/sites/g/files/iut106/f/styles/image_300x400/public/media_root/product_media_files/product_images/connect-fr-300x400_0.png?itok=hXZnm2P1",
    description:
      "Accu-Chek Aviva Connect is a blood glucose meter that is compatible with the Accu-Chek Connect app. It is a small, lightweight meter that is easy to use and can be used with Accu-Chek Aviva test strips.",
    bluetooth: true,
    batteryPercentage: 100,
    insulinDoses: 10,
    lastSync: "2020-29-05T00:00:00.000Z",
  },
  {
    id: 2,
    name: "Accu-Chek Guide",
    img: "https://www.accu-chek.fr/sites/g/files/iut941/f/styles/image_300x400/public/guide-300-400.png?itok=o_QR16Cy",
    description:
      "Accu-Chek Guide is a blood glucose meter that is compatible with the Accu-Chek Connect app. It is a small, lightweight meter that is easy to use and can be used with Accu-Chek Aviva test strips.",
    bluetooth: true,
    batteryPercentage: 90,
    insulinDoses: 5,
    lastSync: "2022-11-28T00:00:00.000Z",
  },
  {
    id: 3,
    name: "Accu-Chek Guide Me",
    img: "data:image/jpeg;base64,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",
    description:
      "Accu-Chek Guide Me is a blood glucose meter that is compatible with the Accu-Chek Connect app. It is a small, lightweight meter that is easy to use and can be used with Accu-Chek Aviva test strips.",
    bluetooth: true,
    batteryPercentage: 80,
    insulinDoses: 7,
    lastSync: "2022-07-04T12:00:00.000Z",
  },
  {
    id: 4,
    name: "GlucoFix Tech2K MENARINI",
    img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS4IyFQoEXvgemRBC7jyux6SCWlV91PfgQef-z05-loIHqBCK-o0zhay1TCjB966SRIQYSFTV1tL6uArUqRHejliyOBt-OdWF5DPf18YRIqpeZQ92ufUMme&usqp=CAE",
    description:
      "The Glucofix Tech2K MENARINI meter that guarantees reliable results for both doctors and diabetic patients.",
    bluetooth: false,
    batteryPercentage: 95,
    insulinDoses: 9,
    lastSync: "2021-05-01T12:00:00.000Z",
  },
];

const handleOnSearch = (string, results) => {
  console.log(string, results);
};

const handleOnHover = (result) => {
  console.log(result);
};

const handleOnFocus = () => {
  console.log("Focused");
};

const handleOnClear = () => {
  console.log("Cleared");
};

function SearchBar({}) {
  const handleOnSelect = (item) => {
    setSelectedItem(item);
    console.log(item);
  };

  const handleButtonClick = () => {
    setSelectedItem(!selectedItem);
    setIsClicked(!isClicked);
  };

  const [isClicked, setIsClicked] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="search-bar p-4 sm:ml-64 custom-padding-top font-worksans">
      {!selectedItem ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsClicked(!isClicked)}
        >
          Add Meters
        </button>
      ) : null}
      {isClicked ? (
        <>
          <label className="block text-gray-700 text-xl mb-1 mt-1">
            Search for your meter
          </label>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            onClear={handleOnClear}
            styling={{ zIndex: 4 }}
            autoFocus
            placeholder="search"
            className="w-4/5"
          />
        </>
      ) : null}
      {selectedItem ? (
        <div className="flex flex-col items-center py-4">
          <div className="flex">
            <div className="glucosemeter flex flex-col items-center w-1/2">
              <img src={selectedItem.img} alt="meter" className="w-1/2" />
              <p className="text-justify text-xl py-4 ">{selectedItem.name}</p>
              {selectedItem.bluetooth ? (
                <>
                  <div className="flex items-center">
                    <BiBluetooth className="text-blue-500" />
                    <p className="text-sm">Bluetooth technology</p>
                  </div>
                </>
              ) : (
                <p className="text-sm">No Bluetooth</p>
              )}
              <p className="text-sm py-4">{selectedItem.description}</p>
            </div>
            <div className="information w-1/2 mt-8">
              <div className="flex justify-between items-center border-b-2 border-gray-200 pb-2 mb-4">
                <p className="text-lg font-bold">Battery Percentage</p>
                <p className="text-lg font-bold">
                  {selectedItem.batteryPercentage
                    ? selectedItem.batteryPercentage
                    : "N/A"}
                  %
                </p>
              </div>
              <div className="flex justify-between items-center border-b-2 border-gray-200 pb-2 mb-4">
                <p className="text-lg font-bold">Insulin Doses</p>
                <p className="text-lg font-bold">
                  {selectedItem.insulinDoses
                    ? selectedItem.insulinDoses
                    : "N/A"}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold">Other Parameters</p>
                <p className="text-lg font-bold">
                  {selectedItem.params ? selectedItem.params : "N/A"}
                </p>
              </div>
              <div className="flex justify-between items-center border-b-2 border-gray-200 pb-2 mb-4">
                <p className="text-lg font-bold">Last Sync</p>
                <p className="text-lg font-bold">
                  {selectedItem.lastSync ? selectedItem.lastSync : "N/A"}
                </p>
              </div>
              <div className="flex justify-evenly pb-2 mb-4">
                <div>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">
                    Connect
                  </button>
                </div>
                <div>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => handleButtonClick()}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SearchBar;
