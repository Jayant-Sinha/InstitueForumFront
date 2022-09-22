import React, { useState, useEffect, useReducer } from 'react';

import { Link } from 'react-router-dom';
import agent from '../Network';
import { connect } from 'react-redux';
import {
    COURSE_PAGE_LOADED,
    COURSE_PAGE_UNLOADED,
} from '../constants/actionTypes';
import courseReducer from "../store/reducers/course";
import {store} from "../store/store";
import {push} from "react-router-redux";
const mapStateToProps = state => ({
    ...state,
    course: state.course,
    courses: state.course.courses,
    token: state.common.token
});

const mapDispatchToProps = dispatch => ({
    onLoad: () =>
        dispatch({type: COURSE_PAGE_LOADED, payload: agent.Courses.all()}),
    onUnload: () =>
        dispatch({ type: COURSE_PAGE_UNLOADED })
});

class Course extends React.Component {

    constructor() {
        super();
        // this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
        // this.changePassword = ev => this.props.onChangePassword(ev.target.value);
        // this.submitForm = (username, password) => ev => {
        //     ev.preventDefault();
        //     this.props.onSubmit(username, password);
        // };
        this.onLoad = ev => this.props.onLoad();
    }

    componentWillMount() {
        this.props.onLoad(Promise.all([
            agent.Courses.all(),
        ]));
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {

        const courses = this.props.courses
        return(
            <div>

                    <table style={ {border : "1px solid", width: "50%",  } }>
                        <thead>
                            <th>Course Name</th>
                            <th>Subjects</th>
                        </thead>
                        <tbody>
                        {
                            courses.map((course) => {
                                return <tr>
                                    <td style={{border : "1px solid", "text-align": "center" }}>{course.name}</td>
                                    <td style={{border : "1px solid", "text-align": "center" }}>{course.subjects.map((subject) =>{return subject.name}).join(",")}</td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>



            </div>
        )
    }

    // const initialState = {
    //     isLoading: false,
    //     courses: [],
    //     course: {}
    // };

    // const [course, useCourse] = useState({})
    // const [courses, useCourses] = useState([])
    // const [state, dispatch] = useReducer(courseReducer, initialState)
    // useEffect(() =>{
    //     agent.Courses.all().then(() => {})
    // }, [])
    // return(
    //     <div>
    //
    //     </div>
    // )
}


export default connect(mapStateToProps, mapDispatchToProps)(Course);
export { Course, mapStateToProps };