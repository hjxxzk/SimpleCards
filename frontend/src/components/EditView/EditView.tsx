import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStyles from "./EditView.styles";
import CardsList from "./CardsList/CardsList";
import type { CardProps } from "./Card/CardProps.types";

function EditView() {

    const styles = useStyles();

    const DB_ADDRESS = import.meta.env.VITE_DB_ADDRESS;
    const CARDS = import.meta.env.VITE_CARDS;
    const [cards, setCards] = useState<CardProps[]>();
    const params = useParams();

    function deleteCard(cardId: number) {
        if (cards) {
            setCards(cards.filter(card => card._id !== cardId));
        }
    }

    useEffect(() => {
        fetch(`${DB_ADDRESS}${CARDS}?search=${params.id}`)
            .then(res => res.json())
            .then(data => { console.log(data), setCards(data.reverse()) })
            .catch(err => console.error('Error:', err));
    }, []);

    return (
        <div className={styles.mainContainer}>
            <CardsList cards={cards || []} deleteCard={deleteCard} />
        </div>
    )
}

export default EditView;