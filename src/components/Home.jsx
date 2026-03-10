import { useNavigate } from 'react-router-dom';
import footballer from '../assets/footballer.png';

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="h-screen w-[90vw] bg-[#DA291C] rounded-br-full poppins relative">
      <div className="w-10/12 mx-auto h-full text-white flex flex-col gap-y-5 max-md:gap-y-3 justify-center">
        <h1 className="font-bold text-4xl max-lg:text-3xl max-md:text-2xl">Football Fever Starts Here – Fixtures Unleashed!</h1>
        <p className="w-[60%] text-sm text-slate-200 max-md:text-xs">The excitement never stops in the world of football! Whether you’re a die-hard fan or a casual supporter, staying updated on upcoming matches is key. Below are some of the most anticipated fixtures—mark your calendar and get ready for thrilling action!</p>
        <h4 className="font-semibold text-2xl mt-5 max-md:text-xl max-md:mt-3">Why Keep Track of Fixtures?</h4>
        <ul className="flex flex-col gap-y-1 text-sm text-slate-200 list-inside list-disc max-md:gap-y-0.5 max-md:text-xs">
            <li>Never miss your team’s big match</li>
            <li>Plan your watch parties in advance</li>
            <li>Follow rivalries, derbies, and title deciders</li>
        </ul>

        <button 
            onClick={() => navigate("/fixtures")}
            className="bg-white text-xl rounded hover:bg-[#DA291C] hover:text-white border-2 border-white transition-all duration-300 ease-in-out font-semibold text-[#DA291C] w-fit py-3 px-10 shadow-2xl cursor-pointer mt-7 max-md:mt-5 max-md:text-[1rem] max-md:px-7 max-md:py-2">
                View All Upcoming Fixtures &rarr;
        </button>
      </div>

      <div className='absolute -right-[10%] max-md:-right-[5%] max-md:w-[30%] object-contain top-0 w-[40%] h-full'>
        <img className='object-contain h-full w-full' src={footballer} alt="footballer" />
      </div>
    </div>
  )
}

export default Home
