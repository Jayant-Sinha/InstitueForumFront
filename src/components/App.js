import agent from '../Network';
import Header from './Header';
import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Course from "../components/Course";

import { store } from '../store/store';
import { push } from 'react-router-redux';
import Loader from 'react-loader-spinner';

const mapStateToProps = state => {
    return {
        appLoaded:  state.common.appLoaded,
        token: state.common.token,
        appName:  state.common.appName,
        currentUser: state.common.currentUser,
        redirectTo:  state.common.redirectTo
    }};

const mapDispatchToProps = dispatch => ({
    onLoad: (payload, token) =>
        dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
    onRedirect: () =>
        dispatch({ type: REDIRECT })
});

class App extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            this.props.history.push(nextProps.redirectTo);
            store.dispatch(push(nextProps.redirectTo));
            this.props.onRedirect();
        }
    }

    componentWillMount() {
        const token = window.localStorage.getItem('jwt');
        if (token) {
            agent.setToken(token);
        }
        this.props.onLoad(token ? agent.Auth.current(token) : null, token);
    }

    render() {
            return (
                <div>
                    {/*<Header*/}
                    {/*    appName={this.props.appName}*/}
                    {/*    currentUser={this.props.currentUser} />*/}
                    <Switch>
                        <Route exact path="/" component={Course}/>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/courses" component={Course} />
                    </Switch>
                </div>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);