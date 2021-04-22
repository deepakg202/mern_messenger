import React from "react"

const ErrorPage = (props) => {
  return <div className="text-danger h2 my-5 container">
    {props.message}
  </div>
}

export default ErrorPage