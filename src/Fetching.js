import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import './Fetching.css'
const MyComponent = () => {
  const [chartData, setChartData] = useState({});
  const [showChart, setShowChart] = useState(false);

  ChartJS.register(...registerables);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.terriblytinytales.com/test.txt');
        const text = await response.text();

        // Remove punctuation and convert text to lowercase
        const cleanedText = text.replace(/[^\w\s]|_/g, '').toLowerCase();

        // Split text into an array of words
        const words = cleanedText.split(/\s+/);

        // Calculate word frequencies
        const frequencies = {};
        words.forEach((word) => {
          frequencies[word] = (frequencies[word] || 0) + 1;
        });

        // Sort words by frequency in descending order
        const sortedWords = Object.keys(frequencies).sort(
          (a, b) => frequencies[b] - frequencies[a]
        );

        // Select the 20 most occurring words
        const topWords = sortedWords.slice(0, 20);

        // Create the chart data
        const chartData = {
          labels: topWords,
          datasets: [
            {
              label: 'Word Frequency',
              data: topWords.map((word) => frequencies[word]),
              backgroundColor: [
                'rgba(220, 120, 111, 0.9)',
                'rgba(254, 132, 35, 0.5)',
                'rgba(75, 60, 186, 0.8)',
                'rgba(175, 202, 19, 1)',
                'rgba(190, 90, 175, 0.7)',
                'rgba(20, 39, 164, 0.8)',
                'rgba(175, 192, 192, 1)',
                'rgba(153, 10, 255, 0.7)',
                'rgba(255, 10, 74, 0.8)',
                'rgba(255, 10, 74, 0.8)',
                'rgba(205, 79, 96, 0.8)',
                'rgba(205, 79, 96, 0.8)',
                'rgba(125, 19, 114, 0.8)',
                'rgba(125, 19, 114, 0.8)',
                'rgba(55, 250, 164, 0.8)',
                'rgba(55, 250, 164, 0.8)',
                'rgba(55, 250, 164, 0.8)',
                'rgba(55, 250, 164, 0.8)',
                'rgba(155, 259, 164, 0.8)',
                'rgba(155, 259, 164, 0.8)',
              ],
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const exportCsv = () => {
    const data = chartData.datasets[0].data;
    const labels = chartData.labels;
    const rows = labels.map((label, index) => [label, data[index]]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      rows.map((row) => row.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'histogram_data.csv');
    document.body.appendChild(link);
    link.click();
  };

  const handleButtonClick = () => {
    setShowChart(true);
  };

  return (
    <div>
      {!showChart && <button onClick={handleButtonClick} className='button-73'>Submit</button>}
      {showChart && Object.keys(chartData).length > 0 && <Bar data={chartData} />}
      {showChart && Object.keys(chartData).length > 0 && (
        <button className='button-73' onClick={exportCsv}>Export</button>
      )}
    </div>
  );
};

export default MyComponent;
