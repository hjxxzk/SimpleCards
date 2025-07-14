import useStyles from "./EditView.styles";
import CardsList from "./CardsList/CardsList";

function EditView() {

    const styles = useStyles();

    return (
        <div className={styles.mainContainer}>
            <CardsList />
        </div>
    )
}

export default EditView;