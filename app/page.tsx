import HomeInput from "./components/HomeInput";


export default function Home() {
    return (
        <div className="container mx-auto max-w-3xl flex justify-center items-center h-[calc(100vh-64px)] px-6">
            <div className="w-full">
                <h1 className=" text-center whitespace-pre-wrap text-pretty text-3xl">What are you working on?</h1>
                <HomeInput />
            </div>
        </div>
    );
}
