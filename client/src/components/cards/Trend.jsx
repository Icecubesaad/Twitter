import Link from 'next/link'
import React from 'react'
function formatTweetCount(count) {
  if (count < 1000) {
    return count.toString();
  } else {
    return (count / 1000).toFixed(1) + "k";
  }
}
function Trend({Trend,Tweets}) {
  const formattedTweets = formatTweetCount(Tweets);
  return (
    <Link href={`/?t=${Trend}`} className=' flex flex-col mt-3'>
         <h1 className=" text-md font-bold">#{Trend}</h1>
         <p className=" text-sm">{formattedTweets} tweets</p>
    </Link>
  )
}

export default Trend