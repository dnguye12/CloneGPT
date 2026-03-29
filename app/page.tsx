import HomeInput from "./components/HomeInput";


export default function Home() {

    return (
        <div className="main-container">
            <div className="w-full">
                <h1 className=" text-center whitespace-pre-wrap text-pretty text-3xl">What are you working on?</h1>
                <HomeInput />
            </div>
        </div>
    );
}
