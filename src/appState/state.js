import React, { useState } from 'react'
import AppContext from './context'
import { toast } from 'react-toastify';
import baseUrl from 'url';
import { useNavigate } from 'react-router-dom';
import basePath from 'basePath';

export default function AppState(props) {
  const [changePassword, setChangePassword] = useState(false)
  const [changeEmail, setChangeEmail] = useState(false)


  // COURSESS
  const [instructors, setinstructors] = useState([]);
  const [detailInstructorId, setdetailInstructorId] = useState('')
  const [viewInstructorDetails, setviewInstructorDetails] = useState(false);
  const [addInstructor, setaddInstructor] = useState(false);
  const [faqsIds, setFaqsIds] = useState([])
  const [courses, setcourses] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [addedFaqs, setAddedFaqs] = useState([]);
  const [showLoader, setShowLoader] = useState(true)
  const [instructorDetails, setInstructorDetails] = useState({
    "certificate_completion": ""
  })
  const [editInstructor, setEditInstructor] = useState(false)
  const [imagePath, setImagePath] = useState("")

  const [content, setContent] = useState('');
  const [addedContent, setAddedContent] = useState([]);
  const onContentChange = (value) => {
    setContent(value.target.value)
  }
  const addContent = (event) => {
    event.preventDefault()
    if (content != '') {
      setAddedContent(prevState => {
        let newState = prevState;
        newState.push(content);
        setContent('');
        return newState;
      })
    }
    else {
      toast.error('Can Not add Empty Field', {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }
  const [requirements, setRequirements] = useState('');
  const [addedRequirements, setAddedRequirements] = useState([]);

  const onRequirementsChange = (value) => {
    setRequirements(value.target.value)
  }
  const addRequirements = async (event) => {
    event.preventDefault()
    if (requirements !== '') {
      setAddedRequirements(prevState => {
        let newState = prevState;
        newState.push(requirements);
        setRequirements('');
        return newState;
      })
    }
    else {
      toast.error('Can Not add Empty Field', {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  const onValueChange = (val) => {
    setInstructorDetails({ ...instructorDetails, [val.target.name]: val.target.value });
  }
  const getData = async () => {
    setShowLoader(false)
    await fetch(`${baseUrl}courses/getAllCourses`).then(res => res.json()).then(async response => {
      if (response.status) {
        console.log(response.result)
        setinstructors(response.result);
        setShowLoader(true)
      }
      else {

        setShowLoader(true)
      }
    })

  }
  const getInstructors = async () => {
    await fetch(`${baseUrl}instructor/getAllInstructor`).then(res => res.json()).then(async response => {
      if (response.status) {
        setcourses(response.result);
      }

    })
  }
  const [queryId, setQueryId] = useState('')
  const [disableDelete, setDisableDelete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [addInstructorWithVideo, setaddInstructorWithVideo] = useState([])
  const onDelete = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    await fetch(`${baseUrl}courses/deleteCourse?id=${queryId}`, { method: 'DELETE' }).then(res => res.json()).then(response => {
      if (response.status) {
        getData()
        toast.success(`Entry Deleted`, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
      else {
        toast.error(response.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    })
    setConfirmDelete(false)
    setIsLoading(false)
  }
  const handleCheckboxChange = (event, optionId) => {
    const value = optionId;
    setaddInstructorWithVideo(prevState => {
      const updatedArray = [...prevState];
      const existingEntryIndex = updatedArray.findIndex(entry => entry.id === optionId);

      if (existingEntryIndex !== -1) {
        // Update existing entry

        updatedArray.splice(existingEntryIndex, 1);
      } else {
        // Add new entry
        updatedArray.push({
          "id": optionId,
          "video_link": ''
        });
      }

      return updatedArray;
    })
    setSelectedCheckboxes((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };
  const [previewImage, setPreviewImage] = useState('');
  const [showImageLoader, setshowImageLoader] = useState(false)
  const handleImageChange = async (event) => {
    setshowImageLoader(true)
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('image', event.target.files[0]);
      await fetch(`${baseUrl}image/uploadImage`, { method: 'POST', body: formData }).then(res => res.json()).then(response => {
        if (response.status) {
          setImagePath(response.result.path)
          const reader = new FileReader();
          reader.onload = (e) => {
            setPreviewImage(e.target.result);
          };

          reader.readAsDataURL(file);
        }
      }).catch(err => {
        toast.error('Could not upload Image', {
          position: toast.POSITION.TOP_RIGHT
        })
      })

    } else {
      setPreviewImage('');
    }
    setshowImageLoader(false)
  };
  const [addedCourseName, setAddedCourseName] = useState("")
  const navigator = useNavigate();
  const [addedCourseId, setAddedCourseId] = useState('')
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let error = true;

    setIsLoading(true)
    if (instructorDetails.name) {
      if (instructorDetails.duration) {
        if (instructorDetails.time) {
          if (instructorDetails.price) {
            if (instructorDetails.description) {
              if (instructorDetails.certificate_completion !== '') {
                if (imagePath) {
                  if (addInstructorWithVideo.length > 0) {
                    await Promise.all(
                      addInstructorWithVideo.map(async (data, index) => {
                        await fetch(`${baseUrl}coursesInstructorVideo/add`, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                            instructor_id: data.id,
                            video_url: data.video_link
                          })
                        }).then(res => res.json()).then(response => {
                          if (response.status) {
                            addInstructorWithVideo[index] = response.result.id
                            error = false;
                          }
                          else {
                            toast.error(response.message, {
                              position: toast.POSITION.TOP_RIGHT
                            })
                          }
                        })
                      })
                    )
                  }
                  else {
                    toast.error('Instructors are required', {
                      position: toast.POSITION.TOP_RIGHT
                    })
                  }
                  if (!error) {

                    await fetch(`${baseUrl}courses/addCourse`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        name: instructorDetails.name,
                        duration: instructorDetails.duration,
                        time: instructorDetails.time,
                        price: instructorDetails.price,
                        certificate_completion: instructorDetails.certificate_completion,
                        instructor: addInstructorWithVideo,
                        coverImage: imagePath,
                        outline: addedContent,
                        requirements: addedRequirements,
                        description: instructorDetails.description,
                      })
                    }).then(res => res.json()).then(response => {
                      if (response.status) {
                        setAddedCourseName(response.result.name)
                        setAddedCourseId(response.result)
                        setaddInstructor(false);
                        setInstructorDetails({
                          "week_days": "",
                          "weekend_classes": "",
                          "certificate_completion": ""
                        })
                        setImagePath("");
                        setInstructorDetails({})
                        setAddedContent([]);
                        setAddedRequirements([]);
                        setSelectedCheckboxes([]);
                        setPreviewImage(null);
                        setaddInstructorWithVideo([]);
                        setFaqsIds([]);
                        setAddedFaqs([]);
                        toast.success(`Course Added sucessfully`, {
                          position: toast.POSITION.TOP_RIGHT
                        });
                        getData();
                        navigator(`/${basePath}/admin/addFaqs`)
                      }
                      else {
                        toast.error(response.message, {
                          position: toast.POSITION.TOP_RIGHT
                        })
                      }
                    })
                  }
                }
                else {
                  toast.error('Image is required', {
                    position: toast.POSITION.TOP_RIGHT
                  })
                }
              }
              else {
                toast.error('Certification is required', {
                  position: toast.POSITION.TOP_RIGHT
                })
              }
            }
            else {
              toast.error('Description is required', {
                position: toast.POSITION.TOP_RIGHT
              })
            }
          }
          else {
            toast.error('Price is required', {
              position: toast.POSITION.TOP_RIGHT
            })
          }
        }
        else {
          toast.error('Hours are required', {
            position: toast.POSITION.TOP_RIGHT
          })
        }
      }
      else {
        toast.error('Months are required', {
          position: toast.POSITION.TOP_RIGHT
        })
      }
    }
    else {
      toast.error('Name is required', {
        position: toast.POSITION.TOP_RIGHT
      })
    }
    setIsLoading(false)
  }

  const updateInstructor = async (event) => {
    event.preventDefault();
    let error;
    setIsLoading(true)
    if (addInstructorWithVideo.length > 0) {
      await Promise.all(
        addInstructorWithVideo.map(async (data, index) => {
          if (data.object_id) {
            await fetch(`${baseUrl}coursesInstructorVideo/delete?id=${data.object_id}`, { method: 'DELETE' })
          }
          await fetch(`${baseUrl}coursesInstructorVideo/add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              instructor_id: data.id,
              video_url: data.video_link
            })
          }).then(res => res.json()).then(response => {
            if (response.status) {
              addInstructorWithVideo[index] = response.result.id
              error = false;
            }
            else {
              toast.error(response.message, {
                position: toast.POSITION.TOP_RIGHT
              })
            }
          })
        })
      )
    }
    if (!error) {
      if (instructorDetails.name && instructorDetails.duration && instructorDetails.time && instructorDetails.price
        && instructorDetails.certificate_completion !== '' && instructorDetails.description && imagePath) {
        await fetch(`${baseUrl}courses/updateCourse`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: detailInstructorId,
            name: instructorDetails.name,
            duration: instructorDetails.duration,
            time: instructorDetails.time,
            price: instructorDetails.price,
            certificate_completion: instructorDetails.certificate_completion,
            instructor: addInstructorWithVideo,
            coverImage: imagePath,
            content: addedContent,
            requirements: addedRequirements,
            faqs: faqsIds,
            description: instructorDetails.description,
            video_link: instructorDetails.video_link
          })
        }).then(res => res.json()).then(response => {
          if (response.status) {
            setEditInstructor(false);
            setInstructorDetails({
              name: '',
              designation: '',
              video_id: '',
              description: ''
            })
            setImagePath("");
            setInstructorDetails({})
            setAddedContent([]);
            setAddedRequirements([]);
            setSelectedCheckboxes([]);
            setPreviewImage(null);
            setaddInstructorWithVideo([]);
            setFaqsIds([]);
            setAddedFaqs([]);
            toast.success(`Course Updated sucessfully`, {
              position: toast.POSITION.TOP_RIGHT
            });

            getData();
          }
          else {
            toast.error(response.message, {
              position: toast.POSITION.TOP_RIGHT
            })
          }
        })
      }
      else {
        toast.error('All Fields are required', {
          position: toast.POSITION.TOP_RIGHT
        })
      }
    }
    setIsLoading(false)
  }
  const onHomePageChange = async (id) => {
    console.log(id)
    setShowLoader(false)
    await fetch(`${baseUrl}courses/updateHomepageStatus?id=${id}`, { method: 'PUT' }).then(res => res.json()).then(response => {
      if (response.status) {
        getData();
        toast.success('Status updated', {
          position: toast.POSITION.TOP_RIGHT
        })
      }
    })
    setShowLoader(true)
  }
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [showSideNavbar, setShowSideNavbar] = useState(true)
  return (
    <AppContext.Provider value={{
      changePassword, setChangePassword, changeEmail, setChangeEmail, showSideNavbar, setShowSideNavbar
      , instructors, setinstructors, detailInstructorId, setdetailInstructorId,
      viewInstructorDetails, setviewInstructorDetails, addInstructor, setaddInstructor,
      faqsIds, setFaqsIds, courses, setcourses, selectedCheckboxes, setSelectedCheckboxes,
      addedFaqs, setAddedFaqs, showLoader, setShowLoader, instructorDetails, setInstructorDetails,
      editInstructor, setEditInstructor, imagePath, setImagePath, content, setContent,
      addedContent, setAddedContent, onContentChange, addContent, requirements, setRequirements,
      addedRequirements, setAddedRequirements, onRequirementsChange, addRequirements,
      onValueChange, getData, getInstructors, queryId, setQueryId, disableDelete, setDisableDelete,
      isLoading, setIsLoading, onDelete, handleCheckboxChange, previewImage, setPreviewImage,
      handleImageChange, handleFormSubmit, updateInstructor, onHomePageChange,
      confirmDelete, setConfirmDelete, addedCourseId, setAddedCourseId, addInstructorWithVideo, setaddInstructorWithVideo,
      showImageLoader, addedCourseName, addedCourseName
    }}>
      {props.children}
    </AppContext.Provider>
  )
}
