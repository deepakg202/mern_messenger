import React,{useEffect} from "react";
import { Route, Switch, Redirect} from 'react-router-dom';
import { getSession } from "./actions/sessionActions";
import {useDispatch, useSelector} from "react-redux";

import Login from "./components/Login"
import './App.css';


const App = (props) => {

  const dispatch = useDispatch();
  const { sessionInfo, checked } = useSelector(state => state.session);

  // dispatch may be removed and replaced with direct api call
  useEffect(() => {
    if (!checked) {
      dispatch(getSession());
    }
  }, [checked, dispatch]);

  const NoSessionRoutes = () => {
    return (
      <Switch>
        <Route path="/login" exact component={Login}/>
      </Switch>
    );
  };

  const SessionRoutes = () => {
    return (
      <Switch>
        <Route path="/login" exact component={<Redirect to="/"/>} />
      </Switch>
    );
  };
  const RoutesHandler = () => {
    if (!checked) return <div/>;
    else {
      if (!sessionInfo) return <NoSessionRoutes />;
      else return <SessionRoutes />;
    }
  };

  return (<RoutesHandler />)
}

export default App;