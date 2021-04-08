import React, { Component } from 'react';
import Form from './common/forms';
import Joi, { errors } from 'joi-browser';

class LoginForm extends Form {
    state ={
        data : {username : "", password: ""},
        errors: {}
    };

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    };

    doSubmit = () =>{
        //call the server
        console.log("submitted");
    }
    render() { 
      
      return (
        <did>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
               {this.renderInput("username", "Username")}
               {this.renderInput("password", "Password", "password")}
               {this.renderButton('Login')}
            </form>
        </did>
      );
    }
}
 
export default LoginForm;



// TRADITIONAL SIMPLE VALIDATION METHOD - entire form
// const errors={};
//         const { data } = this.state;
//         if(data.username.trim()==='')
//             errors.username='Username is required';
//         if(data.password.trim()==='')    
//             errors.password='Password is required';

//         return Object.keys(errors).length === 0 ?  {} : errors;  

// TRADITIONAL SIMPLE VALIDATION METHOD - each field

// if(name === 'username'){
//     if(value === '') return 'Username is required';
//     //...
// }
// if(name === 'password'){
//     if(value === '') return 'Password is required';
//     //...
// }


//e.preventDefault(); --> it will prevent to load entire js bundle while handling forms
        //in vanilla javascript we get the values of input field by -->
        //const values = document.getElementById('username').value;
        //in react we never work with document object, because of putting abstraction over document obj 
        //current- which return the current DOM element
        //username=React.createRef();
    //const username = this.username.current.value;
    //console.log('submitted', username);

    // componentDidMount(){
    //     this.username.current.focus();
    // };