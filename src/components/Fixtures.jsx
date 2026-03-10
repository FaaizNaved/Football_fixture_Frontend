import { useEffect, useState } from 'react';
import footballer from '../assets/footballer.png';
import footballer2 from '../assets/footballer_2.png';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const Fixtures = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [fixturesData, setFixturesData] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const perPage = 10;

    const indexOfLastItem = currPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const fixtures = fixturesData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(fixturesData.length / perPage);

    const handleNext = () => {
        if (currPage < totalPages) setCurrPage(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currPage > 1) setCurrPage(prev => prev - 1);
    };


    const fetchFixtures = async () => {
        try {
            setLoading(true);
            const url = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(url);
            const responseData = await response.json();

            if (responseData.success) {
                setLoading(false);
                setFixturesData(responseData?.data?.response);
            } else {
                setLoading(false);
                navigate("/");
                alert(responseData.message);
            }
        } catch (error) {
            console.log(error);
            navigate("/");
            alert("Error fetching data!");
        }
    };

    function formatUnixTimestamp(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000); // Convert to milliseconds

        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${yyyy}-${mm}-${dd} ${hours}:${minutes}`;
    };

    const logoCss = `object-contain h-10 w-fit`;

    useEffect(() => {
        fetchFixtures();
        // eslint-disable-next-line
    }, []);

  return (
    <>
        {
            loading ? (<Loader />) : (
                <div className='bg-gradient-to-r from-[#c8102E] to-[#DA291C] min-h-screen relative'>
                    
                    <div className='absolute left-0 object-contain top-0 w-[30%] h-[100vh] opacity-[0.65] animate-pulse -z-10'>
                        <img loading='lazy' className='object-contain h-full w-full' src={footballer2} alt="footballer" />
                    </div>

                    <div className='w-10/12 mx-auto h-full flex flex-col gap-y-10 py-10 z-10 max-xl:w-11/12 max-lg:w-[90%]'>
                        <div className='flex items-center w-full justify-between'>
                            <button onClick={() => {
                                navigate('/');
                                console.log("Button clicked")
                            }} className='w-fit font-semibold text-lg bg-white text-[#DA291C] py-2 px-4 rounded-lg cursor-pointer max-md:text-[1rem] max-sm:text-sm'>&larr; Go back</button>
                           <h1 className='text-center text-4xl font-bold text-white uppercase w-[90%] max-lg:text-3xl max-md:text-2xl max-sm:text-xl'>Fixtures !</h1>
                        </div>

                        <div className='grid grid-cols-3 gap-10 max-lg:grid-cols-2 max-md:grid-cols-1 max-lg:gap-7 max-md:gap-5'>
                            {
                                fixtures?.length > 0 ? fixtures.map(fixture => (
                                    <div className='bg-white p-5 rounded-lg flex flex-col gap-y-7 justify-between' key={fixture?.fixture?.id}>
                                        {/* Leage details */}
                                        <div className='flex items-center gap-x-2 justify-between'>
                                            <img loading='lazy' src={fixture?.league?.logo} className={logoCss} alt="logo" />
                                            <p className='font-bold uppercase'>{fixture?.league?.name}</p>
                                            <img loading='lazy' src={fixture?.league?.flag} alt="flag" className={logoCss} />
                                        </div>

                                        {/* team details */}
                                        <div className='flex gap-x-3 items-center justify-center text-sm text-gray-800'>
                                            <img loading='lazy' src={fixture?.teams?.home?.logo} alt='team logo' className={logoCss} />
                                            <div className='flex flex-col gap-y-1 items-center'>
                                                <p className='text-center'>{fixture?.teams?.home?.name}</p>
                                                <p className='text-xs font-semibold'>(Home)</p>
                                            </div>
                                            <p>-</p>
                                            <div className='flex flex-col gap-y-1 items-center'>
                                                <p className='text-center'>{fixture?.teams?.away?.name}</p>
                                                <p className='text-xs font-semibold'>(Away)</p>
                                            </div>
                                            <img loading='lazy' src={fixture?.teams?.away?.logo} alt='team logo' className={logoCss} />
                                        </div>

                                        {/* Goal details */}
                                        <div className='flex gap-x-3 items-center justify-center text-lg font-semibold text-gray-800'>
                                            <p>{fixture?.goals?.home}</p>
                                            <p>-</p>
                                            <p>{fixture?.goals?.away}</p>
                                        </div>

                                        <div className='flex flex-col gap-y-2'>
                                            {/* venue details */}
                                            <div className='flex gap-x-2 items-center text-sm text-gray-700'>
                                                <p className='font-semibold'>Venue: </p>
                                                <p>{fixture?.fixture?.venue?.name + " " + fixture?.fixture?.venue?.city}</p>
                                            </div>

                                            {/* date and time */}
                                            <div className='text-xs flex justify-between'>
                                                <div className={`${fixture?.fixture?.status?.short === "NS" ? 'text-blue-300' : fixture?.fixture?.status?.short === "FT" ? 'text-green-300' : 'text-red-400'} font-semibold`}>{fixture?.fixture?.status?.long}</div>
                                                <div>{formatUnixTimestamp(fixture?.fixture?.timestamp)}</div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (<div className='text-white text-3xl text-center w-full font-semibold'>
                                    No data exist!
                                </div>)
                            }
                        </div>
                        <div className='flex gap-x-5 items-center text-white mx-auto'>
                            <button onClick={handlePrev} disabled={currPage === 1} className='bg-white text-[#DA291C] px-4 py-2 rounded cursor-pointer disabled:opacity-[0.75]'>Previous</button>
                            <span style={{ margin: '0 10px' }}>Page {currPage} of {totalPages}</span>
                            <button className='bg-white text-[#DA291C] px-4 py-2 rounded cursor-pointer disabled:opacity-[0.75]' onClick={handleNext} disabled={currPage === totalPages}>Next</button>
                        </div>
                    </div>


                    <div className='absolute right-0 object-contain top-0 w-[30%] h-[100vh] opacity-[0.65] animate-pulse -z-10'>
                        <img loading='lazy' className='object-contain h-full w-full' src={footballer} alt="footballer" />
                    </div>
                </div>
            )
        }
    </>
  )
}

export default Fixtures
