"use client";
import React, { useEffect, useRef, useState } from "react";

interface Option {
  value: string;
  text: string;
  selected: boolean;
  element?: HTMLElement;
}

interface DropdownProps {
  id: string;
}

const MultiSelect: React.FC<DropdownProps> = ({ id }) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadOptions = () => {
      const select = document.getElementById(id) as HTMLSelectElement | null;
      if (select) {
        const newOptions: Option[] = Array.from(select.options).map((opt) => ({
          value: opt.value,
          text: opt.innerText,
          selected: opt.selected,
        }));
        setOptions(newOptions);
      }
    };
    loadOptions();
  }, [id]);

  const openDropdown = () => setShow(true);
  const closeDropdown = () => setShow(false);

  const toggleSelect = (index: number, event: React.MouseEvent) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index].selected = !newOptions[index].selected;
      return newOptions;
    });

    setSelected((prevSelected) =>
      options[index].selected
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  const selectedValues = () => selected.map((index) => options[index]?.value || "");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        triggerRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-50">
      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
        Multiselect Dropdown
      </label>
      <select className="hidden" id={id}>
        {options.map((option, idx) => (
          <option key={idx} value={option.value} selected={option.selected}>
            {option.text}
          </option>
        ))}
      </select>
      <div className="flex flex-col items-center">
        <input type="hidden" name="values" value={selectedValues().join(",")} />
        <div ref={triggerRef} onClick={openDropdown} className="cursor-pointer">
          <div className="mb-2 flex rounded border py-2 px-3">
            <div className="flex flex-wrap gap-3">
              {selected.map((index) => (
                <span key={index} className="bg-gray-200 px-2 py-1 rounded">
                  {options[index]?.text} &times;
                </span>
              ))}
              {selected.length === 0 && <span className="text-gray-400">Select an option</span>}
            </div>
          </div>
        </div>
        {show && (
          <div
            ref={dropdownRef}
            className="absolute left-0 top-full z-40 w-full bg-white shadow-lg max-h-60 overflow-y-auto"
          >
            {options.map((option, index) => (
              <div
                key={index}
                className={`cursor-pointer p-2 ${option.selected ? "bg-blue-200" : "hover:bg-gray-100"}`}
                onClick={(event) => toggleSelect(index, event)}
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
