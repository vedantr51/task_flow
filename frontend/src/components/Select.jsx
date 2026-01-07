'use client';

import { useState, useRef, useEffect } from 'react';

export default function Select({
    value,
    onChange,
    options,
    placeholder = 'Select...',
    className = ''
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const containerRef = useRef(null);
    const listRef = useRef(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
                setFocusedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (event) => {
        if (!isOpen) {
            if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
                event.preventDefault();
                setIsOpen(true);
                setFocusedIndex(options.findIndex(opt => opt.value === value) || 0);
            }
            return;
        }

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                setFocusedIndex(prev =>
                    prev < options.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                event.preventDefault();
                setFocusedIndex(prev =>
                    prev > 0 ? prev - 1 : options.length - 1
                );
                break;
            case 'Enter':
            case ' ':
                event.preventDefault();
                if (focusedIndex >= 0) {
                    handleSelect(options[focusedIndex].value);
                }
                break;
            case 'Escape':
                event.preventDefault();
                setIsOpen(false);
                setFocusedIndex(-1);
                break;
            case 'Tab':
                setIsOpen(false);
                setFocusedIndex(-1);
                break;
        }
    };

    const handleSelect = (optionValue) => {
        onChange({ target: { value: optionValue } });
        setIsOpen(false);
        setFocusedIndex(-1);
    };

    useEffect(() => {
        if (isOpen && focusedIndex >= 0 && listRef.current) {
            const focusedItem = listRef.current.children[focusedIndex];
            if (focusedItem) {
                focusedItem.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [focusedIndex, isOpen]);

    return (
        <div
            ref={containerRef}
            className={`relative ${className}`}
        >
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-labelledby="select-label"
                className={`
                    w-full flex items-center justify-between gap-2
                    px-4 py-2.5 
                    bg-white 
                    border border-zinc-200 
                    rounded-lg 
                    text-sm font-medium
                    transition-all duration-200
                    cursor-pointer
                    ${isOpen
                        ? 'border-zinc-900 ring-1 ring-zinc-900'
                        : 'hover:border-zinc-400'
                    }
                    focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900
                `}
            >
                <span className={selectedOption ? 'text-zinc-900' : 'text-zinc-400'}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>

                <svg
                    className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    className="
                        absolute z-50 
                        w-full mt-1.5
                        bg-white 
                        border border-zinc-200 
                        rounded-lg 
                        shadow-lg shadow-zinc-900/10
                        overflow-hidden
                        animate-in fade-in-0 zoom-in-95 duration-150
                    "
                >
                    <ul
                        ref={listRef}
                        role="listbox"
                        aria-activedescendant={focusedIndex >= 0 ? `option-${focusedIndex}` : undefined}
                        className="py-1 max-h-60 overflow-auto"
                    >
                        {options.map((option, index) => {
                            const isSelected = option.value === value;
                            const isFocused = index === focusedIndex;

                            return (
                                <li
                                    key={option.value}
                                    id={`option-${index}`}
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => handleSelect(option.value)}
                                    onMouseEnter={() => setFocusedIndex(index)}
                                    className={`
                                        relative flex items-center
                                        px-4 py-2.5
                                        text-sm cursor-pointer
                                        transition-colors duration-100
                                        ${isSelected
                                            ? 'bg-zinc-100 text-zinc-900 font-medium'
                                            : 'text-zinc-700'
                                        }
                                        ${isFocused && !isSelected
                                            ? 'bg-zinc-50'
                                            : ''
                                        }
                                        ${!isSelected && !isFocused
                                            ? 'hover:bg-zinc-50'
                                            : ''
                                        }
                                    `}
                                >
                                    {isSelected && (
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-zinc-900 rounded-r"></span>
                                    )}

                                    <span className={isSelected ? 'pl-2' : ''}>
                                        {option.label}
                                    </span>

                                    {isSelected && (
                                        <svg
                                            className="ml-auto w-4 h-4 text-zinc-900"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}
