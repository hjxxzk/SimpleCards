const useStyles = () => {
    return {
        card: "relative w-2/3 2xl:w-2/5 3xl:w-1/3 h-1/3 sm:h-1/2 bg-neutral-50 rounded-lg flex justify-center items-center text-3xl sm:text-4xl cursor-pointer [perspective:1000px]",
        innerCard: "relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]",
        front: "absolute inset-0 bg-neutral-50 border-1 border-neutral-200 shadow-lg flex items-center justify-center rounded-lg",
        back: "absolute inset-0 bg-neutral-50 border-1 border-neutral-200 shadow-lg flex items-center justify-center rounded-lg [transform:rotateY(180deg)] [backface-visibility:hidden]",
        text: "text-4xl",
        transition: "transition-opacity duration-200 ease-in-out",
        buttonsContainer: "absolute bottom-15 w-full h-1/11 flex justify-between px-5 sm:px-20 md:px-25 text-sm text-black font-semibold",
        yesButton: "stroke-lime-500 hover:stroke-lime-400 active:stroke-lime-500 cursor-pointer p-2 sm:p-0",
        noButton: "stroke-red-500 hover:stroke-red-400 active:stroke-red-500 cursor-pointer p-2 sm:p-0",
    };
};

export default useStyles;
