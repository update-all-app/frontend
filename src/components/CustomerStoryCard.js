import React from 'react'

function CustomerStoryCard({story: {userName, location, title, content}}) {
  return (
    <div className="max-w-sm mx-auto flex-col  p-6 bg-red rounded-lg shadow-xl">
      <h4 className="font-bold">{ title }</h4>   
      <h5>{ content }</h5>    
      <h6>{ userName } - { location }</h6>    
    </div>
  )
}

export default CustomerStoryCard
