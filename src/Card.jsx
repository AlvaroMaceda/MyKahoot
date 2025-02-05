// Card.js
const Card = ({ children }) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {children}
    </div>
  );
};

export default Card;
