
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from "recharts";

// Sample health data for the past week
const healthData = [
  {
    date: "Mon",
    heartRate: 72,
    bloodPressureSystolic: 123,
    bloodPressureDiastolic: 83,
    bloodSugar: 103,
  },
  {
    date: "Tue",
    heartRate: 75,
    bloodPressureSystolic: 125,
    bloodPressureDiastolic: 82,
    bloodSugar: 106,
  },
  {
    date: "Wed",
    heartRate: 71,
    bloodPressureSystolic: 121,
    bloodPressureDiastolic: 80,
    bloodSugar: 100,
  },
  {
    date: "Thu",
    heartRate: 73,
    bloodPressureSystolic: 124,
    bloodPressureDiastolic: 81,
    bloodSugar: 104,
  },
  {
    date: "Fri",
    heartRate: 69,
    bloodPressureSystolic: 120,
    bloodPressureDiastolic: 79,
    bloodSugar: 101,
  },
  {
    date: "Sat",
    heartRate: 72,
    bloodPressureSystolic: 119,
    bloodPressureDiastolic: 80,
    bloodSugar: 99,
  },
  {
    date: "Sun",
    heartRate: 70,
    bloodPressureSystolic: 122,
    bloodPressureDiastolic: 82,
    bloodSugar: 98,
  },
];

const HealthTrendChart = () => {
  return (
    <Card>
      <CardHeader className="bg-medical-lightblue bg-opacity-50 border-b">
        <CardTitle className="flex items-center text-medical-darkblue">
          <Activity className="mr-2 h-5 w-5" />
          Health Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={healthData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                tickLine={{ stroke: '#ccc' }}
              />
              <YAxis 
                yAxisId="left" 
                tick={{ fontSize: 12 }} 
                tickLine={{ stroke: '#ccc' }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                domain={[60, 140]} 
                tick={{ fontSize: 12 }} 
                tickLine={{ stroke: '#ccc' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px', 
                  border: '1px solid #eaeaea',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="bloodPressureSystolic"
                name="BP (Systolic)"
                stroke="#0284c7"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="bloodPressureDiastolic"
                name="BP (Diastolic)"
                stroke="#0d9488"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="heartRate"
                name="Heart Rate"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="bloodSugar"
                name="Blood Sugar"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          Weekly health data: Track your vital metrics over time
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthTrendChart;
