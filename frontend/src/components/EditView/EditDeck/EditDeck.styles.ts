const useStyles = () => {
    return {
        mainContainer: "flex h-3/4 lg:h-full lg:w-3/4 xl:w-4/5 flex-col box-border sm:px-5 sm:px-15 md:px-10 md:py-8 lg:py-5 lg:px-5 xl:py-5 xl:px-10 justify-center 2xl:pl-15",
        title: "text-2xl font-bold text-center mt-5",
        separator: "h-0.5 border-t-0 bg-black mt-8 mb-2 lg:mb-7 mx-3",
        form: "flex justify-around sm:gap-5 w-full h-3/5 py-5 pt-10 sm:pt-15",
        text: "xs:text-md sm:text-lg semibold sm:text-center",
        textInputContainer: "flex flex-col gap-5 w-1/3 sm:w-1/2 h-full items-center",
        deckNameInput: "bg-neutral-100 border-b-2 h-15 w-30 sm:w-50 md:w-60 lg:w-60 xl:w-70 2xl:w-100 3xl:w-140",
        descriptionInput: "bg-neutral-100 border-b-2 h-47 md:h-70 w-30 sm:w-50 md:w-60 lg:w-60 xl:w-70 2xl:w-100 3xl:w-140",
        languageChoiceContainer: "flex flex-col gap-5 w-1/5 sm:w-1/4 h-full items-start sm:items-center",
        buttonContainer: "flex pt-5 md:pt-0 justify-center items-center w-full h-full px-5",
        editDeckButton: "py-4 sm:py-5 w-30 md:py-6 md:w-40 lg:py-6 lg:w-50 xl:w-50 bg-amber-300 hover:bg-amber-400 active:bg-amber-500 rounded-xl text-black font-semibold cursor-pointer shadow-md",
        splitLines: "xl:hidden",
    };
}

export default useStyles;