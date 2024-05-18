import{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PersonCard from '../components/PersonCard';
import { fetchPeopleFromUrl } from '../services/countryService';
import { Person } from '../types';
import { useDarkMode } from '../hooks/DarkModeContext';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const Home: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [allPeople, setAllPeople] = useState<Person[]>([]); // To hold all fetched people for search filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      const url = `https://swapi.dev/api/people/?page=${currentPage}&format=json`;
      const response = await fetchPeopleFromUrl(url);
      setAllPeople(response.results);
      setPeople(response.results);
      setTotalPages(Math.ceil(response.count / 10)); // Assuming 10 items per page
      setIsLoading(false);
    };

    fetchPeople();
  }, [currentPage]);

  useEffect(() => {
    const filtered = allPeople.filter((person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPeople(filtered);
  }, [searchTerm, allPeople]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className='fixed top-0 w-full bg-white z-10 shadow-md p-4 dark:text-white dark:bg-[#2b3844]'>
        <div className='flex justify-between items-center max-w-6xl mx-auto'>
          <Link to={'/'} className='text-2xl font-bold'>
            SWAPI People
          </Link>
          <DarkModeSwitch
            checked={darkMode}
            onChange={toggleDarkMode}
            size={20}
          />
        </div>
      </div>
      <div className='bg-[#FAFAFA] dark:bg-[#202C36] p-8 md:p-12 2xl:px-64 mt-16'>
        <div className='flex justify-between items-center'>
          <input
            type='text'
            placeholder='Search for a person...'
            value={searchTerm}
            onChange={handleSearchChange}
            className='pl-10 pr-3 py-2 border border-gray-300 rounded text-lg w-full focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-500 focus:border-transparent dark:bg-[#2B3844] dark:border-[#202C36] dark:placeholder:text-white dark:text-white hover:ring-gray-700 hover:ring-2 dark:hover:ring-2 dark:hover:ring-white text-black hover:text-zinc-500  dark:hover:text-gray-500'
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-16 mt-12 dark:bg-[#202C36] justify-center items-center '>
                 {people.length > 0 ? (
            people.map((person, index) => (
              <>
                {index === 8 && <div className='hidden xl:block w-full h-0'></div>}
                {index === 9 && <div className='hidden md:block xl:hidden w-full h-0'></div>}
                <PersonCard key={index} person={person} />
              </>
            ))
          ) : (
            <div className='text-center w-full'>No results found.</div>
          )}
          {isLoading && (
            <div className='flex justify-center items-center h-full w-full fixed left-0 top-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)]'>
              <div
                className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                role='status'
              >
                <span className='absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip:rect(0,0,0,0)'>
                  Loading...
                </span>
              </div>
            </div>
          )}
        </div>
        <div className='flex items-center justify-center space-x-2 mt-12'>
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className={`text-xs md:text-sm bg-zinc-500 hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 ${
      darkMode ? 'bg-zinc-700 hover:bg-zinc-800' : 'bg-zinc-500 hover:bg-zinc-600'
    }`}
  >
    {'<<'}
  </button>
  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
    <button
      key={page}
      onClick={() => handlePageChange(page)}
      className={`text-xs md:text-sm font-bold py-2 px-2 rounded ${
        page === currentPage ? 'bg-zinc-700 text-white' : 'bg-zinc-500 text-white hover:bg-zinc-600'
      } ${darkMode ? 'bg-zinc-800 hover:bg-zinc-900' : ''}`}
    >
      {page}
    </button>
  ))}
  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    className={`text-xs md:text-sm bg-zinc-500 hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 ${
      darkMode ? 'bg-zinc-800 hover:bg-zinc-900' : 'bg-zinc-500 hover:bg-zinc-600'
    }`}
  >
    {'>>'}
  </button>
</div>

      </div>
    </div>
  );
};

export default Home;
