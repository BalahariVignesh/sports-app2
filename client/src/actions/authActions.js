import axios from 'axios';
import {returnErrors} from './errorActions';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    GET_EVENTS

} from "./types"

//check token and load user
export const loadUser = () => (dispatch, getState) => {
    //user loading
    dispatch({type:USER_LOADING});
    
    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type:USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type:AUTH_ERROR
            });
        });
};

//Register user
export const register = ({ name, email, password, password2, isOrganiser}) => dispatch => {
    //headers
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    //request body
    const body = JSON.stringify({name, email, password, password2,isOrganiser});
    axios.post('/api/user/sign-up', body, config)
        .then(res => {
            dispatch({
            type:REGISTER_SUCCESS,
            payload: res.data
            });
            window.location.reload();
        })
        .catch(err=>{
            dispatch(returnErrors(err.response.data, err.response.status,'REGISTER_FAIL'));
            dispatch({
                type:REGISTER_FAIL,

            })
        })
}


//Login user
export const login = ({ email, password}) => dispatch => {
    //headers
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    //request body
    const body = JSON.stringify({email, password});
    axios.post('/api/auth', body, config)
        .then(res => {
            dispatch({
            type:LOGIN_SUCCESS,
            payload: res.data
        }); window.location.reload();
       // dispatch({
        //    type:GET_EVENTS,
            //payload:res.data
       // });
    })
        .catch(err=>{
            dispatch(returnErrors(err.response.data, err.response.status,'LOGIN_FAIL'));
            dispatch({
                type:LOGIN_FAIL,

            })
        })
}


//Logout user 
export const logout =() => {
    return{
        type:LOGOUT_SUCCESS
    }
}


//setup config/headers and token
export const tokenConfig = getState => {
    //getting token from local storage
    const token = getState().auth.token;

    //headers
    const config = {
        headers:{
            "Content-type": "application/json"
        }
    }

    //if token, add to headers
    if(token){
        config.headers['x-auth-token'] = token;
    }
    return config;
}