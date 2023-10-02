import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FormGroup } from 'reactstrap'

export default function Default(props) {
    const { value, onChange } = props
    return (
        <FormGroup>
            <ReactQuill
                value={value}
                onChange={onChange}
                modules={{
                    toolbar: [
                        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['bold', 'italic', 'underline'],
                        ['link', 'image'],
                        ['clean'],

                    ],
                }}

            />
        </FormGroup>
    )
}
