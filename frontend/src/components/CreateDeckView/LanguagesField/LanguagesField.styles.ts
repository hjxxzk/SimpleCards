const useStyles = () => {
    return {
        languageChoice: "text-xs bg-neutral-100 h-15 w-15 sm:w-20 md:w-30 lg:w-30 xl:w-40 2xl:w-60 flex justify-center items-center rounded-xl py-7 active:bg-amber-400 hover:bg-amber-300 border-b-2 border-black",
        languagesList: "flex flex-col gap-5 w-18 sm:w-23 md:w-35 lg:w-35 xl:w-45 2xl:w-65 h-80 overflow-auto scrollbar-yellow",
        languageOption: "text-xs bg-neutral-100 w-15 sm:w-20 h-15 md:w-30 lg:w-30 xl:w-40 2xl:w-60 flex justify-center items-center rounded-xl py-7 active:bg-amber-300 hover:border-2 hover:border-amber-300",
    }
}

export default useStyles;