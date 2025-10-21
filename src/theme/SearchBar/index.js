// src/theme/SearchBar/index.js
import React, { useRef, useEffect, useCallback } from 'react';
import OriginalSearchBar from '@theme-original/SearchBar';

export default function SearchBarWrapper(props) {
  const searchQueryRef = useRef('');
  const highlightedRef = useRef(false);

  // Store the search query when it changes
  useEffect(() => {
    const handleInput = (event) => {
      if (event.target && event.target.value !== undefined) {
        searchQueryRef.current = event.target.value;
        console.log('[SearchBar] stored query:', searchQueryRef.current);
      }
    };

    // Listen to multiple input events for better coverage
    document.addEventListener('input', handleInput);
    document.addEventListener('keyup', handleInput);
    document.addEventListener('change', handleInput);
    
    return () => {
      document.removeEventListener('input', handleInput);
      document.removeEventListener('keyup', handleInput);
      document.removeEventListener('change', handleInput);
    };
  }, []);

  // Enhanced click handler for search result links
  useEffect(() => {
    const handleClick = (event) => {
      const link = event.target.closest('a');
      if (!link || !link.href) return;

      // Get search query from multiple sources
      let currentQuery = searchQueryRef.current;
      
      // If we're on search page, get query from URL
      if (window.location.pathname === '/search') {
        const urlParams = new URLSearchParams(window.location.search);
        const urlQuery = urlParams.get('q');
        if (urlQuery) {
          currentQuery = urlQuery;
          console.log('[SearchBar] Using query from URL:', currentQuery);
        }
      }

      if (!currentQuery) return;

      // Check if this is a search result link (more comprehensive detection)
      const isSearchResult = (
        // Dropdown suggestions
        link.classList.contains('DocSearch-Suggestion') ||
        link.closest('.DocSearch-Dropdown') ||
        // All results page
        link.closest('.DocSearch-Hit') ||
        link.closest('.DocSearch-Hits') ||
        link.classList.contains('DocSearch-Hit-Title') ||
        link.classList.contains('DocSearch-Hit-Select') ||
        // Docusaurus search results page (/search?q=...) - be more aggressive
        (window.location.pathname === '/search') ||
        // Any doc link when we have a search query and we're on search page
        (link.href.includes('/docs/') && searchQueryRef.current && window.location.pathname === '/search') ||
        // General doc links from search context
        (link.href.includes('documents.capellasystems.net') && 
         (link.closest('[class*="DocSearch"]') || link.closest('[class*="search"]')))
      );

      console.log('[SearchBar] Is search result:', isSearchResult);

      if (isSearchResult && !link.href.includes('?q=')) {
        try {
          // Prevent default navigation and stop propagation
          event.preventDefault();
          event.stopPropagation();
          
          // Create modified URL
          const url = new URL(link.href);
          url.searchParams.set('q', currentQuery);
          const modifiedUrl = url.toString();
          
          // Navigate to the modified URL
          window.location.href = modifiedUrl;
          
        } catch (error) {
          console.error('[SearchBar] Error modifying URL:', error);
        }
      }
    };

    // Use capture phase and multiple event types for better coverage
    document.addEventListener('click', handleClick, true);
    document.addEventListener('mousedown', handleClick, true);
    document.addEventListener('keydown', handleClick, true);
    
    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('mousedown', handleClick, true);
      document.removeEventListener('keydown', handleClick, true);
    };
  }, []);

  // Enhanced highlighting function
  const highlightText = useCallback((query) => {
    if (!query || highlightedRef.current) return;

    console.log('[SearchBar] Starting highlighting for query:', query);
    
    try {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            // Skip script, style, and already highlighted content
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            
            const tagName = parent.tagName?.toLowerCase();
            if (['script', 'style', 'mark'].includes(tagName)) {
              return NodeFilter.FILTER_REJECT;
            }
            
            return NodeFilter.FILTER_ACCEPT;
          }
        },
        false
      );

      const nodes = [];
      while (walker.nextNode()) {
        nodes.push(walker.currentNode);
      }
      
      let highlightedCount = 0;
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedQuery})`, 'gi');
      
      nodes.forEach((node, index) => {
        try {
          // Validate node is still in DOM
          if (!node.parentNode || !document.contains(node)) {
            return;
          }

          const text = node.textContent;
          if (regex.test(text)) {
            const parent = node.parentNode;
            
            // Double-check parent is still valid
            if (parent && document.contains(parent)) {
              const span = document.createElement('span');
              span.innerHTML = text.replace(regex, '<mark>$1</mark>');
              
              // Use insertBefore and removeChild for safer DOM manipulation
              parent.insertBefore(span, node);
              parent.removeChild(node);
              highlightedCount++;
            } else {
              console.log('[SearchBar] Parent node invalid at index', index);
            }
          }
        } catch (nodeError) {
          console.warn('[SearchBar] Error processing node at index', index, ':', nodeError);
        }
      });
      
      highlightedRef.current = true;
    } catch (error) {
      console.error('[SearchBar] Error during highlighting:', error);
    }
  }, []);

  // Handle highlighting when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      // Reset highlighting flag
      highlightedRef.current = false;
      
      const params = new URLSearchParams(window.location.search);
      const query = params.get('q');
      
      if (!query) {
        console.log('[SearchBar] No query parameter found');
        return;
      }
      
      // Wait for content to load with multiple attempts
      let attempts = 0;
      const maxAttempts = 10;
      
      const tryHighlight = () => {
        attempts++;
        
        if (document.body && document.body.children.length > 0) {
          highlightText(query);
        } else if (attempts < maxAttempts) {
          setTimeout(tryHighlight, 100);
        } else {
          console.warn('[SearchBar] Content not loaded after maximum attempts');
        }
      };
      
      setTimeout(tryHighlight, 100);
    };

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);
    
    // Run on initial load
    handleRouteChange();
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [highlightText]);

  return <OriginalSearchBar {...props} />;
}