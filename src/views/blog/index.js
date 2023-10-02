import {
    Card,
    CardHeader,
    Table,
    Container,
    Row,
    Button,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useContext, useEffect } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
import AdminNavbar from "components/Navbars/AdminNavbar";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from "@mui/material";
import AppContext from "appState/context";
import ConfirmDelete from 'components/deleteConfirmation'
import './index.css'
import AddBlog from "views/blog/components/addBlog"
import EditBlog from "views/blog/components/editBlog"
import ViewBlog from "views/blog/components/viewBlog"
import useBlog from "hooks/useBlog";
import CommonButton from 'components/globalButton'

const Tables = () => {
    const {
        formik,
        description, setDescription,
        genLink,
        generateLink,
        editFormik,
        showLoader,
        showImageLoader,
        addblog, setAddblog,
        viewblogDetails, setviewblogDetails,
        editblog, setEditblog,
        setEditblogId,
        blogs,
        categoires,
        selectedCategory, setSelectedCategory,
        detailblogId, setDetailblogId,
        setblogId,
        onDelete,
        getData,
        getCategories,
        handleAddImage,
        handleImageChange,
        onClose, handleSort, extractPlainText, copyToClipboard,
        loader } = useBlog()
    const AppState = useContext(AppContext);
    const { confirmDelete, setConfirmDelete } = AppState;
    useEffect(() => {
        getData()
        getCategories()
    }, [])
    if (loader) {
        return <>
            <Header />
            <AdminNavbar
                brandText='blogs'
            />
            <ClipLoader
                color={'#2a62ff'}
                loading={true}
                cssOverride={{
                    display: "block",
                    margin: "5% auto",
                    borderColor: "red",
                }}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            /></>
    }
    // Parse the description and identify links
    return (
        <div style={{ postion: 'relative' }}>
            <AddBlog
                setAddblog={setAddblog}
                formik={formik}
                show={addblog}
                showImageLoader={showImageLoader}
                handleAddImage={handleAddImage}
                generateLink={generateLink}
                genLink={genLink}
                copyToClipboard={copyToClipboard}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categoires={categoires}
                description={description}
                setDescription={setDescription}
            />
            <EditBlog
                setEditblog={setEditblog}
                editFormik={editFormik}
                show={editblog}
                showImageLoader={showImageLoader}
                handleImageChange={handleImageChange}
                generateLink={generateLink}
                genLink={genLink}
                copyToClipboard={copyToClipboard}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categoires={categoires}
                description={description}
                setDescription={setDescription}
            />
            {confirmDelete && <ConfirmDelete onDelete={onDelete} text='Blog' />}
            <ViewBlog
                setviewblogDetails={setviewblogDetails}
                show={viewblogDetails}
                blogs={blogs}
                detailblogId={detailblogId}
            />
            <Header />
            <AdminNavbar
                brandText='blogs'
            />
            {/* Page content */}
            <Container className="mt--7" fluid style={{ 'marginBottom': '60px' }}>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h1 className="mb-0">Blogs</h1>
                                <Box>
                                    <CommonButton
                                        type='click'
                                        onClick={() => { setAddblog(true) }}
                                        text='Add blog'
                                        
                                    />
                                    {/* <Button varient='contained' onClick={() => { setAddblog(true) }} style={{ backgroundColor: '#F9AB00', color: 'white', fontSize: '16px', border: '0px' }}>Add blog</Button> */}
                                </Box>
                            </CardHeader>
                            {blogs.length > 0 ? <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col" style={{ fontSize: '14px', color: 'black' }}>ID</th>
                                        <th scope="col" style={{ fontSize: '14px', color: 'black' }}>Title
                                            <span style={{ marginLeft: '5px' }}>
                                                <i className="fa fa-sort" onClick={() => { handleSort('name') }} />
                                            </span>
                                        </th>
                                        <th scope="col" style={{ fontSize: '14px', color: 'black' }}>Description</th>

                                        <th scope="col" style={{ fontSize: '14px', color: 'black' }}>Date Added
                                            <span style={{ marginLeft: '5px' }}>
                                                <i className="fa fa-sort" onClick={() => { handleSort('dateAdded') }} />
                                            </span></th>
                                        <th scope="col" style={{ textAlign: 'right', fontSize: '14px', color: 'black' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showLoader ? blogs.map((blog, index) => <tr key={index}>
                                        <td>
                                            <div className="avatar-group">
                                                {blog._id}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="avatar-group">
                                                {blog.title.length > 20 ? `${blog.title.substring(0, 20)}...` : blog.title}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="avatar-group">
                                                {blog.description.length > 10 ? `${extractPlainText(blog.description, 10)}...` : `${extractPlainText(blog.description, 10)}`}
                                            </div>
                                        </td>

                                        <td>
                                            <div className="avatar-group">
                                                {blog.created_at.substring(0, 10)}
                                            </div>
                                        </td>
                                        <td className="text-right">
                                            <Tooltip title="View" style={{ color: 'black', align: 'right', cursor: 'pointer', zIndex: '1111111' }}>
                                                <IconButton style={{ color: 'green' }} onClick={(e) => {
                                                    e.preventDefault();
                                                    setviewblogDetails(true);
                                                    setDetailblogId(blog._id);
                                                }}><VisibilityIcon /></IconButton>
                                            </Tooltip>
                                            <Tooltip title="Edit" style={{ color: 'black', align: 'right', cursor: 'pointer', zIndex: '1111111' }}>
                                                <IconButton style={{ color: 'blue' }} onClick={(e) => {
                                                    e.preventDefault();
                                                    editFormik.values.title = blog.title
                                                    editFormik.values.image = blog.cover_image
                                                    setDescription(blog.description)
                                                    setSelectedCategory(blog.category._id)
                                                    setEditblogId(blog._id)
                                                    setEditblog(true);
                                                }}><EditIcon /></IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete" style={{ color: 'black', align: 'right', cursor: 'pointer', zIndex: '1111111' }}>
                                                <IconButton style={{ color: 'red' }} onClick={(e) => {
                                                    e.preventDefault();
                                                    setblogId(blog._id)
                                                    setConfirmDelete(true)
                                                }}><DeleteIcon /></IconButton>
                                            </Tooltip>



                                        </td>
                                    </tr>

                                    ) : <ClipLoader
                                        color={'#F9AB00'}
                                        loading={true}
                                        cssOverride={{
                                            display: "block",
                                            margin: "5% 0% 5% 300%",
                                            borderColor: "red",
                                        }}
                                        size={100}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />}
                                </tbody>
                            </Table> : <center><Typography padding='60px 10px'>No blogs to display</Typography></center>}
                        </Card>
                    </div>
                </Row>

            </Container>
        </div>
    );
};

export default Tables;
