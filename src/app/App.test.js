// @flow
import React from 'react';
import { render, getAllByText, getAllByTestId } from '@testing-library/react';
import App from './App';

describe('App component', () => {
    test('component renders', () => {
        const { getAllByText, getAllByTestId } = render(<App />);

        expect(getAllByTestId('header')).toHaveLength(1);
        expect(getAllByText('Drag and Drop')).toBeTruthy();
    });
});
