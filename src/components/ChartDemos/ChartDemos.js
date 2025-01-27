import React from 'react'
import CombinationChart from './HighCharts/CombinedChart'
import DonutChart from './HighCharts/DonutChart'
import "./ChartDemos.css"
import LargeDataChart from './HighCharts/LargeDataChart'
import ChartjsCombinationChart from './Chartjs/CombinedChart'
import ChartjsDonutChart from './Chartjs/DonutChart'
import ChartjsLargeDataChart from './Chartjs/LargeDataChart'
import RechartsCombinationChart from './Recharts/CombinedChart'
import RechartsDonutChart from './Recharts/DonutChart'
import RechartLargeDatasetChart from './Recharts/LargeDataChart'

export const MAX_POINTS = 5000;

export default function ChartDemos() {
  return (
    <div className='p-2 flex flex-col gap-4'>
      <div className='flex flex-col gap-2'> 
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
      </div>

      <div className='flex flex-col gap-2'> 
        <h1>
          Recharts
        </h1>
        <div className='flex flex-row gap-2' style={{maxWidth: "100%"}}>
          <RechartsCombinationChart />
          <RechartsDonutChart />
          <RechartLargeDatasetChart />
        </div>
      </div>
    </div>
  )
}
