import React, { useEffect, useRef, useState, useCallback } from "react";

interface AccordionProps {
  clr: boolean;
  title: string;
  content: string;
}

const Accordion: React.FC<AccordionProps> = ({ clr, title, content }) => {
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
        className={`w-full flex justify-between items-center cursor-pointer`}
        onClick={toggleAccordion}
      >
        <p className="text-lg">{title}</p>
        <span className="ml-4 text-xl">{active ? "-" : "+"}</span>
      </div>
      <div
        ref={contentRef}
        className="overflow-hidden w-full justify-start items-center transition-max-height duration-300 ease-in-out"
        style={{ maxHeight: "0px" }}
      >
        <span className={!clr ? "text-gray-700" : "text-gray-400"}>
          <div
            className=" py-2"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </span>
      </div>
    </div>
  );
};

export default Accordion;
