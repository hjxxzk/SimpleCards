import useStyles from "./EditCard.styles";
import type { EditCardProps } from "./EditCardProps.types";

const EditCard = (props: EditCardProps) => {

    const styles = useStyles()

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {props.card?.word}
                <div className={styles.separator} />
                {props.card?.translation}
            </div>
        </div>
    );
}

export default EditCard;