// @flow
import React from 'react';
import Button from '@material-ui/core/Button';

export default function PrimaryButton(props: any) {
    return (
        <Button
            variant="contained"
            color="primary"
            onClick={props.onClick}
            disabled={props.disabled}
            classes={props.classes}
            {...props}
        >
            {props.children}
        </Button>
    );
}
