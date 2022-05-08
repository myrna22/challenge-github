import './App.css';
import React, { Component } from 'react'
import axios from 'axios';
import UserData from './User';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userName:"",
      userInformation:null,
      userRepositories:[]   
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  fetchAPI=(rest, state)=>
    axios.get(`http://api.github.com/users/${rest}?client_id=22a1d5fc12ae5c314a4c&client_secret=9cd934dac4e6e56f3ad2d93e8f290516bc86434b&sort=created`)
      .then(res => {
        this.setState({[state]: res.data})
      })
      .catch(err => ({
      }))

  onClick = (e) => {
    e.preventDefault()
    this.setState({userInformation:null, userRepositories:[]})
    this.fetchAPI(`${this.state.userName}`, "userInformation")
    this.fetchAPI(`${this.state.userName}/repos`,"userRepositories")
    this.setState({userName:""})
  }

  render() {
    const {userName, userInformation, userRepositories} =this.state
    return (
      <div className="content">
        <UserData/>
        <nav className="navbar navbar-dark bg-primary">
            <a href="/" className="navbar-brand">
            <i class="fa fa-github"></i> GitHub user's personal data</a>
            <form className="d-flex">
              <input className="form-control mr-sm-2" name="userName" onChange={this.onChange} value={userName} placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-light" type="submit" onClick={this.onClick}>Search</button>
            </form> 
        </nav>
        
        {userInformation ?
        <div className="info-page">
          <h1>{userInformation.name}'s GitHub</h1>
          <div className="info-box">
            <div>
              <img src={userInformation.avatar_url} alt=""/>
            </div>
            <div>
              <ul>
                <li><strong>Full Name :</strong> {userInformation.name}</li>
                <li><strong>User Name :</strong> {userInformation.login}</li>
                <li><strong>Location :</strong> {userInformation.location}</li>
                <li><strong>Email :</strong> {userInformation.email}</li> 
              </ul> 
            </div>
          </div>                  
        </div>: <div className="notice">Write User Name to get the data</div>}
        
        {userRepositories && userRepositories.length > 0 &&
          <div>
            <h3>User Repositories</h3>
            <div>
              <ul>
              {userRepositories.map((value, index) => index < 10 &&
                <li key={value.id}><strong>{value.name}:</strong> {value.description}</li>
              )}
              </ul>
              </div>
          </div>
        }
      </div>
    )
  }
}


