import React, { useState } from "react";

const CollapseHandMade = ({ title, answers }) => {
    const [accordionOpen, setAccordionOpen] = useState(false);

    return (
        <div className="py-2">
            <button
                onClick={() => setAccordionOpen(!accordionOpen)}
                className="flex justify-between items-center w-full p-4 bg-blue-300 text-gray-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform duration-300"
            >
                <span className="text-lg font-semibold">{title}</span>
                <svg
                    className={`fill-current transform transition-transform duration-300 ${accordionOpen ? "rotate-180" : ""}`}
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect y="7" width="16" height="2" rx="1" />
                    <rect y="7" width="16" height="2" rx="1" className="rotate-90 origin-center" />
                </svg>
            </button>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${accordionOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
            >
                <ul className="mt-2 space-y-2">
                    {Array.isArray(answers) ? (
                        answers.map((answer, index) => (
                            <li key={index} className="p-4 bg-blue-50 text-gray-900 rounded-md shadow-sm">
                                {answer}
                            </li>
                        ))
                    ) : (
                        <li className="p-4 bg-blue-50 text-blue-600 rounded-md shadow-sm">{answers}</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default CollapseHandMade;
