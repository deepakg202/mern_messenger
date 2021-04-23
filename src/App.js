import React, { useEffect } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import { getSession } from "./actions/sessionActions";
import { useDispatch, useSelector } from "react-redux";

import Login from "./components/Login"
import Signup from "./components/Signup"

import Chat from "./components/Chat"

import Header from "./components/shared/Header"
import Dashboard from "./components/Dashboard"
import Settings from "./components/Settings"
import Error from "./components/Error"

const App = (props) => {

  const dispatch = useDispatch();
  const { sessionInfo, checked } = useSelector(state => state.session);

  useEffect(() => {
    if (!checked) {
      dispatch(getSession());
    }
  }, [checked, dispatch]);

  const NoSessionRoutes = () => {
    return (
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route component={() => <Redirect to="/login" />} />
      </Switch>
    );
  };

  const SuperAdminRoute = (props) => {
    const isSuperAdmin = sessionInfo.userType === "SUPER_ADMIN"
    if(isSuperAdmin) {
      return <Route {...props}/>
    }else{
      return <Route {...props} component={() => <Error message={"Not accessible to NORMAL users"}/>}/>
    }
  }


  const SessionRoutes = () => {
    return (
      <Switch>
        <Route path="/login" exact component={() => <Redirect to="/" />} />
        <Route path="/signup" exact component={() => <Redirect to="/" />} />
        <Route path="/chat" exact component={Chat} />
        <SuperAdminRoute path="/settings" exact component={Settings} />
        <Route path="/" exact component={Dashboard} />
      
      </Switch>
    );
  };
  const RoutesHandler = () => {
    if (!checked) return <div>Loading...</div>;
    else {
      if (!sessionInfo) return <NoSessionRoutes />;
      else return <SessionRoutes />;
    }
  };

  return (<React.Fragment><Switch>
      <Header/>
      </Switch>
      <Switch>
      <RoutesHandler/>
    </Switch></React.Fragment>)
}

export default App;