// @flow
import React from 'react';
import DragAndDrop from '../dragAndDrop/DragAndDrop';
import './App.css';

export default function App() {
    return (
        <div className="App">
            <header data-testid="header" className="header">
                Drag and Drop
            </header>
            <DragAndDrop />
        </div>
    );
}
