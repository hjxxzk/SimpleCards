import useStyles from "./DeletePopup.styles";
import type { DeletePopupProps } from "./DeletePopup.types";

const DeletePopup = (props: DeletePopupProps) => {

    const styles = useStyles();

    return (
        <div className={styles.popup}>
            <div className={styles.popupMessage}>
                <strong>{props.title}</strong>
                {props.message}
            </div>
            <div className={styles.buttonsContainer}>
                <button className={styles.yesButton} onClick={props.handleYes}>YES</button>
                <button className={styles.noButton} onClick={props.handleNo}>NO</button>
            </div>

        </div>
    );
}

export default DeletePopup;