import {AUTH} from "../const/actionsTypes"
import * as api from "../../api/index"



export const loadUser = () => async (dispatch) => {
    const localUser = JSON.parse(localStorage.getItem("user_info"));

    // Check current path to decide whether to clear localStorage
    const currentPath = window.location.pathname;

    // Check if currentPath ends with /signup or /signin
    if (currentPath.endsWith('/signup') || currentPath.endsWith('/signin')) {
        localStorage.removeItem("user_info");
    }

    if (localUser) {
        dispatch({ type: AUTH, data: localUser });
    }
};export const signin = (data2, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(data2);

        dispatch({ type: AUTH, data });

        switch (data.result.role) {
            case 'user':
                navigate('/userHome');
                break;
            case 'magazineOwner':
                navigate('/merchant');
                break;
            case 'biker':
                navigate('/biker');
                break;
            case 'driver':
                navigate('/driver');
                break;
            case 'superAdmin':
                navigate('/', { state: { role: data.result.role } });
                break;
            default:
                break;
        }
    } catch (err) {
        console.log(err);
    }
};


export const signinGoogle = (accessToken, navigate) => async (dispatch)=>{
    try{
        // login user
        const {data} = await api.signInGoogle(accessToken)

        dispatch({type : AUTH, data})
        console.log(data);
        switch (data.result.role) {
            case 'user':
              navigate('/userHome');
              break;
            case 'magazineOwner':
              navigate('/merchant');
              break;
            case 'biker':
              navigate('/biker');
              break;
            case 'driver':
              navigate('/driver');
              break;
            default:
              break;
          }
    }catch(err){
        console.log(err)
    }
}

export const signup = (formData, navigate) => async (dispatch)=>{
    try{
        // signup user
        const {data} = await api.signUp(formData)

        dispatch({type : AUTH, data})
        navigate("/phoneRole")
    }catch(err){
        console.log(err)
    }
}

export const signupGoogle = (accessToken, navigate) => async (dispatch)=>{
    try{
        // signup user

        const {data} = await api.signUpGoogle(accessToken)

        dispatch({type : AUTH, data})
        navigate("/phoneRole")
    }catch(err){
        console.log(err)
    }
}