import SearchTweet from '@/components/Tweet/SearchTweet'
import React from 'react'

function page() {
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center'>
      <div className='w-full h-[200px]'>
        <SearchTweet/>
      </div>
      
    </div>
  )
}

export default page