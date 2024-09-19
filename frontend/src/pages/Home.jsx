import { useEffect, useState } from "react";
import Display from "../Components/Display";
import Header from "../Components/Header";
import apiHelper from "../controller/APIController";

// eslint-disable-next-line react/prop-types
const Home = () => {

    const [display, setDisplay] = useState(false);
    const [type, setType] = useState('');
    const [response, setResponse] = useState(null);
    const [loading , setLoading] = useState(false);

    const helper = async (type) => {
        console.log("IN HELPER")
        setLoading(true);
        let apiResonse = await apiHelper(type);
        console.log('RESPONSE IS IN HELPER', apiResonse);
        setLoading(false);
        const responseObject = {
            title: "Top Playlists",
            data: apiResonse
        }
        return responseObject;
    }

    useEffect(() => {


        if (display) {

            const fetchData = async () => {
                let response = null;

                // Handle display logic
                if (type === 'top-playlists') {
                    console.log('Top Playlists');
                    response = await helper('top-playlists');
                } else if (type === 'top-artists') {
                    console.log('Top Artists');
                }

                setResponse(response);
            }
            setResponse(null);
            fetchData();
        }
    }, [display, type])

    return (
        <div className="flex flex-col justify-center items-center">
            <Header display={display} setDisplay={setDisplay} setType={setType}/>

            {loading ? <Display title="Loading..." data="" /> : 
            display && response && <Display title={response.title} data={response.data} /> }
        </div>
    );
}

export default Home;
