import React from "react";

interface CardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default Card;