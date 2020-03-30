// @flow
import React from 'react';
import Header from '../header/Header';
import DragAndDrop from '../dragAndDrop/DragAndDrop';
import './App.css';

export default function App() {
    return (
        <div className="App">
            <Header />
            <DragAndDrop />
        </div>
    );
}
