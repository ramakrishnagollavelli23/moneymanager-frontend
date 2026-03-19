import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const CustomLineChart = ({ data }) => {

    return (
        <div className="w-full h-80 bg-white rounded-2xl p-1 md:p-4">

            <ResponsiveContainer className={"res"} width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" tick={{ fill: "#555" }} />
                    <YAxis tick={{ fill: "#555" }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#f9fafb",
                            borderRadius: "10px",
                            border: "1px solid #ddd",
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#4f46e5"
                        strokeWidth={3}
                        activeDot={{ r: 7, strokeWidth: 2, stroke: "#4f46e5" }}
                        dot={{ r: 4, fill: "#4f46e5" }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChart;
