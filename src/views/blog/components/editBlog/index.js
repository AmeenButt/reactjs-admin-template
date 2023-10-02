
import {
    Button,
    InputGroup,
    InputGroupAddon,
    Input,
} from "reactstrap";
// core components
import { useContext } from "react";
import { FormGroup, Grid, TextareaAutosize, Typography } from "@mui/material";
import { CircularProgress, MenuItem, Select } from "@material-ui/core";
import baseUrl from "url"
import AppContext from "appState/context";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS
import PopupClose from "components/popupClose";
import PopupBoxLarge from 'components/popupBoxLarge'
import { color } from "global";
import { buttonTextColor } from "global";
export default function Default(props) {
    const AppState = useContext(AppContext);
    const { isLoading } = AppState;
    let { setEditblog, editFormik, show, showImageLoader, handleImageChange, generateLink,
        genLink, copyToClipboard, selectedCategory, setSelectedCategory, categoires,
        description, setDescription } = props
    return (
        <>
            {show && <PopupBoxLarge>
                <PopupClose text='Update Blog' onClose={() => { setEditblog(false) }} />
                <form onSubmit={editFormik.handleSubmit}>
                    <Grid container columnSpacing={5}>
                        <Grid md={12} item>
                            <center style={{ position: 'relative', minHeight: '150px' }}>
                                {!showImageLoader ?
                                    <img height={'210px'} style={{
                                        borderRadius: handleImageChange ? "1%" : '0'
                                    }} src={`${editFormik.values.image && `${baseUrl}${editFormik.values.image}`}`} />
                                    : <CircularProgress size={44}
                                        style={{
                                            color: 'red',
                                            position: 'absolute',
                                            top: '40%',
                                            left: '50%',
                                            marginTop: '-12px',
                                            marginLeft: '-12px'
                                        }}
                                    />}
                            </center>
                        </Grid>
                        <Grid md={12} item><center style={{ marginBottom: '3%' }}>
                            {!showImageLoader && <label htmlFor="fileInput" className="custom-file-upload">
                                <Typography>Change Image</Typography>
                                <input onChange={handleImageChange} type="file" id="fileInput" />
                            </label>}</center>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormGroup>
                                <InputGroup className={`input-group-alternative mb-3 ${editFormik.touched.title && editFormik.errors.title ? 'error-input' : ''}`} style={{ border: editFormik.touched.title && editFormik.errors.title ? '1px solid red' : '1px solid #00000012' }}>
                                    <InputGroupAddon addonType="prepend">
                                    </InputGroupAddon>
                                    <TextareaAutosize
                                        minRows={5}
                                        style={{
                                            border: '0px',
                                            minWidth: '100%',
                                            padding: '20px',
                                            textAlign: 'justify'
                                        }}
                                        onChange={editFormik.handleChange}
                                        onBlur={editFormik.handleBlur}
                                        name='title'
                                        placeholder="Title"
                                        type="text"
                                        value={editFormik.values.title}
                                    />
                                </InputGroup>
                                {editFormik.touched.title && editFormik.errors.title && <div className="error" style={{ color: 'red', fontSize: '12px' }}>{editFormik.errors.title}</div>}
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Select style={{
                                width: '100%',
                                margin: '10px 0px'
                            }} value={selectedCategory ? selectedCategory : 'select'} onChange={(event) => {
                                setSelectedCategory(event.target.value)
                            }}>
                                <MenuItem
                                    value='select'>---Select Category---</MenuItem>
                                {categoires.map((item, index) =>
                                    <MenuItem
                                        key={index}
                                        value={item._id}>{item.name}</MenuItem>
                                )}
                            </Select>
                        </Grid>
                        <Grid md={12} item>
                            <FormGroup sx={{ position: 'relative' }}>
                                <InputGroup className={`input-group-alternative mb-1`}>
                                    <InputGroupAddon addonType="prepend">
                                        <label htmlFor="fileInput1" className="custom-file-upload1">
                                            <Typography>Generate Link</Typography>
                                            <Input onChange={generateLink} type="file" id="fileInput1" />
                                        </label>
                                    </InputGroupAddon>

                                    <Input
                                        value={genLink}
                                        style={{
                                            paddingLeft: '5px'
                                        }}
                                    />

                                </InputGroup>
                                <Typography onClick={copyToClipboard} className="mb-3" style={{
                                    backgroundColor: 'transparent',
                                    boxShadow: '0px',
                                    border: '1px solid #00000012',
                                    padding: '5px',
                                    cursor: 'pointer',
                                    textAlign: 'center'
                                }}>Copy</Typography>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormGroup>
                                <ReactQuill
                                    value={description}
                                    onChange={(value) => {
                                        setDescription(value);
                                    }}
                                    modules={{
                                        toolbar: [
                                            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                            ['bold', 'italic', 'underline'],
                                            ['link', 'image'],
                                            ['clean']
                                        ],
                                    }}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} align='center' sx={{ marginTop: '2%' }}>
                            <CommonButton
                                disabled={isLoading}
                                type='submit'
                                isLoading={isLoading}
                                text='Update'
                            />
                        </Grid>
                    </Grid>
                </form>
            </PopupBoxLarge>}
        </>
    )
}
