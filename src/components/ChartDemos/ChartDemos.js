import { DonutChart, GroupedBarChart, ThemeProvider } from '@my-org/ui-library'
import React, { useEffect, useState } from 'react'
import "./ChartDemos.css"
import { NivoCombinationChart, NivoDonutChart } from './Nivo/NivoComponents'
import NivoStackedBarChart from './Nivo/StackedBarChart'
import RechartsCombinationChart from './Recharts/CombinedChart'
import RechartsDonutChart from './Recharts/DonutChart'
import RechartsStackedBarChart from './Recharts/StackedBarChart'

export const MAX_POINTS = 500;

export default function ChartDemos() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <div className='p-2 flex flex-col gap-4'>
      {/* <div className='flex flex-col gap-2'> 
        <h1>
          HighCharts
        </h1>
        <div className='flex flex-row gap-2'>
          <CombinationChart/>
          <DonutChart/>
          <LargeDataChart />
        </div>
      </div>

      <div className='flex flex-col gap-2'> 
        <h1>
          Chart JS
        </h1>
        <div className='flex flex-row gap-2' style={{maxWidth: "100%"}}>
          <ChartjsCombinationChart />
          <ChartjsDonutChart />
          <ChartjsLargeDataChart />
        </div>
      </div> */}

      <div className='flex flex-col gap-2'> 
        <h1>
          Recharts
        </h1>
        <div className='flex flex-row gap-2' style={{maxWidth: "100%"}}>
          <RechartsCombinationChart />
          <RechartsDonutChart />
          {/* <RechartLargeDatasetChart /> */}
          <RechartsStackedBarChart/>
        </div>
      </div>

      <div className='flex flex-col gap-2'> 
        <h1>
          Nivo
        </h1>
        <div className='flex flex-row gap-2' style={{maxWidth: "100%"}}>
          <NivoCombinationChart />
          <NivoDonutChart />
          {/* <NivoLargeDataChart /> */}
          <NivoStackedBarChart/>
        </div>
      </div>

      <div className='flex flex-col gap-2'> 
        <h1>
          Visx
        </h1>
        <div className='flex flex-row gap-2' style={{maxWidth: "100%"}}>
          {/* <VisxCombinationChart />
          <VisxDonutChart /> */}
          
          <ThemeProvider themeMode="dark">
            <div style={{ width:"30%", height: 500, border: "1px solid black", padding: 20 }}>
              <GroupedBarChart
                width={600}
                height={200}
                data={[
                  {
                    label: 'Aasdfasdf asd',
                    data: {
                      future: 25,
                      options: 40,
                      forwards: 15,
                      fixedIncome: 12,
                      others: 32,
                    },
                  },
                  {
                    label: 'Basdfasdf asd',
                    data: {
                      future: 30,
                      options: 1,
                      forwards: 12,
                      fixedIncome: 12,
                      others: 32,
                    },
                  },
                  {
                    label: 'Casdfasdf asd',
                    data: {
                      future: 15,
                      options: 50,
                      forwards: 1,
                      fixedIncome: 12,
                      others: 32,
                    },
                  },
                  {
                    label: 'Dasdfasdf asd',
                    data: {
                      future: 40,
                      options: 35,
                      forwards: 10,
                      fixedIncome: 12,
                      others: 32,
                    },
                  },
                ]}
                groupKeys={[
                  'future',
                  'options',
                  'forwards',
                  'fixedIncome',
                  'others',
                ]}
                timestamp={new Date().toISOString()}
                isLoading={isLoading}
                title="Grouped Bar Chart"
              />
            </div>
            <div style={{ width:"30%", height: 500, border: "1px solid black", padding: 20 }}>
              <DonutChart
                data={[
                  { label: 'Scheduled', value: 60 },
                  { label: 'Completed', value: 15 },
                  { label: 'Seat', value: 25 },
                ]}
                timestamp={new Date().toISOString()}
                isLoading={isLoading}
                title="Donut Chart"
                />
            </div>
            
            <div style={{ width: "30%", height: 500, border: "1px solid black", padding: 20 }}>
              <GroupedBarChart
                width={600}
                height={200}
                type="stacked"
                data={[
                  {
                    label: 'Aasdfasdf asd',
                    data: {
                      future: 25,
                      options: 40,
                      forwards: 15,
                      fixedIncome: 12,
                      others: 32,
                    },
                  },
                  {
                    label: 'Basdfasdf asd',
                    data: {
                      future: 30,
                      options: 1,
                      forwards: 12,
                      fixedIncome: 12,
                      others: 32,
                    },
                  },
                  {
                    label: 'Casdfasdf asd',
                    data: {
                      future: 15,
                      options: 50,
                      forwards: 1,
                      fixedIncome: 12,
                      others: 32,
                    },
                  },
                  {
                    label: 'Dasdfasdf asd',
                    data: {
                      future: 40,
                      options: 35,
                      forwards: 10,
                      fixedIncome: 12,
                      others: 32,
                    },
                  },
                ]}
                groupKeys={[
                  'future',
                  'options',
                  'forwards',
                  'fixedIncome',
                  'others',
                ]}
                timestamp={new Date().toISOString()}
                isLoading={isLoading}
                title="Grouped Bar Chart"
              />
            </div>
          </ThemeProvider>
          {/* <VisxLargeDataChart /> */}
          {/* <VisxStackedBarChart /> */}
        </div>
      </div>
    </div>
  )
}
