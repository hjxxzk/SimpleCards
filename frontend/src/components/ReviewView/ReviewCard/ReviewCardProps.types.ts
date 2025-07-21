export interface ReviewCardProps {
    _id: number;
    word: string;
    translation: string;
    handleYes: (_id: number) => void,
    handleNo: (_id: number) => void,
}
