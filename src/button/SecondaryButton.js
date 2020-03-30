// @flow
import React from 'react';
import Button from '@material-ui/core/Button';

export default function SecondaryButton(props: any) {
    return (
        <Button
            variant="text"
            color="secondary"
            onClick={props.onClick}
            disabled={props.disabled}
            classes={props.classes}
            {...props}
        >
            {props.children}
        </Button>
    );
}
