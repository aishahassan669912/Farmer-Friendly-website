// src/components/ui/TipCard.jsx
import React from "react";

const TipCard = ({ icon: Icon, title, description, tips }) => {
  return (
    <div className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <Icon className="h-8 w-8 text-primary" />
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start">
            <span className="mr-2 text-primary">•</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TipCard;
