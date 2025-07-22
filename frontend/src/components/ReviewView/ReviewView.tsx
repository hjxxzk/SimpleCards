import ReviewCard from "./ReviewCard/ReviewCard";
import useStyles from "./ReviewView.styles";

function ReviewView() {

    const styles = useStyles();

    function handleRememberedCard(_id: number) {

    }


    function handleNotRememberedCard(_id: number) {

    }

    return (
        <div className={styles.mainContainer}>
            <ReviewCard _id={1} word="cat" translation="kot" handleYes={handleRememberedCard} handleNo={handleNotRememberedCard} ></ReviewCard>
        </div>
    )
}

export default ReviewView;