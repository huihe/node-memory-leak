import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import * as d3 from 'd3';
import pep14 from './data/memory_usage_pep-rent14.csv';
import pdp14 from './data/memory_usage_pdp-rent14.csv';
import pep18 from './data/memory_usage_pep-rent18.csv';
import pdp18 from './data/memory_usage_pdp-rent18.csv';

const legend = {
  display: true,
  position: 'bottom',
  labels: {
    fontSize: 20,
  },
};

const options = {
  title: {
    display: true,
    text: 'node v8 memory usage',
  },
  scales: {
    xAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: 'Minutes',

        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 60,
        },
      },
    ],
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: 'MB',

        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 128,
        },
      },
    ],
  },
};

async function fetchData(rawData) {
  const raw = await d3.csv(rawData);
  const time = raw.map((c) => c.time*2);
  const rss = raw.map((c) => c.rss);
  const heapTotal = raw.map((c) => c.heapTotal);
  const heapUsed = raw.map((c) => c.heapUsed);

  const data = {
    labels: time,
    datasets: [
      // {
      //   label: 'rss',
      //   data: rss,
      // },
      {
        label: 'Total heap',
        data: heapTotal,
      },
      {
        label: 'Used heap',
        data: heapUsed,
      },
    ],
  };

  return data;
}

export function Memory() {
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [data3, setData3] = useState({});
  const [data4, setData4] = useState({});

  useEffect(async () => {
    setData1(await fetchData(pep14));
    setData2(await fetchData(pdp14));
    setData3(await fetchData(pep18));
    setData4(await fetchData(pdp18));
  }, []);

  return (
    <div>
      <h1>PEP v0.2.4</h1>
      <div className='Memory'>
        <Line data={data1} legend={legend} options={options} />
      </div>
      <h1>PDP v0.2.4</h1>
      <div className='Memory'>
        <Line data={data2} legend={legend} options={options} />
      </div>
      <h1>PEP v0.2.5</h1>
      <div className='Memory'>
        <Line data={data3} legend={legend} options={options} />
      </div>
      <h1>PDP v0.2.5</h1>
      <div className='Memory'>
        <Line data={data4} legend={legend} options={options} />
      </div>
    </div>
  );
}
