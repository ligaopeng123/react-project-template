import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { <%= name %> } from "../src";

const App = () => {
    return (
        <<%= name %>/>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
