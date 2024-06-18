// variant.jsx
import { useState } from "react";

const VariantSelector = ({ variants, onVariantSelect }) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    onVariantSelect(variant);
    console.log("Selected variant:", variant);
  };

  return (
    <div>
      {variants.map((variant) => (
        <button
          key={variant.id}
          onClick={() => handleVariantChange(variant)}
          style={{
            borderRadius: "12px",
            marginRight: "8px",
            fontSize: "12px",
            border:
              selectedVariant.id === variant.id
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
