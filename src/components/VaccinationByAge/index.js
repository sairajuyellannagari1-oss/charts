import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAge} = props

  return (
    <div>
      <h1 className="v-b-gender">Vaccination by age</h1>

      <PieChart width={1000} height={300}>
        <Pie
          data={vaccinationByAge}
          cx="50%"
          cy="50%"
          startAngle={0}
          endAngle={360}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
             label={({name, count}) => `${name}: ${count}`}
        >
          <Cell name="18-44" fill="#2cc6c6" />

          <Cell name="45-60" fill="#5a8dee" />

          <Cell name="Above 60" fill="#a3df9f" />
        </Pie>

        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
