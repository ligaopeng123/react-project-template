import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DemoComponent } from "../src";

const App = () => {
    return (
        <DemoComponent/>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
