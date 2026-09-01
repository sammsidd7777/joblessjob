import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const ArrayInputField = ({ addItem, onChange, initialItems = [] }) => {
  const [arr, setArr] = useState(initialItems);

  // Add new item
  useEffect(() => {
    if (!addItem || !addItem.trim()) return;

    const newItem = addItem.trim();

    setArr((prev) => {
      // Prevent duplicate skills
      if (
        prev.some(
          (item) => item.toLowerCase() === newItem.toLowerCase()
        )
      ) {
        return prev;
      }

      const updated = [...prev, newItem];

      onChange(updated);

      return updated;
    });
  }, [addItem]);

  // Remove item
  const removeItem = (itemToRemove) => {
    const updated = arr.filter(
      (item) => item !== itemToRemove
    );

    setArr(updated);

    onChange(updated);
  };

  return (
    <div className="mt-3 flex flex-wrap gap-2">

      {arr.map((item) => (

        <span
          key={item}
          className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
        >

          {item}

          <button
            type="button"
            onClick={() => removeItem(item)}
            className="rounded-full text-blue-500 transition hover:text-red-500"
          >
            <X size={14} />
          </button>

        </span>

      ))}

    </div>
  );
};

export default ArrayInputField;