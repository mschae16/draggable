import React from 'react';
import { render, getAllByRole } from '@testing-library/react';
import SecondaryButton from './SecondaryButton';

describe('SecondaryButton component', () => {
    test('component renders', () => {
        const { getAllByRole } = render(<SecondaryButton />);

        expect(getAllByRole('button')).toHaveLength(1);
    });
});
