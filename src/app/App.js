// @flow
import React from 'react';
import { Container } from '@material-ui/core';
import Header from '../header/Header';
import './App.css';

export default function App() {
    return (
        <div className="App">
            <Header />
            <Container maxWidth="lg"></Container>
        </div>
    );
}
