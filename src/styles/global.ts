import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *, 
    *::before, 
    *::after {
        box-sizing: border-box;
    }

    #root {
        width: 100%;
        margin: 0 auto;
        text-align: center;
    }

    body {
        margin: 0 auto;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: hidden;
        padding: 0;
    }

    ol,
    ul {
        list-style: none;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }

    html, 
    body, 
    #root {
        height: 100%;
    }
`;

export default GlobalStyles;
