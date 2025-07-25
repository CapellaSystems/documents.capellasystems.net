import React, { useState } from 'react';
import DocSidebar from '@theme-original/DocSidebar';
import { ArrowUpAZ, ArrowDownAZ } from 'lucide-react';

function sortItems(items, order) {
  if (order === 'asc') return [...items].sort((a, b) => {
    const labelA = (a.label || a.id || '').toLowerCase();
    const labelB = (b.label || b.id || '').toLowerCase();
    if (labelA < labelB) return -1;
    if (labelA > labelB) return 1;
    return 0;
  });
  if (order === 'desc') return [...items].sort((a, b) => {
    const labelA = (a.label || a.id || '').toLowerCase();
    const labelB = (b.label || b.id || '').toLowerCase();
    if (labelA > labelB) return -1;
    if (labelA < labelB) return 1;
    return 0;
  });
  return items;
}

function CustomSidebar({sidebar, ...props}) {
  const [sortOrder, setSortOrder] = useState('asc'); // Default to A-Z

  // Find the Tutorials category and wrap it with sorting logic
  const customSidebar = sidebar.map(item => {
    if (item.type === 'category' && item.label === 'Tutorials' && Array.isArray(item.items)) {
      const sortedItems = sortItems(item.items, sortOrder);
      return {
        ...item,
        items: sortedItems,
        // Add a custom render function for the category label
        customProps: {
          ...item.customProps,
          sortButton: (
            <button
              style={{
                marginLeft: 5,
                cursor: 'pointer',
                marginBottom: -2,
                zIndex: 1000,
                background: 'transparent',
                padding: 0,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                color: 'var(--ifm-color-primary)',
              }}
              onClick={e => {   
                e.preventDefault();
                setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
              }}
              title={
                sortOrder === 'asc'
                  ? 'Sort A-Z'
                  : 'Sort Z-A'
              }
            >
              {sortOrder === 'asc' ? <ArrowDownAZ className="tutorial-sort-icon" size={18} /> : <ArrowUpAZ className="tutorial-sort-icon" size={18} />}
              </button>
          ),
        },
      };
    }
    return item;
  });

  // Patch DocSidebar to render the sort button next to Tutorials
  function PatchedSidebar(props) {
    // Recursively patch category labels to include the sort button
    function patchItems(items) {
      return items.map(item => {
        if (item.type === 'category' && item.label === 'Tutorials' && item.customProps && item.customProps.sortButton) {
          return {
            ...item,
            label: (
              <>
                {item.label}
                {item.customProps.sortButton}
              </>
            ),
            items: patchItems(item.items),
          };
        } else if (item.type === 'category' && Array.isArray(item.items)) {
          return {
            ...item,
            items: patchItems(item.items),
          };
        }
        return item;
      });
    }
    return <DocSidebar {...props} sidebar={patchItems(props.sidebar)} />;
  }

  return <PatchedSidebar {...props} sidebar={customSidebar} />;
}

export default CustomSidebar; 