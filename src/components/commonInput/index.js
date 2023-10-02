import React from 'react'
import {
    FormGroup,
    Input,
    
    InputGroupText,
    InputGroup,
} from "reactstrap";
export default function Default(props) {
    const { icon, type, value, onChange, name, placeholder, onBlur, formik } = props
    return (
        <FormGroup>
            <InputGroup className="input-group-alternative">

                    <InputGroupText>
                        <i className={icon} />
                    </InputGroupText>

                <Input
                    style={{ 'height': '50px', fontSize: '18px' }}
                    name={name}
                    onChange={onChange}
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    onBlur={onBlur}
                />
            </InputGroup>
            {formik && (formik.touched[name] && formik.errors[name] && <div className="error" style={{ color: 'red', fontSize: '12px' }}>{formik.errors[name]}</div>)}
        </FormGroup>
    )
}
