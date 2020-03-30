// @flow
import { useState, useReducer } from 'react';

type DefaultState = {
    pastActions: Array<any>,
    presentAction: {} | null,
    futureActions: Array<any>,
};

type Event = {
    type: string,
    item: {
        dataset: {
            id: number,
        },
    },
    oldIndex: number,
    newIndex: number,
};

export const ACTION_TYPES = {
    ADD: 'add',
    REMOVE: 'remove',
};

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

const ACTIONS = {
    UNDO: 'undo',
    REDO: 'redo',
    DRAG_AND_DROP: 'drag-and-drop',
};

const defaultState: DefaultState = {
    pastActions: [],
    presentAction: null,
    futureActions: [],
};

const historyReducer = (state = defaultState, action) => {
    const { pastActions, futureActions } = state;

    switch (action.type) {
        case ACTIONS.UNDO:
            const newPastActions = pastActions.slice(0, pastActions.length - 1);

            return {
                pastActions: newPastActions,
                presentAction: action.currentAction,
                futureActions: [action.currentAction, ...futureActions],
            };
        case ACTIONS.REDO:
            const newFuture = futureActions.slice(1);

            return {
                pastActions: [...pastActions, action.currentAction],
                presentAction: action.currentAction,
                futureActions: newFuture,
            };
        case ACTIONS.DRAG_AND_DROP:
            return {
                pastActions: [...pastActions, action.currentAction],
                presentAction: action.currentAction,
                futureActions: [],
            };
        default:
            return state;
    }
};

export default function useDragAndDrop() {
    const [unselectedList, setUnselectedList] = useState(initialData);
    const [selectedList, setSelectedList] = useState([]);

    const [history, historyDispatch] = useReducer(historyReducer, defaultState);
    const { pastActions, presentAction, futureActions } = history;

    const retrieveItemById = (id, list) => {
        return list.find((element) => element.id === id);
    };

    const updateList = (list, setList, index, count, item = null) => {
        const newList = [...list];

        if (!item) {
            newList.splice(index, count);
        } else {
            newList.splice(index, count, item);
        }

        return setList(newList);
    };

    const undo = () => {
        if (pastActions.length === 0) return;

        const lastAction = pastActions[pastActions.length - 1];
        const { actionType, itemId, previousIndex, newIndex } = lastAction;

        const currentAction = {
            ...lastAction,
            previousIndex: newIndex,
            newIndex: previousIndex,
        };

        if (actionType === ACTION_TYPES.REMOVE) {
            currentAction.actionType = ACTION_TYPES.ADD;

            const item = retrieveItemById(itemId, selectedList);
            if (!item) return;

            updateList(
                unselectedList,
                setUnselectedList,
                previousIndex,
                0,
                item
            );
            updateList(selectedList, setSelectedList, newIndex, 1);
        }

        if (actionType === ACTION_TYPES.ADD) {
            currentAction.actionType = ACTION_TYPES.REMOVE;

            const item = retrieveItemById(itemId, unselectedList);
            if (!item) return;

            updateList(selectedList, setSelectedList, previousIndex, 0, item);
            updateList(unselectedList, setUnselectedList, newIndex, 1);
        }

        historyDispatch({
            type: ACTIONS.UNDO,
            currentAction,
        });
    };

    const redo = () => {
        if (futureActions.length === 0) return;

        const futureAction = futureActions[0];
        const { actionType, itemId, previousIndex, newIndex } = futureAction;

        const currentAction = {
            ...futureAction,
            previousIndex: newIndex,
            newIndex: previousIndex,
        };

        if (actionType === ACTION_TYPES.REMOVE) {
            currentAction.actionType = ACTION_TYPES.ADD;
            const item = retrieveItemById(itemId, selectedList);

            if (!item) return;

            updateList(
                unselectedList,
                setUnselectedList,
                previousIndex,
                0,
                item
            );
            updateList(selectedList, setSelectedList, newIndex, 1);
        }

        if (actionType === ACTION_TYPES.ADD) {
            currentAction.actionType = ACTION_TYPES.REMOVE;
            const item = retrieveItemById(itemId, unselectedList);

            if (!item) return;

            updateList(selectedList, setSelectedList, previousIndex, 0, item);
            updateList(unselectedList, setUnselectedList, newIndex, 1);
        }

        historyDispatch({
            type: ACTIONS.REDO,
            currentAction,
        });
    };

    const handleAction = (event: Event) => {
        const currentAction = {
            actionType: event.type,
            itemId: parseInt(event.item.dataset.id, 10),
            previousIndex: event.oldIndex,
            newIndex: event.newIndex,
        };

        historyDispatch({
            type: ACTIONS.DRAG_AND_DROP,
            currentAction,
        });
    };

    // console.log({ unselectedList, selectedList, history });

    return {
        unselectedList,
        setUnselectedList,
        selectedList,
        setSelectedList,
        handleAction,
        undo,
        redo,
        pastActions,
        presentAction,
        futureActions,
    };
}
