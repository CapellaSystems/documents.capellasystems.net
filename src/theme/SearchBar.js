import React from 'react';
import SearchBar from '@theme-original/SearchBar';


export default function SearchBarWrapper(props) {
    return (
        <div className="search-bar-wrapper">
            <SearchBar {...props} />
            <span className="search-shortcut-hint">
                <kbd className="search-kbd">Ctrl</kbd>
                <span className="search-plus">+</span>
                <kbd className="search-kbd">K</kbd>
            </span>
        </div>
    );
}
