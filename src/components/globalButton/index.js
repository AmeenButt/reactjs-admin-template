import { color, buttonTextColor } from 'global';
import React from 'react'
import { CircularProgress } from "@material-ui/core";
import {
  Button,
} from "reactstrap";
export default function Default(props) {
    let { type, isLoading, text, onClick, disabled, marginClass } = props;
    return (
        <Button disabled={disabled} style={{ minHeight: '50px', width: '170px', backgroundColor:color , color:buttonTextColor, border:'0px'}} className={marginClass} type={type} onClick={onClick ? onClick : () => { }} >
            {isLoading ? (
                <CircularProgress size={24} style={{ color: 'white', position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />
            ) : (
                text
            )}
        </Button>
    )
}
