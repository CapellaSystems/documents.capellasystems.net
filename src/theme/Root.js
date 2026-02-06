import React from 'react';
import useSearchHighlighting from '@site/src/hooks/useSearchHighlighting';

export default function Root({ children }) {
    useSearchHighlighting();
    return <>{children}</>;
}
