"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";

interface GraphProps {
    chartData: {
        date: string;
        amount: number;
    }[]
}

export function Graph({chartData}: GraphProps) {

    return (
        <ChartContainer config={{
            amount: {
                label: "Amount",
                color: 'hsl(var(--primary))'
            }
        }}
            className="min-h-[300px]"
        >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                    <Line type="monotone" dataKey="amount" stroke="var(--color-amount)" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}