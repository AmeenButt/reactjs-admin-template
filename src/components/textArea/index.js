import React from 'react'
import { TextareaAutosize } from "@mui/material";
import {
    FormGroup,
    InputGroup,
} from "reactstrap";
import 'App.css'
export default function Default(props) {
    const { type, value, onChange, name, placeholder, onBlur, formik, rows } = props
    return (
        <FormGroup>
            <InputGroup className="input-group-alternative">
                <TextareaAutosize
                    style={{ padding: '20px', fontSize: '18px', border: '0px', minWidth: '100%', maxWidth: '100%' }}
                    minRows={rows ? rows : 5}
                    name={name ? name : ''}
                    onChange={onChange ? onChange : () => { }}
                    placeholder={placeholder ? placeholder : ''}
                    type={type ? type : 'text'}
                    value={value && value}
                    onBlur={onBlur && onBlur}
                />
            </InputGroup>
            {formik && (formik.touched.description && formik.errors.description &&
                <div className="error" style={{ color: 'red', fontSize: '12px' }}>{formik.errors.description}</div>)}
        </FormGroup>
    )
}
