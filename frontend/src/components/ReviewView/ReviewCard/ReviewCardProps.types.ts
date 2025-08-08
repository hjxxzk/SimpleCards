export interface ReviewCardProps {
    _id: string;
    word: string;
    translation: string;
    handleYes: (_id: string) => void,
    handleNo: (_id: string) => void,
}
