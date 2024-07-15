import React from 'react'

export default function CardItem({ data = {} , handleEditClick = () => {} , handleDeleteClick = () => {} }) {
  return (
    <div className="container-fluid">
        <div className="col-ms-12 mx-5 my-2">
            <div className="card ps-4 py-3" style={{width: "33rem"}}>
                <p className="fs-6"><span className='h6'>ID : </span> {data.id}</p>
                <p className="fs-3"><span className='h2'>Name : </span> {data.name}</p>
                <p className="fs-6"><span className="h6">Username :</span> {data.username}</p>
                <p className="fs-6"><span className="h6">Email :</span> {data.email}</p>
                <div className="fs-6 mb-3 flex align-items-center justify-content-center"><span className="h6">Address :</span> {data.address.street},{ data.address.suite},{ data.address.city}{ data.address.zipcode},{ data.address.Geo}</div>
                <p className="fs-6"><span className="h6">Phone :</span> {data.phone}</p>
                <p className="fs-6"><span className="h6">Website :</span> {data.website}</p>
                <p className="fs-6"><span className="h6">Company : </span> {data.company.name}</p>
                <div className="col-md-12 gap-3 d-flex align-items-center justify-content-end px-3">
                    <button className="btn btn-success px-5" onClick={() => handleEditClick(data.id)}>Edit</button>
                    <button className="btn btn-danger px-5" onClick={() => handleDeleteClick(data.id)}>Delete</button>
                </div>
            </div>
        </div>
    </div>
  )
}
