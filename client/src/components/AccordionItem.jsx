import React, { useState } from "react";

function AccordionItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <h3>
                <button
                    type="button"
                    onClick={toggleAccordion}
                    className="px-2 flex items-center justify-between w-full py-5 font-medium text-left text-gray-900 hover:text-white bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    aria-expanded={isOpen ? "true" : "false"}
                    aria-controls={`accordion-flush-body-${question}`}>
                    <span>{question}</span>
                    <svg
                        className={`w-6 h-6 ${isOpen && "rotate-180"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
            </h3>
            <div
                id={`accordion-flush-body-${question}`}
                className={`py-5 border-b border-gray-200 dark:border-gray-700 ${
                    isOpen ? "" : "hidden"
                }`}>
                {answer}
            </div>
        </div>
    );
}

export default AccordionItem;
