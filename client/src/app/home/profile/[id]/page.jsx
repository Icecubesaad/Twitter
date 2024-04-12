'use client';
import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import AppContext from '@/context/AppContext';
import Link from 'next/link';
import Tweets from '@/components/profile/Tweets';
import Comments from '@/components/profile/Comments';
import Likes from '@/components/profile/Likes';
import { useRouter } from 'next/navigation';

function Page({ params }) {
    //TODO Modularity
    const [activeTab, setActiveTab] = useState(1);
    const [currentOption, setCurrentOption] = useState(<Tweets id={params.id} />);
    const [canFollow, setcanFollow] = useState(false);
    const [Followers, setFollowers] = useState(0);
    const [followed, setfollowed] = useState(false);
    const context = useContext(AppContext);
    const { setSingleUserProfile, SingleUserProfile, Userinfo, setUserinfo } = context;
    const router = useRouter()
    const fetchSingleUserDetails = async () => {
        const request = await fetch(`/api/get/fetchSingleUserDetails/${params.id}`, {
            method: "GET"
        });
        const response = await request.json();
        if (response.success) {
            setSingleUserProfile((prevUserProfile) => ({
                ...prevUserProfile,
                Image: response.data.Image,
                Followers: response.data.Followers,
                Following: response.data.Following,
                total_Likes: response.data.total_likes,
                id: response.data._id,
                Username: response.data.Username,
                Usertag: response.data.Usertag
            }));
            setFollowers(response.data.Followers)
        } else {
            console.log(response);
        }
    };

    const changeOption = (option) => {
        if (option === currentOption) {
            return;
        } else {
            setCurrentOption(option);
        }
    };
    function getCookie(cookieName) {
        var cookies = window.document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.indexOf(cookieName + "=") === 0) {
                return cookie.substring(cookieName.length + 1);
            }
        }
        return null;
    }
    const fetchUser = async (token) => {
        const request = await fetch("/api/get/getUser", {
            method: "GET",
            headers: {
                "token": token
            }
        });
        const response = await request.json();
        if (response.success) {
            setUserinfo({
                Email: response.data.Email,
                Image: response.data.Image,
                Followers: response.data.Followers,
                Following: response.data.Following,
                Like_list: response.data.Like_list,
                id: response.data._id,
                Username: response.data.Username,
                Usertag: response.data.Usertag,
                total_likes: response.data.Total_likes,
                Followers_list: response.data.Follower_list,
                Following_list: response.data.Following_list
            });
            if (response.data._id !== params.id) {
                response.data.Following_list.map((e) => {
                    if (e == params.id) {
                        setfollowed(true)
                    }
                    console.log(e);
                });
                setcanFollow(true);
            }
        }
    };


    const changeActiveTab = (currentId) => {
        const element_id = currentId + "optprofile";
        const element_to_change = window.document.getElementById(element_id);
        element_to_change.classList.add("active");
    };

    const changePreviousTab = (currentId) => {
        if (activeTab === currentId) {
            return null;
        } else {
            const element_id = currentId + "optprofile";
            const element_to_change = window.document.getElementById(element_id);
            element_to_change.classList.remove("active");
        }
    };

    const changeActive = (currentId) => {
        const element_id = activeTab + "optprofile";
        const element_to_revert = window.document.getElementById(element_id);
        element_to_revert.classList.remove("active");
        setActiveTab(currentId);
        const element_id_2 = currentId + "optprofile";
        const element_to_change = window.document.getElementById(element_id_2);
        element_to_change.classList.add("active");
    };

    const follow = async () => {
        if (Userinfo.id == "") {
            router.push('/Login')
        }
        setFollowers(e=>e+1)
        setfollowed(true)
        const request = await fetch(`/api/post/follow/${Userinfo.id}/${params.id}`, {
            method: "POST"
        })
        const response = await request.json()
        if (response.success) {
            return
        }
        else {
            console.log("couldnt follow the user")
        }
    }
    useEffect(() => {
        if (Userinfo.id == "") {
            const token = getCookie('token')
            fetchUser(token)
        }
        if (Userinfo.id != "" && Userinfo.id != params.id) {
            Userinfo.Following_list.map(e => { if (e === params.id) { setfollowed(true) } console.log(e, params.id) })
            setcanFollow(true)
        }
        fetchSingleUserDetails();
    }, []);

    return (
        <div className='w-full h-[130vh] overflow-y-scroll scroll'>
            <div className='banner bg-blue-500 h-[20%] w-full'></div>
            <div className='main bg-black'>
                <div className='bg-blue-500 w-[125px] h-[125px] flex justify-center items-center border-[1px] rounded-full relative top-[-55px]'>
                    <Image src={SingleUserProfile.Image} alt='profile' height={125} width={125} className='border-[1px] border-transparent rounded-full' />
                </div>
                <div className='flex flex-row justify-between'>
                    <div>
                        <p>{SingleUserProfile.Username}</p>
                        <p className='text-blue-500'>@{SingleUserProfile.Usertag}</p>
                    </div>
                    {
                        canFollow ? followed ? <button className="bg-white text-black w-auto h-[30px] pr-2 pl-2 border-[1px] border-transparent rounded-xl">Following </button> : <button onClick={follow} className="bg-white text-black w-auto h-[30px] pr-2 pl-2 border-[1px] border-transparent rounded-xl">Follow</button> : null
                    }
                </div>
                <p className=' h-[auto] mb-4 w-full mt-4'>
                    Edit bio in <button className='text-blue-500'>settings</button>
                </p>
                <div className='flex flex-row gap-10'>
                    <Link href={`/home/profile/${params.id}/Follower`}>{Followers} followers</Link>
                    <Link href={`/home/profile/${params.id}/Following`}>{SingleUserProfile.Following} following</Link>
                </div>
                <div className='options flex flex-row justify-between mt-5'>
                    <button id='1optprofile' onMouseEnter={() => {
                        changeActiveTab(1);
                    }}
                        onMouseLeave={() => {
                            changePreviousTab(1);
                        }} className=' optprofile active border-white border-[1px] w-full pt-4 pb-4' onClick={() => { changeOption(<Tweets id={params.id} />); changeActive(1); }}>Tweets</button>
                    <button id='2optprofile' onMouseEnter={() => {
                        changeActiveTab(2);
                    }}
                        onMouseLeave={() => {
                            changePreviousTab(2);
                        }} className=' optprofile border-white border-[1px] w-full pt-4 pb-4' onClick={() => { changeOption(<Comments id={params.id} />); changeActive(2); }}>Replies</button>
                    <button id='3optprofile' onMouseEnter={() => { changeActiveTab(3); }}
                        onMouseLeave={() => {
                            changePreviousTab(3);
                        }} className=' optprofile border-white border-[1px] w-full pt-4 pb-4' onClick={() => { changeOption(<Likes id={params.id} />); changeActive(3); }}>Likes</button>
                </div>
                <div className='w-full h-screen'>
                    {currentOption}
                </div>
            </div>
        </div>
    );
}

export default Page;
