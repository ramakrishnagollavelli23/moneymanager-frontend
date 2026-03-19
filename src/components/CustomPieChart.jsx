import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={12}
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const CustomPieChart = ({ data, COLORS }) => {
    if (!data || data.length === 0) {
        return (
            <div
                style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#999",
                }}
            >
                No data available
            </div>
        );
    }

    const total = data.reduce((sum, item) => sum + item.amount, 0);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                borderRadius: "16px",
                padding: "10px",
            }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <defs>
                        {COLORS.map((color, index) => (
                            <linearGradient
                                key={index}
                                id={`grad-${index}`}
                                x1="50%"
                                y1="50%"
                                x2="100%"
                                y2="100%"
                            >
                                <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                                <stop offset="100%" stopColor={color} stopOpacity={0.7} />
                            </linearGradient>
                        ))}
                    </defs>

                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={130}
                        innerRadius={80}
                        dataKey="amount"
                        nameKey="name"
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={`url(#grad-${index})`} />
                        ))}
                    </Pie>

                    {/* Center Label */}
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="14"
                        fontWeight="bold"
                        fill="#333"
                    >
                        ₹{total}
                    </text>

                    <Tooltip
                        formatter={(amount, name) => [`₹${amount}`, name]}
                        contentStyle={{
                            borderRadius: "10px",
                            borderColor: "#ccc",
                            fontSize: "14px",
                        }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomPieChart;
