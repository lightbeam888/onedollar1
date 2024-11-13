import React, { useEffect, useRef, useState, useCallback } from "react";

interface AccordionProps {
  title: string;
  content: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [active, setActive] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = useCallback(() => {
    setActive((prevActive) => !prevActive);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = active
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [active]);

  return (
    <div className=" flex flex-col gap-2 items-center justify-between">
      <div
        className={`w-full flex justify-between items-center font-semibold cursor-pointer`}
        onClick={toggleAccordion}
      >
        <p className="text-lg roboto-bold">{title}</p>
        <span className="ml-4 text-xl">{active ? "-" : "+"}</span>
      </div>
      <div
        ref={contentRef}
        className="overflow-hidden transition-max-height duration-300 ease-in-out"
        style={{ maxHeight: "0px" }}
      >
        <div
          className=" text-gray-700 py-2"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default Accordion;
