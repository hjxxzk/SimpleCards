import { useState } from "react";
import useStyles from "./LoginForm.styles";

export const LoginForm = () => {

    const styles = useStyles();
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.title}>Log in</h1>
            <div className={styles.inputContainer}>
                <h2>Nickname</h2>
                <input name="login" type="text" className={styles.input} onChange={(e) => setLogin(e.target.value)} />
            </div>
            <div className={styles.inputContainer}>
                <h2>Password</h2>
                <input name="password" type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className={styles.checkBoxContainer}>
                <input name="stayLogged" type="checkBox" className={styles.pointer} onChange={(e) => setPassword(e.target.value)} />
                <p>Stay logged in?</p>
            </div>
            <u className={styles.registrationForwarding}>I don't have an account</u>
        </div>
    );
}