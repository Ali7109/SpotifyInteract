import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

// eslint-disable-next-line react/prop-types
const Header = ({display, setDisplay, setType}) => {

    const displayHelper = (type) => {
        setDisplay(true);
        setType(type);
    }

  return (
    <motion.div layout className="p-10 m-10 bg-[#FFFFFC] rounded-3xl">
      <h1 className="text-5xl font-bold text-[#001011]">Spotify Interact</h1>

      <div className="p-2 w-full flex justify-center">
        {!display ? 
        <>
            <button onClick={() => displayHelper('top-playlists')} className="text-lg transition m-1 px-2 py-1 rounded-md hover:bg-[#001011] hover:text-[#98CE00] text-[#001011] bg-[#98CE00]">Top Playlists</button>
            <button onClick={() => displayHelper('top-artists')} className="text-lg transition m-1 px-2 py-1 rounded-md hover:bg-[#001011] hover:text-[#98CE00] text-[#001011] bg-[#98CE00]">About</button>
        </>
        :
        <Link onClick={() => setDisplay(false)} to="/" className="text-lg m-1 px-2 py-1 transition rounded-md hover:bg-[#001011] hover:text-[#757780] text-[#001011] bg-[#757780]">Close</Link>
        }
        
      </div>
    </motion.div>
  );
}

export default Header;
