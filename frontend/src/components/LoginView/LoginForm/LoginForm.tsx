import { useState } from "react";
import useStyles from "./LoginForm.styles";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {

    const styles = useStyles();
    const navigate = useNavigate();
    const REGISTER_VIEW = "/register";
    const LOGGED_IN_SUCCESSFULLY = 200;
    const DB_ADDRESS = import.meta.env.VITE_DB_ADDRESS;
    const USERS = import.meta.env.VITE_USERS;
    const [nickname, setNickname] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function handleLogIn() {
        if (areBothFieldsFilled()) {
            logIn();
        } else {
            alert("Please provide needed credentials");
        }
    }

    async function logIn() {
        const response = await fetch(`${DB_ADDRESS}${USERS}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: nickname,
                password: password
            })
        });

        if (response.status === LOGGED_IN_SUCCESSFULLY) {
            const data = await response.json();
            localStorage.setItem("accessToken", data.accessToken);
        }
    }


    function areBothFieldsFilled() {
        return nickname && password;
    }

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.title}>Welcome back!</h1>
            <div className={styles.inputContainer}>
                <h2>Nickname</h2>
                <input name="login" type="text" className={styles.input} onChange={(e) => setNickname(e.target.value)} />
            </div>
            <div className={styles.inputContainer}>
                <h2>Password</h2>
                <input name="password" type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className={styles.logInButton} onClick={() => { handleLogIn() }}>LOG IN</button>
            <div className={styles.checkBoxContainer}>
                <input name="stayLogged" type="checkBox" className={styles.pointer} onChange={(e) => setPassword(e.target.value)} />
                <p>Stay logged in?</p>
            </div>
            <u className={styles.registrationForwarding} onClick={() => { navigate(REGISTER_VIEW) }}>I don't have an account yet</u>
        </div>
    );
}