
1. Every thing use in Fetching.js


It imports necessary dependencies and initializes the component using the useState and useEffect hooks.
The useState hook is used to create a state variable called chartData and a function setChartData to update it.
The useEffect hook is used to fetch data from the URL when the component mounts. The fetchData function is defined within the useEffect hook and is called immediately.
Inside the fetchData function, the text response is cleaned by removing punctuation and converting it to lowercase.
The cleaned text is split into an array of words using the split method.
Word frequencies are calculated by iterating over the array of words and updating the frequencies object accordingly.
The words are sorted in descending order based on frequency, and the top 20 words are selected.
The chart data object is created with labels as the top words and data as the corresponding frequencies.
The chartData state is updated using the setChartData function.
If an error occurs during data fetching or processing, an error message is logged to the console.
The exportCsv function is defined, which extracts data from the chartData state, creates a CSV file, and initiates its download.
The component renders a heading, a Bar component from react-chartjs-2 library if chartData is not empty, and a button with an onClick event listener that triggers the exportCsv function.



2. Import the Fetching.js to App.js 


4. Have Done some CSS also For button

Thank you

