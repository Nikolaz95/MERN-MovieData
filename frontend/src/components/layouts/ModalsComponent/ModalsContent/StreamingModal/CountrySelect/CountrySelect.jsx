import React, { useEffect, useMemo, useRef, useState } from 'react'

//import css
import "./CountrySelect.css";

//import components
import { useOutsideClick } from '../../../../../hooks/useOutSideClick';

// flag pictures from flagcdn.com (a native <select> can't show images)
const flagUrl = (code, width) => `https://flagcdn.com/w${width}/${code.toLowerCase()}.png`;

const Flag = ({ code }) => (
    <img src={flagUrl(code, 40)} srcSet={`${flagUrl(code, 80)} 2x`}
        alt="" className="countryFlag" width="22" height="16" loading="lazy"
        onError={(e) => { e.currentTarget.style.visibility = "hidden"; }} />
);

// dropdown with flags + search, keyboard: arrows / Enter / Esc
const CountrySelect = ({ value, options, onChange, getName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const buttonRef = useRef(null);
    const searchRef = useRef(null);
    const listRef = useRef(null);
    const wrapperRef = useOutsideClick(() => setIsOpen(false), isOpen);

    // best matches first: name starts with the text ("ger" -> Germany), then a word starts with it, then anywhere
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return options;
        const rank = (code) => {
            const name = getName(code).toLowerCase();
            if (code.toLowerCase() === q || name.startsWith(q)) return 0;
            if (name.split(/[\s-]+/).some((word) => word.startsWith(q))) return 1;
            if (name.includes(q)) return 2;
            return -1;
        };
        return options
            .map((code) => ({ code, r: rank(code) }))
            .filter((x) => x.r >= 0)
            .sort((a, b) => a.r - b.r) // stable sort keeps alphabetical order inside each rank
            .map((x) => x.code);
    }, [options, query, getName]);

    const openList = () => {
        setQuery("");
        setActiveIndex(Math.max(0, options.indexOf(value)));
        setIsOpen(true);
    };

    const closeList = () => {
        setIsOpen(false);
        buttonRef.current?.focus();
    };

    const selectCountry = (code) => {
        onChange(code);
        closeList();
    };

    // focus the search field when the list opens
    useEffect(() => {
        if (isOpen) searchRef.current?.focus();
    }, [isOpen]);

    // keep the highlighted country visible while using the arrow keys
    useEffect(() => {
        if (!isOpen) return;
        listRef.current?.querySelector(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: "nearest" });
    }, [activeIndex, isOpen]);

    const handleSearchKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (filtered[activeIndex]) selectCountry(filtered[activeIndex]);
        } else if (e.key === "Escape") {
            // close only the list, not the whole modal
            e.preventDefault();
            e.stopPropagation();
            closeList();
        }
    };

    return (
        <div className="countrySelect" ref={wrapperRef}>
            <button ref={buttonRef} type="button" className="countrySelectButton"
                aria-haspopup="listbox" aria-expanded={isOpen} aria-label={`Country: ${getName(value)}`}
                onClick={() => (isOpen ? closeList() : openList())}
                onKeyDown={(e) => {
                    if (e.key === "ArrowDown" && !isOpen) {
                        e.preventDefault();
                        openList();
                    }
                }}>
                <Flag code={value} />
                <span className="countrySelectName">{getName(value)}</span>
                <svg className={`countrySelectChevron ${isOpen ? "open" : ""}`} width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            {isOpen && (
                <div className="countrySelectPopover">
                    <input ref={searchRef} type="text" className="countrySelectSearch"
                        placeholder="Search country..." value={query}
                        role="combobox" aria-expanded="true" aria-controls="countrySelectList" aria-label="Search country"
                        aria-activedescendant={filtered[activeIndex] ? `country-${filtered[activeIndex]}` : undefined}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setActiveIndex(0);
                        }}
                        onKeyDown={handleSearchKeyDown} />

                    <ul id="countrySelectList" ref={listRef} role="listbox" className="countrySelectList">
                        {filtered.length === 0 ? (
                            <li className="countrySelectEmpty">No countries found</li>
                        ) : (
                            filtered.map((code, i) => (
                                <li key={code} id={`country-${code}`} data-index={i}
                                    role="option" aria-selected={code === value}
                                    className={`countrySelectOption ${i === activeIndex ? "active" : ""} ${code === value ? "selected" : ""}`}
                                    onMouseEnter={() => setActiveIndex(i)}
                                    onClick={() => selectCountry(code)}>
                                    <Flag code={code} />
                                    <span className="countrySelectOptionName">{getName(code)}</span>
                                    {code === value && (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                    )}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default CountrySelect
