import React from 'react'

function CareerCard(props) {
  return (
    <div className="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-lx">
      <h6>{props.job.title}</h6>       
    </div>
  )
}

export default CareerCard
