// @flow
import React from 'react';
import { render, getAllByRole } from '@testing-library/react';
import DragAndDrop from './DragAndDrop';

describe('DragAndDrop component', () => {
    test('component renders', () => {
        const { getAllByRole } = render(<DragAndDrop />);

        expect(getAllByRole('main')).toHaveLength(1);
        expect(getAllByRole('button')).toHaveLength(2);
    });
});
