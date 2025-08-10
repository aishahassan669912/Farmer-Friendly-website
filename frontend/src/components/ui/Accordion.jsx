import React, { useState } from "react";

function AccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between w-full py-4 font-medium hover:underline"
      >
        {title}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="pb-4 text-sm">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Accordion({ items }) {
  return (
    <div>
      {items.map(({ title, content }, i) => (
        <AccordionItem key={i} title={title}>
          {content}
        </AccordionItem>
      ))}
    </div>
  );
}
