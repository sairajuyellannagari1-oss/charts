import {PieChart, Pie, Cell, Legend} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGender} = props

  return (
    <div>
      <h1 className="v-b-gender">Vaccination by gender</h1>

      <PieChart width={1000} height={300}>
        <Pie
          data={vaccinationByGender}
          dataKey="count"
          cx="50%"
          cy="50%"
          outerRadius="70%"
             label={({name, count}) => `${name}: ${count}`}
        >
          <Cell name="Male" fill="#5a8dee" />
          <Cell name="Female" fill="#f54394" />
          <Cell name="Others" fill="#28c76f" />
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

export default VaccinationByGender
