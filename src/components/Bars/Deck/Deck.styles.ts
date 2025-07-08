const useStyles = () => {
    return {
        deck: "bg-white p-4 rounded-lg w-full h-38 flex flex-col justify-center items-center group relative overflow-hidden my-4",
        deckHeader: "flex justify-between items-center w-full",
        deckActions: "flex justify-between items-center gap-1",
        icon: "cursor-pointer hover:stroke-gray-700 active:stroke-gray-700 transition-colors md:max-3xl:invisible md:max-3xl:group-hover:visible ",
        separator: "my-1 h-0.5 border-t-0 bg-amber-200 w-full",
        description: "line-clamp-2 mb-2 w-full flex-1",
        language: "flex justify-end items-center w-full",
    };
};

export default useStyles;