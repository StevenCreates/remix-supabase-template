import React from "react";

export const QueueHeader = ({ companyName }) => {

    // Will need props for Links, isLive
    
  return (
    <div className="mt-6 mb-6 flex items-center justify-center">
      <div className=" mx-auto">
        <div>
          <div className="w-full grid grid-cols-3">
            <div></div>
            <h2 className="text-3xl font-semibold text-center mb-4 text-gray-700">
              {companyName}
            </h2>
    <div className="flex items-center justify-end">
            <div className="mr-2 bg-teal-600 h-2 w-2 rounded-full animate-pulse"></div>
            <span className=" text-slate-700">Live</span>
    </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button className="bg-slate-400 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
              <svg
                className="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                imageRendering="optimizeQuality"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                viewBox="0 0 2859 3333"
              >
                <path d="M2081 0c55 473 319 755 778 785v532c-266 26-499-61-770-225v995c0 1264-1378 1659-1932 753-356-583-138-1606 1004-1647v561c-87 14-180 36-265 65-254 86-398 247-358 531 77 544 1075 705 992-358V1h551z"></path>
              </svg>
            </button>

            <button className="bg-slate-400 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </button>

            <button className="bg-slate-400 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="w-5"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018c0-3.878 3.132-7.018 7-7.018c1.89 0 3.47.697 4.682 1.829l-1.974 1.978v-.004c-.735-.702-1.667-1.062-2.708-1.062c-2.31 0-4.187 1.956-4.187 4.273c0 2.315 1.877 4.277 4.187 4.277c2.096 0 3.522-1.202 3.816-2.852H12.14v-2.737h6.585c.088.47.135.96.135 1.474c0 4.01-2.677 6.86-6.72 6.86z"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
