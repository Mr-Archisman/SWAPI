import { useDarkMode } from '../hooks/DarkModeContext';


const Loader = () => {
  const { darkMode } = useDarkMode();
  const spinnerColor = darkMode ? 'white' : 'black';
  return (
    <div className={darkMode ? 'dark' : ''}>
    <div className='flex justify-center items-center h-full w-full fixed left-0 top-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)] dark:bg-[#2b3844]'>
              <div
                className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                style={{
                  borderColor: `${spinnerColor} transparent ${spinnerColor} transparent`,
                  borderWidth: '4px',
                  borderStyle: 'solid'
                }}
                role='status'
              >
                <span className='absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip:rect(0,0,0,0)'>
                  Loading...
                </span>
              </div>
            </div>
            </div>
  )
}

export default Loader