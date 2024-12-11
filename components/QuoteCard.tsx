import React from "react";
interface Quote {
  id: number;
  text: string;
  mediaUrl: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}
const QuoteCard = ({ quote }: { quote: Quote }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        {quote.mediaUrl ? (
          // eslint-disable-next-line
          <img
            src={quote?.mediaUrl}
            alt="Quote Background"
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-gradient-to-r from-blue-400 to-purple-500" />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <p className="text-white text-center text-xl font-bold px-4">
            {quote.text}
          </p>
        </div>
      </div>
      <div className="p-4 flex justify-between items-center">
        <div>
          <p className="font-semibold text-lg text-blue-600">
            User: {quote.username}
          </p>
          <p className="text-base text-gray-500 font-medium">
            Created at: {new Date(quote.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
