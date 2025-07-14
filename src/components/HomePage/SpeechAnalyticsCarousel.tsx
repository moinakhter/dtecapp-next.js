"use client";
 
import { motion } from "framer-motion";
import { useState ,useEffect} from "react";
import {
  Bar,
  BarChart,
  Scatter,
  ScatterChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {   CardContent } from "@/components/ui/card";

const barData = [
  { time: 2, satisfaction: 85 },
  { time: 2.4, satisfaction: 72 },
  { time: 4.6, satisfaction: 58 },
  { time: 6, satisfaction: 45 },
];

const scatterData = [
  { time: 3, satisfaction: 82 },
  { time: 4, satisfaction: 78 },
  { time: 5, satisfaction: 75 },
  { time: 6, satisfaction: 72 },
  { time: 7, satisfaction: 68 },
  { time: 8, satisfaction: 65 },
  { time: 9, satisfaction: 62 },
  { time: 10, satisfaction: 58 },
  { time: 12, satisfaction: 55 },
  { time: 15, satisfaction: 48 },
  { time: 18, satisfaction: 42 },
  { time: 20, satisfaction: 38 },
  { time: 22, satisfaction: 35 },
  { time: 25, satisfaction: 30 },
  { time: 28, satisfaction: 25 },
  { time: 30, satisfaction: 22 },
];

const lineData = [
  { time: 3, satisfaction: 80 },
  { time: 5, satisfaction: 75 },
  { time: 10, satisfaction: 60 },
  { time: 15, satisfaction: 50 },
  { time: 20, satisfaction: 40 },
  { time: 30, satisfaction: 25 },
];

const chartConfig = {
  satisfaction: {
    label: "Satisfaction Level",
    color: "hsl(210, 100%, 60%)",
  },
};

export default function SpeechAnalyticsCarousel() {
  const [currentChart, setCurrentChart] = useState(2);

  const charts = [
    {
      title: "Bar Chart Analysis",
      component: (
        <BarChart
          data={barData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="time"
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
            cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
          />
          <Bar
            dataKey="satisfaction"
            fill="#3D7EE2"
            fillOpacity={0.3}
            radius={[4, 4, 0, 0]}
            stroke="#3D7EE2"
            strokeWidth={1}
          />
        </BarChart>
      ),
    },
    {
      title: "Scatter Plot Analysis",
      component: (
        <ScatterChart
          data={scatterData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="time"
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 35]}
          />
          <YAxis
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
            cursor={{ strokeDasharray: "3 3" }}
          />
          <Scatter dataKey="satisfaction" fill="var(--color-satisfaction)" />
        </ScatterChart>
      ),
    },
    {
      title: "Line Chart Analysis",
      component: (
        <LineChart
          data={lineData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="time"
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
            cursor={{ strokeDasharray: "3 3" }}
          />
          <Line
            type="monotone"
            dataKey="satisfaction"
            stroke="var(--color-satisfaction)"
            strokeWidth={3}
            dot={{ fill: "var(--color-satisfaction)", strokeWidth: 2, r: 4 }}
            activeDot={{
              r: 6,
              stroke: "var(--color-satisfaction)",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      ),
    },
  ];
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentChart((prev) => (prev + 1) % charts.length);
  }, 4000); // switch every 4 seconds

  return () => clearInterval(interval); // cleanup
}, []);

  const goToChart = (index: number) => {
    setCurrentChart(index);
  };

  return (
    <motion.div
      whileHover={{
          scale: 1.05,
          rotate: -1,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
    className="backdrop:blur-3xl border-secondary/30 border-2 px-0 py-2  bg-background/80 rounded-3xl overflow-hidden
     hidden md:block shadow-2xl relative  md:absolute md:bottom-[0px] -z-[0px] md:right-[-50px]">
      <CardContent className="p-0 relative   w-full">
        {/* Header with dots indicator */}
        <div className="flex justify-between items-center  absolute top-[-0px] z-10  right-10">
          <div className="flex space-x-2">
            {charts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToChart(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentChart ? "bg-secondary" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Chart Container */}
        <div className="w-[300px]">
          <ChartContainer config={chartConfig} className="h-[150px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {charts[currentChart].component}
            </ResponsiveContainer>
          </ChartContainer>

          {/* Axis Labels */}
          <div className="flex justify-between text-xs text-gray-400">
            <span className="transform -rotate-90 origin-center absolute left-[-30px] top-1/2 -translate-y-1/2">
              Satisfaction Level
            </span>
            <span className="text-center w-full ">
              Phone Call Time (Minutes)
            </span>
          </div>
        </div>
      </CardContent>
    </motion.div>
  );
}
