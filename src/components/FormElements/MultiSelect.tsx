"use client";
import React, { useEffect, useRef, useState } from "react";

interface Option {
  value: string;
  text: string;
  selected: boolean;
}

interface DropdownProps {
  id: string;
}

const MultiSelect: React.FC<DropdownProps> = ({ id }) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const trigger = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadOptions = () => {
      const select = document.getElementById(id) as HTMLSelectElement | null;
      if (select) {
        const newOptions: Option[] = Array.from(select.options).map((option) => ({
          value: option.value,
          text: option.innerText,
          selected: option.hasAttribute("selected"),
        }));
        setOptions(newOptions);
      }
    };

    loadOptions();
  }, [id]);

  const open = () => setShow(true);
  const close = () => setShow(false);
  const isOpen = () => show;

  const select = (index: number) => {
    const newOptions = [...options];
    newOptions[index].selected = !newOptions[index].selected;
    setSelected(
      newOptions[index].selected
        ? [...selected, index]
        : selected.filter((i) => i !== index)
    );
    setOptions(newOptions);
  };

  const remove = (index: number) => {
    const newOptions = [...options];
    newOptions[index].selected = false;
    setSelected(selected.filter((i) => i !== index));
    setOptions(newOptions);
  };

  const selectedValues = () => selected.map((index) => options[index].value);

  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (!dropdownRef.current || !trigger.current) return;
      if (!dropdownRef.current.contains(event.target as Node) && !trigger.current.contains(event.target as Node)) {
        close();
      }
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, []);

  return (
    <div className="relative z-50">
      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
        Multiselect Dropdown
      </label>
      <select className="hidden" id={id}>
        <option value="1">Design</option>
        <option value="2">Development</option>
        <option value="3">Option 4</option>
        <option value="4">Option 5</option>
      </select>

      <div className="relative">
        <div ref={trigger} onClick={open} className="w-full cursor-pointer border border-gray-300 p-2 rounded-md">
          {selected.length === 0 ? "Select an option" : selected.map((index) => options[index].text).join(", ")}
        </div>
        {isOpen() && (
          <div ref={dropdownRef} className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-300 shadow-md">
            {options.map((option, index) => (
              <div
                key={index}
                className={`p-2 cursor-pointer ${option.selected ? "bg-gray-200" : ""}`}
                onClick={() => select(index)}
              >
                {option.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
