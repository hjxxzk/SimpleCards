import useStyles from "./DeleteDeckPopup.style";
import type { DeleteDeckPopupProps } from "./DeleteDeckPopupProps";

const DeleteDeckPopup = (props: DeleteDeckPopupProps) => {

    const styles = useStyles();

    return (
        <div className={styles.popup}>
            <div className={styles.popupMessage}>
                <strong>Delete Deck</strong>
                Are you sure you want to delete this deck?
            </div>
            <div className={styles.buttonsContainer}>
                <button className={styles.yesButton} onClick={props.handleYes}>YES</button>
                <button className={styles.noButton} onClick={props.handleNo}>NO</button>
            </div>

        </div>
    );
}

export default DeleteDeckPopup;