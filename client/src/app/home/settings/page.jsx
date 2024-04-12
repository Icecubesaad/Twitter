import React from 'react'
import SearchTweet from '@/components/Tweet/SearchTweet'
import SearchSettings from '@/components/settings/SearchSettings'
import SearchOptions from '@/components/settings/SearchOptions'
function page() {
  return (
    <div className=' w-full h-auto pt-10'>
      <h1 className=' text-2xl text-white font-bold'>Settings</h1>
    <div className='h-full pt-4  w-full flex flex-col justify-center items-center'>
    <div className='w-full flex justify-center'>
      <SearchSettings/>
    </div>
    <div className='flex flex-col w-full mt-10'>
      <SearchOptions Title={"Account Information"} url={"account_information"}/>
      <SearchOptions Title={"Update Password"} url={"update_password"} />
      <SearchOptions Title={"Notifications"} url={"notifications"} />
      <SearchOptions Title={"Delete Account"} url={"delete_account"}/>
    </div>
  </div>
  </div>
  )
}

export default page