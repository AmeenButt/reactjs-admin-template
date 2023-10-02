import { useContext,  useState } from "react";
import baseUrl from "url"
import { toast } from 'react-toastify';
import AppContext from "appState/context";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import basePath from "basePath";
import { useNavigate } from "react-router-dom";
export default () => {
    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        image: Yup.string().required('Image is required'),
    });
    const initialValues = {
        title: '',
        image: ''
    };
    const initialValues1 = {
        title: '',
        image: ''
    };
    const formik = useFormik({
        initialValues: initialValues1,
        validationSchema,
        onSubmit: (values) => {
            submitblogForm(values)
        },
    });
    let navigator = useNavigate()
    const [loader, setloader] = useState(true)
    const [description, setDescription] = useState('');
    const [genLink, setGenLink] = useState('');
    const generateLink = async (event) => {
        console.log(event)
        try {
            if (event.target.files[0]) {
                const formData = new FormData();
                formData.append('image', event.target.files[0]);
                await fetch(`${baseUrl}image/upload`, {
                    method: 'POST',
                    body: formData
                }).then(res => res.json()).then(response => {
                    console.log(response)
                    if (response.status) {
                        console.log(response)
                        setGenLink(`${baseUrl}${response.result}`)
                        const inputElement = document.createElement('input');
                        inputElement.value = `${baseUrl}${response.result}`;
                        document.body.appendChild(inputElement);
                        inputElement.select();
                        document.execCommand('copy');
                        document.body.removeChild(inputElement);
                        toast.success('Generated and copied', {
                            position: toast.POSITION.TOP_RIGHT
                        })
                    }
                    else {
                        toast(`Unable to Generate`, {
                            position: toast.POSITION.TOP_RIGHT
                        })
                    }
                }).catch(err => {
                    navigator(`/${basePath}/error`);

                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    const editFormik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            submitEditblogForm(values)
        },
    });
    const [showLoader, setShowLoader] = useState(true)
    const [showImageLoader, setshowImageLoader] = useState(false)
    const [addblog, setAddblog] = useState(false)
    const [viewblogDetails, setviewblogDetails] = useState(false);
    const [editblog, setEditblog] = useState(false)
    const [editblogId, setEditblogId] = useState('')
    const [blogs, setblogs] = useState([]);
    const [categoires, setCategoires] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [detailblogId, setDetailblogId] = useState('')
    const AppState = useContext(AppContext);
    const { setConfirmDelete,  setIsLoading } = AppState;
    const [blogId, setblogId] = useState('')
    const [sortOrder, setSortOrder] = useState('asc');

    const submitblogForm = async (values) => {
        setIsLoading(true)
        try {
            if (selectedCategory) {
                await fetch(`${baseUrl}blog/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: values.title,
                        description: description,
                        cover_image: values.image,
                        category: selectedCategory
                    })
                }).then(res => res.json()).then(response => {
                    if (response.status) {
                        toast.success('blog Added', {
                            position: toast.POSITION.TOP_RIGHT
                        })
                        setAddblog(false)
                        getData()
                        formik.values.title = ''
                        formik.values.description = ''
                        setDescription('')
                        setGenLink('')
                        formik.values.image = ''
                    }
                    else {
                        toast.error(response.message, {
                            position: toast.POSITION.TOP_RIGHT
                        })
                    }
                }).catch(err => {
                    // navigator(`/${basePath}/error`);

                })
            }
            else {
                toast.error('Select Category', {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }
    const submitEditblogForm = async (values) => {
        setIsLoading(true)
        try {
            await fetch(`${baseUrl}blog/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    blog_id: editblogId,
                    title: values.title,
                    description: description,
                    cover_image: values.image,
                    category: selectedCategory
                })
            }).then(res => res.json()).then(response => {
                if (response.status) {
                    toast.success('blog Updated', {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    setEditblog(false)
                    getData()
                    editFormik.values.title = ''
                    editFormik.values.image = ''
                    editFormik.values.description = ''
                    setDescription('')
                    setGenLink('')
                }
                else {
                    toast.error(response.message, {
                        position: toast.POSITION.TOP_RIGHT
                    })
                }
            }).catch(err => {
                navigator(`/${basePath}/error`);

            })
        } catch (err) {
            console.log(err)

        }
        setIsLoading(false)
    }
    const onDelete = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            await fetch(`${baseUrl}blog/delete?blog_id=${blogId}`, { method: 'DELETE' }).then(res => res.json()).then(response => {
                getData()
                toast.success(`Entry Deleted`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }).catch(err => {
                navigator(`/${basePath}/error`);

            })
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false);
        setConfirmDelete(false)
    }
    const getData = async () => {
        try {
            await fetch(`${baseUrl}blog/get`).then(res => res.json()).then(response => {
                if (response.status) {
                    console.log(response.result)
                    setblogs(response.result);
                }
            }).catch(err => {
                navigator(`/${basePath}/error`);

            })
        } catch (err) {
            console.log(err)

        }
        setloader(false);
    }
    const getCategories = async () => {
        try {
            await fetch(`${baseUrl}blogCategory/get`).then(res => res.json()).then(response => {
                if (response.status) {
                    console.log(response.result)
                    setCategoires(response.result);
                }
            }).catch(err => {
                navigator(`/${basePath}/error`);

            })
        } catch (err) {
            console.log(err)

        }
        setloader(false);
    }
    const handleAddImage = async (event) => {
        setshowImageLoader(true)
        try {
            if (event.target.files[0]) {
                const formData = new FormData();
                formData.append('image', event.target.files[0]);
                await fetch(`${baseUrl}image/upload`, {
                    method: 'POST',
                    body: formData
                }).then(res => res.json()).then(response => {
                    if (response.status) {
                        formik.values.image = response.result
                    }
                    else {
                        toast(`Unable to upload`, {
                            position: toast.POSITION.TOP_RIGHT
                        })
                    }
                }).catch(err => {
                    navigator(`/${basePath}/error`);

                })
            }
        } catch (err) {
            console.log(err)

        }
        setshowImageLoader(false)
    }
    const handleImageChange = async (event) => {
        setshowImageLoader(true)
        try {
            if (event.target.files[0]) {
                const formData = new FormData();
                formData.append('image', event.target.files[0]);
                await fetch(`${baseUrl}image/upload`, {
                    method: 'POST',
                    body: formData
                }).then(res => res.json()).then(response => {
                    if (response.status) {
                        editFormik.values.image = response.result
                    }
                    else {
                        toast(`Unable to upload`, {
                            position: toast.POSITION.TOP_RIGHT
                        })
                    }
                }).catch(err => {
                    navigator(`/${basePath}/error`);

                })
            }
        } catch (err) {
            console.log(err)

        }
        setshowImageLoader(false)
    }
    const onClose = () => {
        editFormik.values.title = ''
        editFormik.values.image = ''
        editFormik.values.description = ''
        formik.values.title = ''
        formik.values.image = ''
        formik.values.description = ''
        setDescription('')
        setGenLink('')
    }
    const handleSort = (column) => {
        const sortedInstructors = [...blogs].sort((a, b) => {
            if (column === 'name') {
                return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else if (column === 'dateAdded') {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            }
            // Handle other columns if needed
            return 0;
        });

        setblogs(sortedInstructors);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sorting order
    };
    const extractPlainText = (htmlContent, wordLimit) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        const textContent = tempDiv.textContent || tempDiv.innerText;

        if (textContent.length <= wordLimit) {
            return textContent;
        } else {
            const limitedText = textContent.slice(0, wordLimit);
            return `${limitedText}...`;
        }
    };
    // Function to copy the text inside the input
    const copyToClipboard = () => {
        const inputElement = document.createElement('input');
        inputElement.value = genLink;
        document.body.appendChild(inputElement);
        inputElement.select();
        document.execCommand('copy');
        document.body.removeChild(inputElement);
        toast.success('Copied to clipboard', {
            position: toast.POSITION.TOP_RIGHT
        })
    };
    return {
        validationSchema,
        initialValues,
        initialValues1,
        formik,
        description, setDescription,
        genLink, setGenLink,
        generateLink,
        editFormik,
        showLoader, setShowLoader,
        showImageLoader, setshowImageLoader,
        addblog, setAddblog,
        viewblogDetails, setviewblogDetails,
        editblog, setEditblog,
        editblogId, setEditblogId,
        blogs, setblogs,
        categoires, setCategoires,
        selectedCategory, setSelectedCategory,
        detailblogId, setDetailblogId,
        blogId, setblogId,
        sortOrder, setSortOrder,
        submitblogForm,
        submitEditblogForm,
        onDelete,
        getData,
        getCategories,
        handleAddImage,
        handleImageChange,
        onClose,handleSort,extractPlainText,copyToClipboard,
        loader, setloader
    }
}