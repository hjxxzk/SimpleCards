const useStyles = () => {
    return {
        popup: "absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-1/7 h-1/6 bg-neutral-100 border-neutral-200 border-2 z-10 py-4 px-10 rounded-2xl flex flex-col items-center justify-around text-black shadow-lg",
        buttonsContainer: "flex justify-between items-center w-full h-1/2 ",
        yesButton: "bg-lime-300 hover:bg-lime-400 active:bg-lime-500 px-8 py-2 rounded-lg text-black font-semibold cursor-pointer shadow-md",
        noButton: "bg-red-300 hover:bg-red-400 active:bg-red-500 px-8 py-2 rounded-lg text-black font-semibold cursor-pointer shadow-md",
        popupMessage: "flex flex-col justify-center gap-3 items-start w-full h-full",
    };
};

export default useStyles;