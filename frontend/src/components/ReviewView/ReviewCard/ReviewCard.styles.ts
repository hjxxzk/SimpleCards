const useStyles = () => {
    return {
        card: "relative w-2/3 2xl:w-2/5 3xl:w-1/3 h-1/2 bg-neutral-50 rounded-lg flex justify-center items-center text-4xl cursor-pointer [perspective:1000px]",
        innerCard: "relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]",
        front: "absolute inset-0 bg-neutral-50 border-1 border-neutral-200 shadow-lg flex items-center justify-center rounded-lg",
        back: "absolute inset-0 bg-neutral-50 border-1 border-neutral-200 shadow-lg flex items-center justify-center rounded-lg [transform:rotateY(180deg)] [backface-visibility:hidden]",
        text: "text-4xl",
        buttonsContainer: "absolute bottom-15 w-full h-1/11 flex justify-between px-15 text-sm text-black font-semibold",
        yesButton: "w-1/4 bg-lime-300 hover:bg-lime-400 active:bg-lime-500 shadow-md rounded-lg cursor-pointer",
        noButton: "w-1/4 bg-red-300 hover:bg-red-400 active:bg-red-500 shadow-md rounded-lg cursor-pointer",
    };
};

export default useStyles;
