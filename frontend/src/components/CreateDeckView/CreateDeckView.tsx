import useStyles from "./CreateDeckView.styles";
import LanguaguesField from "./LanguagesField/LanguagesField";

function EditView() {

    const styles = useStyles();

    return (
        <div className={styles.mainContainer}>
            <p className={styles.title}>Create new deck</p>
            <hr className={styles.separator} />
            <div className={styles.form}>
                <div className={styles.textInputContainer}>
                    <p className={styles.text}>Deck Name</p>
                    <input className={styles.deckNameInput} type="text" placeholder="My Deck" />
                    <p className={styles.text}>Deck Description</p>
                    <textarea className={styles.descriptionInput} name="description" placeholder="Deck to learn a new language" />
                </div>
                <div className={styles.languageChoiceContainer}>
                    <p className={styles.text}>Learning <br className="xl:hidden" />Language</p>
                    <LanguaguesField />
                </div>
                <div className={styles.languageChoiceContainer}>
                    <p className={styles.text}>Translation <br className="xl:hidden" /> Language</p>
                    <LanguaguesField />
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.createDeckButton}>CREATE DECK</button>
            </div>
        </div >
    )
}

export default EditView;