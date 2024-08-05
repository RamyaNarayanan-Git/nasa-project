import React from 'react'

function Footer({data, toggleModal}) {
  return (
    <footer>
      <div>
        <h2>{data?.title}</h2>
        <h1>APOD PROJECT</h1>
      </div>

      <button onClick={toggleModal}>
        <i className='fa-solid fa-circle-info'></i>
      </button>
    </footer>
  )
}

export default Footer