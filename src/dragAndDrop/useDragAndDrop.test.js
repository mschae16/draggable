// @flow
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useDragAndDrop, { ACTION_TYPES } from './useDragAndDrop';

describe('useDragAndDrop hook', () => {
    test('initial state', () => {
        const initialData = [
            { id: 1, name: 'One' },
            { id: 2, name: 'Two' },
            { id: 3, name: 'Three' },
            { id: 4, name: 'Four' },
            { id: 5, name: 'Five' },
            { id: 6, name: 'Six' },
            { id: 7, name: 'Seven' },
            { id: 8, name: 'Eight' },
            { id: 9, name: 'Nine' },
            { id: 10, name: 'Ten' },
        ];

        const { result } = renderHook(() => useDragAndDrop());

        const {
            unselectedList,
            setUnselectedList,
            selectedList,
            setSelectedList,
            handleAction,
            undo,
            redo,
            pastActions,
            futureActions,
        } = result.current;

        expect(unselectedList.length).toEqual(initialData.length);
        expect(typeof setUnselectedList).toBe('function');
        expect(selectedList.length).toEqual(0);
        expect(typeof setSelectedList).toBe('function');
        expect(typeof handleAction).toBe('function');
        expect(typeof undo).toBe('function');
        expect(typeof redo).toBe('function');
        expect(pastActions.length).toEqual(0);
        expect(futureActions.length).toEqual(0);
    });

    test('handle action', () => {
        const { result } = renderHook(() => useDragAndDrop());

        const { handleAction, pastActions, futureActions } = result.current;

        expect(typeof handleAction).toBe('function');
        expect(pastActions.length).toEqual(0);
        expect(futureActions.length).toEqual(0);

        const action = {
            type: ACTION_TYPES.REMOVE,
            item: {
                dataset: {
                    id: 1,
                },
            },
            oldIndex: 0,
            newIndex: 0,
        };

        const expectedAction = {
            actionType: ACTION_TYPES.REMOVE,
            itemId: action.item.dataset.id,
            previousIndex: action.oldIndex,
            newIndex: action.newIndex,
        };

        act(() => {
            handleAction(action);
        });

        expect(result.current.pastActions.length).toBe(1);
        expect(result.current.futureActions.length).toBe(0);
        expect(result.current.presentAction).toEqual(expectedAction);
    });
});
