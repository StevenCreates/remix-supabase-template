import React from "react";

export const Queue = ({ list }) => {
  return (
    <div
      style={{ "maxHeight": "26rem" }}
      className="bg-white border -z-10 border-gray-300 overflow-hidden overflow-y-scroll rounded-md"
    >
      <ul className="divide-y divide-gray-300">
        {list.map((item, index) => (
          <li key={item.id} index={index} className="">
            <div className="grid grid-cols-3">
              <div className="grid grid-cols-1 grid-rows-2">
                <button
                  type="button"
                  className="inline-flex items-center w-12 px-2.5 py-1.5 border border-transparent text-xs font-medium shadow-sm text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="inline-flex w-12 text-center text-slate-500 align-middle content-center justify-items-center items-center px-2.5 py-1.5 border border-slate-50 text-xs font-medium  shadow-sm bg-slate-100z  hover:bg-slate-200 focus:outline-none focus:ring-2 z-50 focus:ring-indigo-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div
                // style={{
                //   "grid-column-start": '2',
                //   "grid-column-end": '4',
                // }}
                className="text-lg leading-6 font-medium text-gray-900 w-100 flex items-center"
              >
                {item.public_user}
              </div>
              <div className="w-full text-right h-full">
                <button
                  type="button"
                  className={`inline-flex w-24 justify-center h-full text-center align-middle content-center justify-items-center items-center px-2.5 py-1.5 border border-transparent text-xs font-medium  shadow-sm ${
                    index === 0
                      ? "text-amber-500"
                      : index === 1
                      ? "text-indigo-500"
                      : "text-slate-700"
                  } bg-white hover:bg-slate-300 focus:bg-indigo-50`}
                >
                  {index === 0 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : index === 1 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className=" h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className=" h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
