import { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import Mark from 'mark.js';

export default function useSearchHighlighting() {
    const location = useLocation();

    useEffect(() => {
        // Only use URL parameter
        const params = new URLSearchParams(location.search);
        const highlightQuery = params.get('_highlight');

        if (!highlightQuery) {
            return;
        }

        console.log('[SearchHighlight] Query from URL:', highlightQuery);

        // Use retry mechanism to ensure React has finished rendering
        let attempts = 0;
        const maxAttempts = 10;

        const tryHighlight = () => {
            attempts++;

            const container = document.querySelector('.theme-doc-markdown') ||
                document.querySelector('article.markdown') ||
                document.querySelector('main');

            if (!container) {
                if (attempts < maxAttempts) {
                    setTimeout(tryHighlight, 300);
                } else {
                    console.error('[SearchHighlight] No container found after', maxAttempts, 'attempts');
                }
                return;
            }

            // Skip search modal
            if (container.closest('.DocSearch-Modal') || container.classList.contains('searchResultItem_Tv2o')) {
                console.log('[SearchHighlight] Skipping search modal');
                return;
            }

            console.log('[SearchHighlight] Highlighting attempt:', attempts);

            const instance = new Mark(container);
            instance.unmark({
                done: () => {
                    instance.mark(highlightQuery, {
                        element: 'mark',
                        className: 'search-mark',
                        separateWordSearch: true,
                        acrossElements: true,
                        caseSensitive: false,
                        done: (count) => {
                            console.log(`[SearchHighlight] Highlighted ${count} instances of "${highlightQuery}"`);

                            // Verify marks persist
                            setTimeout(() => {
                                const markCount = document.querySelectorAll('mark').length;
                                console.log('[SearchHighlight] Marks in DOM:', markCount);

                                if (markCount === 0 && count > 0 && attempts < maxAttempts) {
                                    console.warn('[SearchHighlight] Marks removed, retrying...');
                                    setTimeout(tryHighlight, 500);
                                }
                            }, 500);
                        }
                    });
                }
            });
        };

        const timer = setTimeout(tryHighlight, 1000);
        return () => clearTimeout(timer);
    }, [location]);
}
