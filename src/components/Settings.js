import React from "react"
import {useSelector} from "react-redux"

const SettingsPage = (props) => {
  const {sessionInfo} = useSelector(state => state.session)
  return <div className="text-center text-success h2 my-5 container">
    Welcome SUPERADMIN {sessionInfo.username}
  </div>
}

export default SettingsPage