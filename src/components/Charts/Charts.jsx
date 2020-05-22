import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';
import styles from './Charts.module.css';



const Charts= ({ data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData]= useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
          setDailyData(await fetchDailyData());
    
          //setDailyData(initialDailyData);
        };
        //console.log(dailyData);
        fetchAPI();
      },[]);
      const lineChart = (
        dailyData[0] ? (
          <Line
            data={{
              labels: dailyData.map(({date})=>date),
              datasets: [{
                data: dailyData.map((data) => data.confirmed),
                label: 'Infected',
                borderColor: '#000000',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',

                fill: true,
              }, {
                data: dailyData.map((data) => data.deaths),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill: true,
              },
              ],
            }}
          />
          ) : null
      );

      const barChart = (
        confirmed ? (
          <Bar
            data={{
              labels: ['Confirmed', 'Recovered', 'Deaths'],
              datasets: [
                {
                  label: 'People',
                  backgroundColor: ['rgba(0, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.6)'],
                  data: [confirmed.value, recovered.value, deaths.value],
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: { display: true, text: `Current state of COVID-19 in ${country}` },
            }}
          />
        ) : null
      );

      
      

      return (
        <div className={styles.container}>
          {country ? barChart : lineChart}
        </div>
      );
};
    
        

export default Charts;
