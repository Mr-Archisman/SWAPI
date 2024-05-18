import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Text,
  VStack,
  Heading,
  SimpleGrid,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { Person } from '../types';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useDarkMode } from '../hooks/DarkModeContext';
import Loader from '../components/Loader';

const PersonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [person, setPerson] = useState<Person | null>(null);
  const [films, setFilms] = useState<string[]>([]);
  const [homeworld, setHomeworld] = useState<string>('');
  const [vehicles, setVehicles] = useState<string[]>([]);
  const [starships, setStarships] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();
  const fromPage = location.state?.fromPage || 1;

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://swapi.dev/api/people/${id}/?format=json`
        );
        setPerson(data);

        // Fetching films
        const filmTitles = await Promise.all(
          data.films.map((filmUrl: string) =>
            axios.get(filmUrl).then((res) => res.data.title)
          )
        );
        setFilms(filmTitles);

        // Fetching homeworld
        const homeworldData = await axios.get(data.homeworld);
        setHomeworld(homeworldData.data.name);

        // Fetching vehicles
        const vehicleNames = await Promise.all(
          data.vehicles.map((vehicleUrl: string) =>
            axios.get(vehicleUrl).then((res) => res.data.name)
          )
        );
        setVehicles(vehicleNames);

        // Fetching starships
        const starshipNames = await Promise.all(
          data.starships.map((starshipUrl: string) =>
            axios.get(starshipUrl).then((res) => res.data.name)
          )
        );
        setStarships(starshipNames);
      } catch (error) {
        console.error('Fetching person details failed:', error);
      }
      setIsLoading(false);
    };

    fetchDetails();
  }, [id]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Box
        className='dark:bg-[#202C36] bg-[#FAFAFA] dark:text-white lg:overflow-hidden'
        h='100vh'
      >
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
        {isLoading ? (
          <Loader />
        ) : (
          <Box padding={4} marginTop='64px' className=' '>
            <div className='dark:bg-[#202C36] p-8 md:p-12 2xl:px-64 bg-[#FAFAFA]'>
              <button
                onClick={() => navigate(`/?page=${fromPage}`)}
                className='mb-4  hover:ring-gray-700 hover:ring-2 dark:hover:ring-2 dark:hover:ring-white text-black dark:text-white hover:text-zinc-500  dark:hover:text-gray-500 rounded-md'
              >
                <div className='dark:bg-[#2b3844] rounded-md border-2 gap-3 py-1 px-4 flex justify-between items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 16 16'
                    fill='currentColor'
                    className='w-4 h-4'
                  >
                    <path
                      fillRule='evenodd'
                      d='M14 8a.75.75 0 0 1-.75.75H4.56l1.22 1.22a.75.75 0 1 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1 0-1.06l2.5-2.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z'
                      clipRule='evenodd'
                    />
                  </svg>

                  <div>Back</div>
                </div>
              </button>
              <Heading mb={6}>{person?.name}</Heading>
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={10}
                className='border-2 border-black dark:border-white rounded-md px-2 py-2 md:px-8 md:py-4'
              >
                <VStack spacing={4} align='start'>
                  <Text>
                    <Text as='span' fontWeight='semibold'>
                      Gender:
                    </Text>{' '}
                    {person?.gender}
                  </Text>
                  <Text>
                    <Text as='span' fontWeight='semibold'>
                      Birth Year:
                    </Text>{' '}
                    {person?.birth_year}
                  </Text>
                  <Text>
                    <Text as='span' fontWeight='semibold'>
                      Height:
                    </Text>{' '}
                    {person?.height} cm
                  </Text>
                  <Text>
                    <Text as='span' fontWeight='semibold'>
                      Mass:
                    </Text>{' '}
                    {person?.mass} kg
                  </Text>
                </VStack>
                <VStack spacing={4} align='start'>
                  <Text>
                    <Text as='span' fontWeight='semibold'>
                      Eye Color:
                    </Text>{' '}
                    {person?.eye_color}
                  </Text>
                  <Text>
                    <Text as='span' fontWeight='semibold'>
                      Hair Color:
                    </Text>{' '}
                    {person?.hair_color}
                  </Text>
                  <Text>
                    <Text as='span' fontWeight='semibold'>
                      Skin Color:
                    </Text>{' '}
                    {person?.skin_color}
                  </Text>
                  <Text>
                    <Text as='span' fontWeight='semibold'>
                      Homeworld:
                    </Text>{' '}
                    {homeworld}
                  </Text>
                </VStack>
              </SimpleGrid>
              <Text fontWeight='bold' mt='8'>
                Films:
              </Text>
              <Wrap>
                {films.map((film, index) => (
                  <WrapItem key={index}>
                    <Box
                      bg={darkMode ? 'gray.600' : 'gray.200'}
                      px={2}
                      py={1}
                      borderRadius='md'
                      m={1}
                      transition='transform 0.2s, background-color 0.2s'
                      _hover={{ transform: 'scale(1.05)', border: '1px' }}
                    >
                      {film}
                    </Box>
                  </WrapItem>
                ))}
              </Wrap>
              {vehicles.length > 0 && (
                <Text fontWeight='bold' mt='8'>
                  Vehicles:
                </Text>
              )}
              <Wrap>
                {vehicles &&
                  vehicles.map((vehicle, index) => (
                    <WrapItem key={index}>
                      <Box
                        bg={darkMode ? 'gray.600' : 'gray.200'}
                        px={2}
                        py={1}
                        borderRadius='md'
                        m={1}
                        transition='transform 0.2s, background-color 0.2s'
                        _hover={{ transform: 'scale(1.05)', border: '1px' }}
                      >
                        {vehicle}
                      </Box>
                    </WrapItem>
                  ))}
              </Wrap>
              {starships.length > 0 && (
                <Text fontWeight='bold' mt='8'>
                  Starships:
                </Text>
              )}
              <Wrap>
                {starships &&
                  starships.map((starship, index) => (
                    <WrapItem key={index}>
                      <Box
                        bg={darkMode ? 'gray.600' : 'gray.200'}
                        px={2}
                        py={1}
                        borderRadius='md'
                        m={1}
                        transition='transform 0.2s, background-color 0.2s'
                        _hover={{ transform: 'scale(1.05)', border: '1px' }}
                      >
                        {starship}
                      </Box>
                    </WrapItem>
                  ))}
              </Wrap>
            </div>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default PersonDetail;
