import { useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
import baseUrl from "url"
import AppContext from "appState/context";
import PopupClose from "components/popupClose";
import PopupBoxLarge from 'components/popupBoxLarge'
export default function Default(props) {
    const AppState = useContext(AppContext);
    let { setviewblogDetails, show, blogs,detailblogId} = props
    return (
        <>
            {show && <PopupBoxLarge>
                <PopupClose text='Add Plan' onClose={() => { setviewblogDetails(false) }} />
                {blogs.map((blog, index) => {
                        return (blog._id === detailblogId) && <Box key={index}>
                            <Grid container style={{ borderBottom: '1px solid #00000012' }}>
                                <Grid item xs={12} sm={12} md={12} lg={12} align='center' sx={{ padding: '10px' }}>
                                    <Box sx={{
                                        position: 'relative',

                                    }}>
                                        <img src={`${baseUrl}${blog.cover_image}`} alt='img' style={{ position: 'relative', maxWidth: '100%', maxHeight: '100%' }} />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container style={{ borderBottom: '1px solid #00000012' }}>
                                <Grid item xs={12} sm={12} md={12} lg={12} align='left' sx={{ padding: '10px' }}>
                                    <Typography fontSize={'20px'} fontWeight={'600'} style={{ color: 'black' }}>Title</Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} align='left' sx={{ padding: '10px', overflow: 'auto' }}>
                                    <Typography fontSize={'20px'} fontWeight={'500'} textAlign='justify'>{blog.title}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container style={{ borderBottom: '1px solid #00000012' }}>
                                <Grid item xs={12} sm={12} md={12} lg={12} align='left' sx={{ padding: '10px' }}>
                                    <Typography fontSize={'20px'} fontWeight={'600'} style={{ color: 'black' }}>Category</Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} align='left' sx={{ padding: '10px', overflow: 'auto' }}>
                                    <Typography fontSize={'20px'} fontWeight={'500'} textAlign='justify'>{blog.category?.name}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container style={{ borderBottom: '1px solid #00000012' }}>
                                <Grid item xs={12} sm={12} md={12} lg={12} align='left' sx={{ padding: '10px' }}>
                                    <Typography fontSize={'20px'} fontWeight={'600'} style={{ color: 'black' }}>Description</Typography>
                                </Grid>
                                {/* <Grid item xs={12} sm={12} md={12} lg={12} align='left' sx={{ padding: '10px', overflow: 'auto' }}> */}
                                {/* <Typography fontSize={'20px'} fontWeight={'500'} textAlign='justify'>{blog.description}</Typography> */}
                                <div
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: '500',
                                        textAlign: 'justify',
                                        maxWidth: '90vw',
                                        overflow: 'hidden',
                                        padding: '10px',
                                        overflow: 'auto'
                                    }}
                                >
                                    {/* {blog.description} */}
                                    <div dangerouslySetInnerHTML={{ __html: blog.description }} />
                                </div>

                            </Grid>
                        </Box>
                    })}
            </PopupBoxLarge>}
        </>
    )
}
