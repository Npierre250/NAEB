import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    produceReport: 152,
  },
  {
    name: "Feb",
    produceReport: 200,
  },
  {
    name: "Mar",
    produceReport: 100,
  },
  {
    name: "Apr",
    produceReport: 300,
  },
  {
    name: "May",
    produceReport: 200,
  },
  {
    name: "Jun",
    produceReport: 100,
  },
  {
    name: "Jul",
    produceReport: 50,
  },
  {
    name: "Aug",
    produceReport: 200,
  },
  {
    name: "Sep",
    produceReport: 300,
  },
  {
    name: "Oct",
    produceReport: 100,
  },
  {
    name: "Nov",
    produceReport: 221,
  },
];
export default function Chart() {
  return (
    <ResponsiveContainer width={"100%"} height={500}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" y={1000} />

        <XAxis dataKey="name" tickLine={false} />
        <YAxis tickLine={false} />
        <Legend />
        <Bar
          dataKey="produceReport"
          fill="#5CA7EF"
          radius={[10, 10, 0, 0]}
        ></Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
