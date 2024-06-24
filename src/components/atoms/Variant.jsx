import { useState } from "react";

const VariantSelector = ({ variants, selectedVariant, onVariantSelect }) => {
  return (
    <div>
      {variants.map((variant) => (
        <button
          key={variant.id}
          onClick={() => onVariantSelect(variant)}
          style={{
            borderRadius: "12px",
            marginRight: "8px",
            fontSize: "12px",
            border:
              selectedVariant && selectedVariant.id === variant.id
                ? "2px solid #064F3B"
                : "1px solid grey",
          }}
          className="px-2 py-1"
        >
          {variant.name}
        </button>
      ))}
    </div>
  );
};

export { VariantSelector };
