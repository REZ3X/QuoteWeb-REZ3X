// QuoteList.jsx
import React from 'react';

const QuoteList = ({ quotes }) => {
  const highlightText = (text, highlights) => {
    const parts = text.split(new RegExp(`(${highlights.join('|')})`, 'gi'));
    return parts.map((part, index) =>
      highlights.includes(part) ? (
        <span key={index} className="font-bold">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="container mx-auto p-4 tdn:mb-10 mt-[-30px]">
      {quotes.map((quote, index) => (
        <div key={index} className="border border-[#DDDDDD] p-4 my-4 rounded shadow bg-[#e4e2df]">
          <p className="whitespace-pre-wrap text-[#333333]">
            {highlightText(quote.quote, quote.highlight)}
          </p>
          <p className="text-[#888888]"><em>{quote.date}</em> - <strong>{quote.writer}</strong></p>
        </div>
      ))}
    </div>
  );
};

export default QuoteList;