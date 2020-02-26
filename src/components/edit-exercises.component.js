import React, { Component } from 'react';
import axios from 'axios';
//npm component allows for calendar
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

//constructs to edit exercise
export default class EditExercises extends Component {
    constructor(props) {
        //all constructors in React needs to start with super(props)
        super(props);
        //binds "this" to each method
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        //creates properties. State updates page with new values
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    //React lifecycle method.
    componentDidMount() {
        //gets all users from db & ensures there is at least one exerise in db. Returns excercise names.
        axios.get('http://localhost:5000/exercises/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                    })
                }
            })
    }
    //sets state after changing/creating user name
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    //sets state after changing/creating description
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    //sets state after changing/creating duration
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }
    //sets state after changing/creating date
    onChangeDate(date) {
        this.setState({
            date: date
        });
    }
    //when submit button clicked, creates exercise
    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise);
        //adds exercise to db through axios Post
        axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    //renders Edit Exercise form
    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {/* array of all users is looped through and return option in select box */}
                            {
                                this.state.users.map((user) => {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Description: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type='text'
                            className='form-control'
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Date: </label>
                        <div>
                            {/* pops up calendar to choose date */}
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className='form-group'>
                        <input type='submit' value='Edit Exercise Log' className='btn btn-primary' />
                    </div>
                </form >
            </div >
        )
    }
}