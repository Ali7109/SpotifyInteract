import { motion } from 'framer-motion';

// eslint-disable-next-line react/prop-types
const Display = ({ title, data }) => {
  console.log("TITLE", title);
  console.log("DATA", data);
  return (
    <motion.div layout className="bg-[#98CE00] px-5 py-2 pt-10 pb-5 rounded-3xl relative w-full">
      <h1 className="absolute bg-white -left-3 -top-2 px-3 py-2 rounded-2xl">{title}</h1>
      
      <ul className="grid gap-4 mt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data && data.map((item, index) => (
          <li key={index} className="bg-[#001011] p-2 rounded-lg flex flex-col items-center text-center">
            <div className="text-[#98CE00] font-bold mb-2">{item.name}</div>
            <p className="text-white mb-2">{item.description}</p>
            <a className="flex justify-center" href={item.url} >
              <img src={item.image} alt={item.name} className="max-w-56 m-auto rounded-lg" />
            </a>
          </li>
        ))}
      </ul>
      
    </motion.div>
  );
};

export default Display;
