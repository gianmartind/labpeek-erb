import DefaultButton from "./default-button"

function Main() {
    return (
        <div className="flex flex-col h-screen font-sans">
            <div className="p-2 flex justify-center">
                <h1 className="text-4xl">LAB PEEK</h1>
            </div>
            <div className="flex flex-row grow gap-3 px-2">
                <div className="h-full grow rounded-lg border-2 border-dotted hover:border-solid">

                </div>
                <div className="h-full grow rounded-lg border-2 border-dotted hover:border-solid">

                </div>
                <div className="h-full grow rounded-lg border-2 border-dotted hover:border-solid">

                </div>
                <div className="h-full grow rounded-lg border-2 border-dotted hover:border-solid">

                </div>
            </div>
            <div className="p-4 flex justify-end">
                <DefaultButton>Kill Selected</DefaultButton>
            </div>
        </div>
    )
}

export default Main