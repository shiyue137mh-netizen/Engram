/// <reference types="@mdx-js/react" />

// MDX Components
declare module '*.mdx' {
    import type { ComponentType } from 'react';
    const MDXComponent: ComponentType;
    export default MDXComponent;
}

// Raw File Imports (Vite specific)
declare module '*?raw' {
    const content: string;
    export default content;
}

declare module '*.md?raw' {
    const content: string;
    export default content;
}

declare module '*.mdx?raw' {
    const content: string;
    export default content;
}
