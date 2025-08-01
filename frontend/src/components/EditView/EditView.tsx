import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStyles from "./EditView.styles";
import CardsList from "./CardsList/CardsList";
import EditCard from "./EditCard/EditCard";
import type { CardProps } from "./Card/CardProps.types";
import CreateCard from "./CreateCard/CreateCard";
import EditDeck from "./EditDeck/EditDeck";

function EditView() {

    const styles = useStyles();
    const params = useParams();
    const navigate = useNavigate();
    const DB_ADDRESS = import.meta.env.VITE_DB_ADDRESS;
    const CARDS = import.meta.env.VITE_CARDS;
    const CREATE = "create";
    const [cards, setCards] = useState<CardProps[]>();
    const [editedCard, setEditedCard] = useState<CardProps>();
    const [isNewCardCreated, setIsNewCardCreated] = useState(false);

    function deleteCard(cardId: number) {
        if (cards) {
            setCards(cards.filter(card => card._id !== cardId));
        }
    }

    function handleAddCard() {
        navigate(`/edit/${params.id}/${CREATE}`);
    }

    function chooseCard(cardId: number) {
        setEditedCard(cards?.find(card => card._id === cardId));
    }

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const res = await fetch(`${DB_ADDRESS}${CARDS}?search=${params.id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` } });
                const data = await res.json();
                setCards(data.reverse());
            } catch (err) {
                console.error('Error:', err);
            }
        };
        fetchCards();
    }, [params]);

    useEffect(() => {
        if (params?.card_id === CREATE) {
            setIsNewCardCreated(true);
        } else {
            setEditedCard(cards?.find(card => { return params?.card_id === card._id.toString() }));
            setIsNewCardCreated(false);
        }
    });

    return (
        <div className={styles.mainContainer}>
            <CardsList cards={cards || []} deleteCard={deleteCard} chooseCardToEdit={chooseCard} addCard={handleAddCard} />
            {!editedCard && !isNewCardCreated && <EditDeck />}
            {editedCard && !isNewCardCreated && <EditCard card={editedCard} />}
            {isNewCardCreated && <CreateCard deck_id={params.id || ""} />}
        </div>
    )
}

export default EditView;