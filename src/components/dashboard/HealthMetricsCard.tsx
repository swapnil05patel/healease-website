
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowDown, ArrowUp, Heart } from "lucide-react";

interface HealthMetric {
  name: string;
  value: number;
  unit: string;
  change: number;
  status: "normal" | "warning" | "critical" | "improved";
  icon: React.ReactNode;
}

const HealthMetricsCard = () => {
  const metrics: HealthMetric[] = [
    {
      name: "Heart Rate",
      value: 72,
      unit: "bpm",
      change: -3,
      status: "normal",
      icon: <Heart className="h-5 w-5 text-medical-red" />,
    },
    {
      name: "BP (Systolic)",
      value: 122,
      unit: "mmHg",
      change: 2,
      status: "normal",
      icon: <Activity className="h-5 w-5 text-medical-blue" />,
    },
    {
      name: "BP (Diastolic)",
      value: 82,
      unit: "mmHg",
      change: -1,
      status: "normal",
      icon: <Activity className="h-5 w-5 text-medical-teal" />,
    },
    {
      name: "Blood Sugar",
      value: 98,
      unit: "mg/dL",
      change: -5,
      status: "improved",
      icon: <Activity className="h-5 w-5 text-medical-green" />,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-medical-green";
      case "warning":
        return "text-amber-500";
      case "critical":
        return "text-medical-red";
      case "improved":
        return "text-medical-blue";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader className="bg-medical-lightblue bg-opacity-50 border-b">
        <CardTitle className="text-medical-darkblue">Health Metrics</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`health-stat p-4 ${
                index !== metrics.length - 1 && "border-b sm:border-b-0 sm:border-r"
              } border-gray-200`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {metric.icon}
                  <span className="ml-2 text-sm font-medium text-gray-600">
                    {metric.name}
                  </span>
                </div>
                <div className="flex items-center text-xs">
                  {metric.change > 0 ? (
                    <ArrowUp className="h-3 w-3 text-medical-red" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-medical-green" />
                  )}
                  <span
                    className={
                      metric.change > 0 ? "text-medical-red" : "text-medical-green"
                    }
                  >
                    {Math.abs(metric.change)}%
                  </span>
                </div>
              </div>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold">{metric.value}</span>
                <span className="ml-1 text-xs text-gray-500">{metric.unit}</span>
              </div>
              <div
                className={`mt-1 text-xs font-medium ${getStatusColor(
                  metric.status
                )}`}
              >
                {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthMetricsCard;
