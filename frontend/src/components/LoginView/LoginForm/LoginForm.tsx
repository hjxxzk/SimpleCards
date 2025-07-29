import { useState } from "react";
import useStyles from "./LoginForm.styles";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {

    const styles = useStyles();
    const navigate = useNavigate();
    const REGISTER_VIEW = "/register";
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    console.log(login)
    console.log(password)

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.title}>Welcome back!</h1>
            <div className={styles.inputContainer}>
                <h2>Nickname</h2>
                <input name="login" type="text" className={styles.input} onChange={(e) => setLogin(e.target.value)} />
            </div>
            <div className={styles.inputContainer}>
                <h2>Password</h2>
                <input name="password" type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className={styles.logInButton}>LOG IN</button>
            <div className={styles.checkBoxContainer}>
                <input name="stayLogged" type="checkBox" className={styles.pointer} onChange={(e) => setPassword(e.target.value)} />
                <p>Stay logged in?</p>
            </div>
            <u className={styles.registrationForwarding} onClick={() => { navigate(REGISTER_VIEW) }}>I don't have an account yet</u>
        </div>
    );
}