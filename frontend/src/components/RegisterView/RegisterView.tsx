import { useEffect, useState } from "react";
import useStyles from "./RegisterView.styles";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const RegisterView = () => {

    const logoPath = window.location.protocol + "//" + window.location.host + "/images/logo.png";
    const AT_LEAST_12_CHARACTERS = /^.{12,}$/;
    const AT_LEAST_3_CHARACTERS = /^.{3,}$/;
    const AT_LEAST_ONE_NUMBER = /.*[0-9].*/;
    const AT_LEAST_ONE_BIG_LETTER = /[A-Z]/;
    const AT_LEAST_ONE_SPECIAL_CHARACTER = /[!@#$%^&)(-_=+*]/;
    const LOGIN_PAGE = "/login"
    const ICON_COLOR = "black";
    const ICON_SIZE = 20;
    const [nickname, setNickname] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isAtLeast12Characters, setisAtLeast12Characters] = useState<boolean>(false);
    const [isAtLeastOneNumber, setisAtLeastOneNumber] = useState<boolean>(false);
    const [isAtLeastOneSpecialCharacter, setisAtLeastOneSpecialCharacter] = useState<boolean>(false);
    const [isAtLeastOneBigLetter, setisAtLeastOneBigLetter] = useState<boolean>(false);
    const styles = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        checkIfPasswordIsLongEnough();
        checkIfPasswordHasAtLeastOneNumber();
        checkIfPasswordHasAtLeastOneBigLetter();
        checkIfPasswordHasAtLeastOneSpecialCharacter();
        isValidPassword();
    }, [password]);

    function checkIfPasswordIsLongEnough() {
        if (AT_LEAST_12_CHARACTERS.test(password)) {
            setisAtLeast12Characters(true);
        } else {
            setisAtLeast12Characters(false);
        }
    }

    function checkIfPasswordHasAtLeastOneNumber() {
        if (AT_LEAST_ONE_NUMBER.test(password)) {
            setisAtLeastOneNumber(true);
        } else {
            setisAtLeastOneNumber(false);
        }
    }

    function checkIfPasswordHasAtLeastOneBigLetter() {
        if (AT_LEAST_ONE_BIG_LETTER.test(password)) {
            setisAtLeastOneBigLetter(true);
        } else {
            setisAtLeastOneBigLetter(false);
        }
    }

    function checkIfPasswordHasAtLeastOneSpecialCharacter() {
        if (AT_LEAST_ONE_SPECIAL_CHARACTER.test(password)) {
            setisAtLeastOneSpecialCharacter(true);
        } else {
            setisAtLeastOneSpecialCharacter(false);
        }
    }

    function isValidNickname() {
        return AT_LEAST_3_CHARACTERS.test(nickname);
    }

    function isValidPassword() {
        return isAtLeast12Characters && isAtLeastOneBigLetter && isAtLeastOneNumber && isAtLeastOneSpecialCharacter;
    }

    function arePasswordsTheSame() {
        return password != "" && password === confirmPassword;
    }

    return (
        <div className={styles.mainContainer}>
            <img src={logoPath} alt="Logo" className={styles.logo} onClick={() => { navigate(LOGIN_PAGE) }} />
            <h1 className={styles.title}>Start your learning journey!</h1>
            <div className={styles.inputContainer}>
                <h2>Nickname</h2>
                <input name="login" type="text" className={`${styles.input} ${isValidNickname() ? styles.approved : ""}`} onChange={(e) => setNickname(e.target.value)} />
            </div>
            <div className={styles.inputContainer}>
                <h2>Password</h2>
                <input name="password" type="password" className={`${styles.input} ${isValidPassword() ? styles.approved : ""}`} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <div className={styles.inputContainer}>
                    <h2>Confirm Password</h2>
                    <input name="confirmPassword" type="password" className={`${styles.input} ${arePasswordsTheSame() ? styles.approved : ""}`} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className={`${styles.conditionText} ${styles.margin}`}>
                    {isAtLeast12Characters ? <Check color={ICON_COLOR} size={ICON_SIZE} /> : <X color={ICON_COLOR} size={ICON_SIZE} />}
                    At least 12 characters
                </div>
                <div className={styles.conditionText}>
                    {isAtLeastOneBigLetter ? <Check color={ICON_COLOR} size={ICON_SIZE} /> : <X color={ICON_COLOR} size={ICON_SIZE} />}
                    At least one big character
                </div>
                <div className={styles.conditionText}>
                    {isAtLeastOneNumber ? <Check color={ICON_COLOR} size={ICON_SIZE} /> : <X color={ICON_COLOR} size={ICON_SIZE} />}
                    At least one number
                </div>
                <div className={styles.conditionText}>
                    {isAtLeastOneSpecialCharacter ? <Check color={ICON_COLOR} size={ICON_SIZE} /> : <X color={ICON_COLOR} size={ICON_SIZE} />}
                    At least special character
                </div>
            </div>
            {isValidPassword() && isValidPassword() && arePasswordsTheSame() && <button className={styles.createAccountButton}>CREATE ACCOUNT</button>}
        </div>
    );

}