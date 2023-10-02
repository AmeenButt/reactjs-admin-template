import basePath from "basePath";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import baseUrl from "url";

const ErrorPage = () => {
    const [isloading, setIsloading] = useState(false)
    let navigator = useNavigate()
    const retry = async ()=>{
        setIsloading(true)
        await fetch(`${baseUrl}`).then(res=>{
            navigator(`${localStorage.getItem('jwt-token') ? `/${basePath}/admin`:`/${basePath}/auth`}`)
        }).catch(err=>{
            console.log(err)
            toast.error('Server Error',{
                position:toast.POSITION.TOP_RIGHT
            })
        })
        setIsloading(false)
    }
    return (
        <center>
            <div>
            <h1>Server Error</h1>
            <p>Sorry, there was a problem with the server. Please try again later.</p>
            {isloading && <div><ClipLoader/></div> }
            <Link onClick={retry}>Retry now</Link>
        </div>
        </center>
    );
};

export default ErrorPage;