import React from 'react'

function CareerCard(props) {
  return (
    <div className="max-w-sm mx-auto flex-col  p-6 bg-red rounded-lg shadow-xl hover:bg-gray-100">
      <h6 className="font-bold">{props.job.title}</h6>       
    </div>
  )
}

export default CareerCard
