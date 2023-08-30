import React, { useEffect, useRef, useState } from 'react'
import styles from './Forms.module.scss'
import Button, { BUTTONTYPE } from '../Button/Button';
import { toast } from 'react-toastify';
import axios from 'axios';
const RegisterForm = ({setLogoLoad,setShowLogin}) => {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordOtherRef = useRef(null);
    const emailRef = useRef(null);
    const [loginButtonActive, setLoginButtonActive] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordOther,setPasswordOther]=useState('');
    const [email,setEmail]=useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError,setPasswordError]=useState('');
    const [emailError,setEmailError]=useState('');

    useEffect(() => {
        // when component loads, keyboard input to namefield
        if (usernameRef && usernameRef.current) usernameRef.current.focus();
    }, [usernameRef])

    const handleUsernameInputChange = (e) => {
        // When username changes, check
        setUsername(e.target.value);
        if (e.target.value.length > 2 && password.length > 0 && passwordOther.length>0 && email.length>0) setLoginButtonActive(true);
        else setLoginButtonActive(false);
        setUsernameError('');
    };

    const handlePasswordInputChange = (e) => {
        setPassword(e.target.value);
        if (username.length > 2 && e.target.value.length > 0 && passwordOther.length>0 && email.length>0) setLoginButtonActive(true);
        else setLoginButtonActive(false);
        setPasswordError('');
    };

    const handlePasswordOtherInputChange = (e) => {
        setPasswordOther(e.target.value);
        if (username.length > 2 && password.length > 0 && e.target.value.length>0 && email.length>0) setLoginButtonActive(true);
        else setLoginButtonActive(false);
        setPasswordError('');
    };

    const handleEmailInputChange = (e) => {
        setEmail(e.target.value);
        if (username.length > 2 && password.length > 0 && passwordOther.length>0 && e.target.value.length>0) setLoginButtonActive(true);
        else setLoginButtonActive(false);
        setEmailError('');
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
        let toReturn=false;
        if (!emailRegex.test(email)){
            setEmailError("Invalid e-mail");
            toast.error("Please enter a valid e-mail");
            toReturn=true;
        }
        if (password!==passwordOther){
            setPasswordError("Passwords do not match")
            toast.error("Please make sure passwords match");
            toReturn=true;
        }
        if (!passwordRegex.test(password)){
            setPasswordError("Password must have at least a digit, an uppercase, a lowercase letter and 5 characters")
            toast.error("Please enter a valid password");
            toReturn=true;
        }
        if (toReturn===true) return;
        setLogoLoad(true)
        try {
            const response = await axios.post('https://api.flashcardai.app/register', {
                username,
                password,
                email
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response)
            toast.success(`Registered as ${username}`)
            setShowLogin(true)
        } catch (error) {
            toast.error(error.response.data.message);
            if (error.response.data.message==="Email exists"){
                setEmailError("Email already exists")
            }
            else if (error.response.data.message==="User exists"){
                setUsernameError("Username already exists")
            }
            console.error("Login failed:", error);
        }finally{
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
            passwordOtherRef.current.focus();
        }
    }

    const handlePasswordOtherKeyDown = (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            emailRef.current.focus();
        }
    }

    const handleEmailKeyDown = (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event);
        }
    }
    return (

        <form onSubmit={handleSubmit} className={styles.LoginForm}>
            <div className={styles.Horizontal}>
            <Button type="button" style={{flex:'1',minWidth:'100px'}} buttonType={BUTTONTYPE.HARDEDGE} onClick={()=>{setShowLogin(true)}}>Login</Button>
            <Button type="button" style={{flex:'1',minWidth:'100px'}} buttonType={BUTTONTYPE.HARDEDGE} isActive={true}>Register</Button>
            </div>
            <h2>Register</h2>
            <div className={styles.NameInputPair}>
                <label>
                    Username:
                </label>
                <input
                    ref={usernameRef}
                    type="text"
                    value={username}
                    onChange={handleUsernameInputChange}
                    style={{ flex: 1, borderColor: usernameError ? 'red' : '' }}
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
                    style={{ flex: 1, borderColor: passwordError ? 'red' : '' }}
                    className={styles.AnsInput}
                    onKeyDown={handlePasswordKeyDown}
                />
            </div>

            <div className={styles.NameInputPair}>
                <label>
                    Re-enter Password:
                </label>
                <input
                    ref={passwordOtherRef}
                    type="password"
                    value={passwordOther}
                    onChange={handlePasswordOtherInputChange}
                    style={{ flex: 1, borderColor: passwordError ? 'red' : '' }}
                    className={styles.AnsInput}
                    onKeyDown={handlePasswordOtherKeyDown}
                />
            </div>

            <div className={styles.NameInputPair}>
                <label>
                    E-mail:
                </label>
                <input
                    ref={emailRef}
                    type="email"
                    value={email}
                    onChange={handleEmailInputChange}
                    style={{ flex: 1, borderColor: emailError ? 'red' : '' }}
                    className={styles.AnsInput}
                    onKeyDown={handleEmailKeyDown}
                />
            </div>

            {usernameError && <div style={{ color: 'red', marginTop: '5px' }}>{usernameError}</div>}
            {passwordError && <div style={{ color: 'red', marginTop: '5px' }}>{passwordError}</div>}
            {emailError && <div style={{ color: 'red', marginTop: '5px' }}>{emailError}</div>}
            <Button type="submit" width='80%' isActive={loginButtonActive} >Register</Button>
        </form>
    )
}


export default RegisterForm