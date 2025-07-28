const useStyles = () => {
    return {
        mainContainer: "flex flex-col h-screen items-center pt-10 sm:pt-3 bg-gray-5",
        logo: "w-80 pb-10 cursor-pointer",
        formContainer: "bg-gray-50 h-full flex flex-col justify-center items-center gap-5 text-lg bold",
        title: "text-2xl font-semibold mb-8",
        inputContainer: "flex flex-col mt-2 gap-3 text-xl min-w-70",
        input: "bg-gray-200 rounded-lg min-h-9 text-lg",
        conditionText: "flex items-center",
        approved: "border-2 border-lime-400",
        margin: "mt-10",
        createAccountButton: "px-15 py-3 mt-10 bg-amber-300 hover:bg-amber-400 active:bg-amber-500 rounded-xl text-black font-semibold cursor-pointer shadow-md",
    }
};

export default useStyles;