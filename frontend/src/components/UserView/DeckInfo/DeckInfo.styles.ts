const useStyles = () => {
    return {
        deck: "bg-white h-38 p-4 rounded-lg flex flex-col justify-center items-start group relative overflow-hidden my-4 transition-shadow duration-300 hover:border-2 hover:border-amber-300",
        deckContainer: "relative min-w-1/3",
        deckHeader: "flex justify-between items-center w-full",
        deckActions: "flex justify-between items-center gap-1",
        edit: "cursor-pointer z-100 transition-colors md:invisible md:group-hover:visible hover:stroke-gray-700 active:stroke-gray-800",
        delete: "cursor-pointer z-100 transition-colors md:invisible md:group-hover:visible hover:stroke-red-400 active:stroke-red-500",
        separator: "my-1 h-0.5 border-t-0 bg-black w-full",
        description: "line-clamp-2 mb-2 w-full flex-1",
        language: "flex justify-end items-center w-full",
    };
};

export default useStyles;