import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

function SearchSettings() {
  return (
    <div className='flex flex-row items-center bg-[#202427] w-[70%] border-[1px] pl-2 border-transparent rounded-3xl h-[45px]'>
    <SearchIcon sx={{fontSize:25}}/>
      <input placeholder='Search in settings' className='w-full border-[1px] border-transparent rounded-3xl pl-2 text-white placeholder:text-white bg-transparent outline-none' />
  </div>
  )
}

export default SearchSettings