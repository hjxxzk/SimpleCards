import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStyles from "./EditView.styles";
import CardsList from "./CardsList/CardsList";
import EditCard from "./EditCard/EditCard";
import type { CardProps } from "./Card/CardProps.types";

function EditView() {

    const styles = useStyles();
    const params = useParams();
    const DB_ADDRESS = import.meta.env.VITE_DB_ADDRESS;
    const CARDS = import.meta.env.VITE_CARDS;
    const [cards, setCards] = useState<CardProps[]>();
    const [editedCard, setEditedCard] = useState<CardProps>();
    const emptyCard: CardProps = {
        _id: 0,
        word: "",
        translation: ""
    }


    function deleteCard(cardId: number) {
        if (cards) {
            setCards(cards.filter(card => card._id !== cardId));
        }
    }

    function handleAddCard() {
        setEditedCard(emptyCard);
    }

    function chooseCard(cardId: number) {
        setEditedCard(cards?.find(card => card._id === cardId));
    }

    useEffect(() => {
        fetch(`${DB_ADDRESS}${CARDS}?search=${params.id}`)
            .then(res => res.json())
            .then(data => setCards(data))
            .catch(err => console.error('Error:', err));
    }, [params]);

    useEffect(() => {
        setEditedCard(cards?.find(card => { return params?.card_id === card._id.toString() }));
    }, [params]);


    return (
        <div className={styles.mainContainer}>
            <CardsList cards={cards || []} deleteCard={deleteCard} chooseCardToEdit={chooseCard} addCard={handleAddCard} />
            {editedCard && <EditCard card={editedCard} />}
        </div>
    )
}

export default EditView;