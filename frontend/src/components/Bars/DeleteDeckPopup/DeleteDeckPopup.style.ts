const useStyles = () => {
    return {
        popup: "absolute top-0 left-0 w-full h-38 bg-neutral-100 border-neutral-200 rounded-lg z-10 py-2 px-5 box-border flex flex-col items-center justify-around text-black border-2",
        buttonsContainer: "flex justify-between items-center w-full h-1/2 ",
        yesButton: "bg-lime-300 hover:bg-lime-400 active:bg-lime-500 px-6 py-1 rounded-lg text-black font-semibold cursor-pointer shadow-md",
        noButton: "bg-red-300 hover:bg-red-400 active:bg-red-500 px-6 py-1 rounded-lg text-black font-semibold cursor-pointer shadow-md",
        popupMessage: "flex flex-col justify-center gap-1 items-start w-full h-full",
    };
};

export default useStyles;