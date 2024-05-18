import { Box, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Person } from '../types'; // Ensure this is correctly imported
import { useDarkMode } from '../hooks/DarkModeContext';
import { Link } from 'react-router-dom';
const PersonCard = ({ person,currentPage  }: { person: Person ,currentPage :number}) => {
    // Extract the ID safely
    const personId = person.url.match(/\/api\/people\/(\d+)/)?.[1] ?? 'unknown';
    const { darkMode } = useDarkMode();

    // Define text colors based on the dark mode status
    const textColor = darkMode ? "gray.200" : "gray.800";

    return (
        <Link to={`/person/${personId}`} state={{ fromPage: currentPage }}>
        <LinkBox as="article" maxW="lg" p="5" borderWidth="1px" rounded="md" shadow="md" height="100%" width="100%" bg={darkMode ? "#2b3844" : "white"} transition="transform 0.2s, background-color 0.2s" _hover={{ transform: 'scale(1.05)' }}>
            
            <LinkOverlay href={`/person/${personId}`} isExternal={false} >
                <Box p="5">
                    <Text fontSize="xl" fontWeight="bold" color={textColor}>{person.name}</Text>
                    <Text mt="1" color={textColor}>
                        <Text as="span" fontWeight="semibold">Birth Year:</Text> {person.birth_year}
                    </Text>
                    <Text mt="1" color={textColor}>
                        <Text as="span" fontWeight="semibold">Gender:</Text> {person.gender}
                    </Text>
                    <Text mt="1" color={textColor}>
                        <Text as="span" fontWeight="semibold">Mass:</Text> {person.mass} kg
                    </Text>
                    <Text mt="1" color={textColor}>
                        <Text as="span" fontWeight="semibold">Height:</Text> {person.height} cm
                    </Text>
                    {/* Additional details */}
                </Box>
            </LinkOverlay>
        </LinkBox>
        </Link>
    );
};

export default PersonCard;
