'use client'
import React from 'react';
import { ChangeEvent, useState } from 'react';
import "./styles.css";
// Components //
import BoxTextDisplay from "../Utilities"
import axios from 'axios';
import baseUrl from "../../assests/baseUrl";
import Typewriter from 'typewriter-effect';
// loader //
import ReactLoading from 'react-loading';


const Main = () => {
    // State variables //
    const [transcript, setTranscript] = useState('');
    const [responseData, setResponseData] = useState('');
    const [loading, setLoading] = useState(false);

    // Get Search Parameters //
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTranscript(event.target.value);
    };

    // Get function //
    const getResponse = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseUrl}/unus/response?message=${transcript}`);
            setResponseData(response.data);
            setLoading(false);
        } catch (error) {
            setResponseData('Unable to respond to this query.');
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    };

    // Clear response //
    const clear = () => {
        setTranscript('');
        setResponseData('');
    };

    // Event handler for search button click //
    const handleButtonClick = () => {
        getResponse();
        clear();
    };


    return (
        <div className='mainContainer'>
            <div className='displayBoxContainer'>
                {loading ? (<ReactLoading type='bars' color={"#78D6C6"} height={60} width={60} />) : (<> {responseData === '' ? <BoxTextDisplay /> :
                    <div className='textTabContainer'>
                        <Typewriter
                            options={{
                                strings: responseData,
                                autoStart: true,
                                loop: false
                            }}
                        />
                    </div>}
                </>)}
            </div>
            <div className='bottomContainerMain'>
                <div className='bottomContainer'>
                    <input
                        value={transcript}
                        onChange={handleSearchChange}
                        className='inputContainer'
                        placeholder='Start Searching'
                    />
                    <div className='findSynthesisContainer'>
                        <button className='btnSearch' onClick={handleButtonClick}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;