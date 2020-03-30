// @flow
import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Container } from '@material-ui/core';
import './DragAndDrop.css';
import PrimaryButton from '../button/PrimaryButton';
import SecondaryButton from '../button/SecondaryButton';
import useDragAndDrop from './useDragAndDrop';

export default function DragAndDrop() {
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
    } = useDragAndDrop();

    return (
        <Container maxWidth="lg">
            <div className="drag-and-drop">
                <ReactSortable
                    id="unselected"
                    sort={false}
                    onAdd={(event) => handleAction(event)}
                    onRemove={(event) => handleAction(event)}
                    animation={300}
                    easing="cubic-bezier(1, 0, 0, 1)"
                    group="group"
                    className="unordered-list"
                    list={unselectedList}
                    setList={setUnselectedList}
                >
                    {unselectedList.map((item) => (
                        <div className="item" key={item.id}>
                            {item.name}
                        </div>
                    ))}
                </ReactSortable>
                <ReactSortable
                    id="selected"
                    sort={false}
                    animation={300}
                    easing="cubic-bezier(1, 0, 0, 1)"
                    group="group"
                    className="unordered-list"
                    list={selectedList}
                    setList={setSelectedList}
                >
                    {selectedList.map((item) => (
                        <div className="item" key={item.id}>
                            {item.name}
                        </div>
                    ))}
                </ReactSortable>
            </div>
            <div className="actions">
                <div className="primary">
                    <PrimaryButton
                        disabled={pastActions.length === 0}
                        onClick={undo}
                    >
                        Undo
                    </PrimaryButton>
                </div>
                <SecondaryButton
                    disabled={futureActions.length === 0}
                    onClick={redo}
                >
                    Redo
                </SecondaryButton>
            </div>
        </Container>
    );
}
