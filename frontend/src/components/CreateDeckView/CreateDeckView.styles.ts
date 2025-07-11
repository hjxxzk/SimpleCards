const useStyles = () => {
    return {
        mainContainer: "w-full f-full flex flex-col bg-white rounded-tl-3xl shadow-lg px-5 my-5 mx-3 md:px-8 md:py-8 md:mx-5 xl:mx-5 xl:my-3 lg:py-5 lg:px-10 xl:py-10 xl:px-15 justify-center lg:my-5 lg:mr-5 rounded-3xl",
        title: "text-2xl font-bold text-center mb-5",
        separator: "h-0.5 border-t-0 bg-black mt-8 mb-7",
        form: "flex gap-5 w-full h-3/5 py-5 pt-15",
        text: "text-lg semibold",
        textInputContainer: "flex flex-col gap-5 w-1/2 h-full",
        deckNameInput: "bg-neutral-100 border-b-2 h-10 w-30 md:w-60 lg:w-60 xl:w-70 2xl:w-100 3xl:w-150",
        descriptionInput: "bg-neutral-100 border-b-2 h-47 md:h-70 w-30 md:w-60 lg:w-60 xl:w-70 2xl:w-100 3xl:w-150",
        languageChoiceContainer: "flex flex-col gap-5 w-1/4 h-full",
        buttonContainer: "flex justify-center pt-5 md:pt-0 md:justify-end items-center w-full px-10",
        createDeckButton: "py-5 w-30 md:py-6 md:w-40 xl:py-8 lg:py-6 lg:w-50 xl:w-60 bg-amber-300 hover:bg-amber-400 active:bg-amber-500 rounded-xl text-black font-semibold cursor-pointer shadow-md",
    };
}

export default useStyles;