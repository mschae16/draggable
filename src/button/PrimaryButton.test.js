import React from 'react';
import { render, getAllByRole } from '@testing-library/react';
import PrimaryButton from './PrimaryButton';

describe('PrimaryButton component', () => {
    test('component renders', () => {
        const { getAllByRole } = render(<PrimaryButton />);

        expect(getAllByRole('button')).toHaveLength(1);
    });
});
