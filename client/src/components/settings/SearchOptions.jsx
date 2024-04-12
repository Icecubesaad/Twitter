import React from 'react'
import Link from "next/link";

function SearchOptions({Title,url}) {
  return (
    <Link href={`/home/settings/${url}`} className=' w-full h-[70px] flex justify-start border-[1px] border-[#6e6e6e] flex-row pl-5 items-center'>
        {Title}
    </Link>
  )
}

export default SearchOptions