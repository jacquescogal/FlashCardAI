import React, { useEffect, useRef, useState } from 'react'
import styles from './Forms.module.scss'
import Button, { BUTTONTYPE } from '../Button/Button';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const LoginForm = ({setShowLogin,setLogoLoad}) => {
    const loginRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [loginButtonActive, setLoginButtonActive] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [inputError, setInputError] = useState('');
    const navigate=useNavigate();
    

    useEffect(() => {
        if (usernameRef && usernameRef.current) usernameRef.current.focus();
    }, [usernameRef])

    const handleUsernameInputChange = (e) => {
        setUsername(e.target.value);
        if (e.target.value.length > 2 && password.length > 0) setLoginButtonActive(true);
        else setLoginButtonActive(false);
        setInputError('');
    };

    const handlePasswordInputChange = (e) => {
        setPassword(e.target.value);
        if (username.length > 2 && e.target.value.length > 0) setLoginButtonActive(true);
        else setLoginButtonActive(false);
        setInputError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLogoLoad(true);
        try {
            const response = await axios.post('https://api.flashcardai.app/login', {
                username,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(response.status)

            const { access_token } = response.data;

            // Store the token in local storage
            localStorage.setItem('token', access_token);
            localStorage.setItem('username', username);
            toast.success(`Logged in as ${username}`)
            navigate('Home')
        } catch (error) {
            try{
                if (error.response.status===429){
                    setInputError("Too many login attempts")
                }
                else{
                    setInputError("Invalid username or password ")
                }
                console.error("Login failed:", error);
            }
            catch{
                setInputError("Too many login attempts")
                console.error("Login failed:", error);
            }
            
        }
        finally{
            setLogoLoad(false);
        }
    };

    const handleUsernameKeyDown = (event) => {
        if (event.keyCode === 13 && password === '') {
            event.preventDefault();
            passwordRef.current.focus()
        }
    }

    const handlePasswordKeyDown = (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event);
        }
    }
    return (

        <form onSubmit={handleSubmit} className={styles.LoginForm}>
            <div className={styles.Horizontal}>
            <Button type="button" style={{flex:'1',minWidth:'100px'}} buttonType={BUTTONTYPE.HARDEDGE} isActive={true}>Login</Button>
            <Button type="button" style={{flex:'1',minWidth:'100px'}} buttonType={BUTTONTYPE.HARDEDGE} onClick={()=>{setShowLogin(false)}}>Register</Button>
            </div>
            <h2>Login</h2>
            <div className={styles.NameInputPair}>
                <label>
                    Username:
                </label>
                <input
                    ref={usernameRef}
                    type="text"
                    value={username}
                    onChange={handleUsernameInputChange}
                    style={{ flex: 1, borderColor: inputError ? 'red' : '' }}
                    className={styles.TermInput}
                    onKeyDown={handleUsernameKeyDown}
                />
            </div>

            <div className={styles.NameInputPair}>
                <label>
                    Password:
                </label>
                <input
                    ref={passwordRef}
                    type="password"
                    value={password}
                    onChange={handlePasswordInputChange}
                    style={{ flex: 1, borderColor: inputError ? 'red' : '' }}
                    className={styles.AnsInput}
                    onKeyDown={handlePasswordKeyDown}
                />
            </div>

            {inputError && <div style={{ color: 'red', marginTop: '5px' }}>{inputError}</div>}
            <Button type="submit" width='80%' isActive={loginButtonActive} >Login</Button>
        </form>
    )
}

export default LoginForm