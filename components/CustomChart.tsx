"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-04-01", damaged: 222, intact: 150 },
  { date: "2024-04-02", damaged: 97, intact: 180 },
  { date: "2024-04-03", damaged: 167, intact: 120 },
  { date: "2024-04-04", damaged: 242, intact: 260 },
  { date: "2024-04-05", damaged: 373, intact: 290 },
  { date: "2024-04-06", damaged: 301, intact: 340 },
  { date: "2024-04-07", damaged: 245, intact: 180 },
  { date: "2024-04-08", damaged: 409, intact: 320 },
  { date: "2024-04-09", damaged: 59, intact: 110 },
  { date: "2024-04-10", damaged: 261, intact: 190 },
  { date: "2024-04-11", damaged: 327, intact: 350 },
  { date: "2024-04-12", damaged: 292, intact: 210 },
  { date: "2024-04-13", damaged: 342, intact: 380 },
  { date: "2024-04-14", damaged: 137, intact: 220 },
  { date: "2024-04-15", damaged: 120, intact: 170 },
  { date: "2024-04-16", damaged: 138, intact: 190 },
  { date: "2024-04-17", damaged: 446, intact: 360 },
  { date: "2024-04-18", damaged: 364, intact: 410 },
  { date: "2024-04-19", damaged: 243, intact: 180 },
  { date: "2024-04-20", damaged: 89, intact: 150 },
  { date: "2024-04-21", damaged: 137, intact: 200 },
  { date: "2024-04-22", damaged: 224, intact: 170 },
  { date: "2024-04-23", damaged: 138, intact: 230 },
  { date: "2024-04-24", damaged: 387, intact: 290 },
  { date: "2024-04-25", damaged: 215, intact: 250 },
  { date: "2024-04-26", damaged: 75, intact: 130 },
  { date: "2024-04-27", damaged: 383, intact: 420 },
  { date: "2024-04-28", damaged: 122, intact: 180 },
  { date: "2024-04-29", damaged: 315, intact: 240 },
  { date: "2024-04-30", damaged: 454, intact: 380 },
  { date: "2024-05-01", damaged: 165, intact: 220 },
  { date: "2024-05-02", damaged: 293, intact: 310 },
  { date: "2024-05-03", damaged: 247, intact: 190 },
  { date: "2024-05-04", damaged: 385, intact: 420 },
  { date: "2024-05-05", damaged: 481, intact: 390 },
  { date: "2024-05-06", damaged: 498, intact: 520 },
  { date: "2024-05-07", damaged: 388, intact: 300 },
  { date: "2024-05-08", damaged: 149, intact: 210 },
  { date: "2024-05-09", damaged: 227, intact: 180 },
  { date: "2024-05-10", damaged: 293, intact: 330 },
  { date: "2024-05-11", damaged: 335, intact: 270 },
  { date: "2024-05-12", damaged: 197, intact: 240 },
  { date: "2024-05-13", damaged: 197, intact: 160 },
  { date: "2024-05-14", damaged: 448, intact: 490 },
  { date: "2024-05-15", damaged: 473, intact: 380 },
  { date: "2024-05-16", damaged: 338, intact: 400 },
  { date: "2024-05-17", damaged: 499, intact: 420 },
  { date: "2024-05-18", damaged: 315, intact: 350 },
  { date: "2024-05-19", damaged: 235, intact: 180 },
  { date: "2024-05-20", damaged: 177, intact: 230 },
  { date: "2024-05-21", damaged: 82, intact: 140 },
  { date: "2024-05-22", damaged: 81, intact: 120 },
  { date: "2024-05-23", damaged: 252, intact: 290 },
  { date: "2024-05-24", damaged: 294, intact: 220 },
  { date: "2024-05-25", damaged: 201, intact: 250 },
  { date: "2024-05-26", damaged: 213, intact: 170 },
  { date: "2024-05-27", damaged: 420, intact: 460 },
  { date: "2024-05-28", damaged: 233, intact: 190 },
  { date: "2024-05-29", damaged: 78, intact: 130 },
  { date: "2024-05-30", damaged: 340, intact: 280 },
  { date: "2024-05-31", damaged: 178, intact: 230 },
  { date: "2024-06-01", damaged: 178, intact: 200 },
  { date: "2024-06-02", damaged: 470, intact: 410 },
  { date: "2024-06-03", damaged: 103, intact: 160 },
  { date: "2024-06-04", damaged: 439, intact: 380 },
  { date: "2024-06-05", damaged: 88, intact: 140 },
  { date: "2024-06-06", damaged: 294, intact: 250 },
  { date: "2024-06-07", damaged: 323, intact: 370 },
  { date: "2024-06-08", damaged: 385, intact: 320 },
  { date: "2024-06-09", damaged: 438, intact: 480 },
  { date: "2024-06-10", damaged: 155, intact: 200 },
  { date: "2024-06-11", damaged: 92, intact: 150 },
  { date: "2024-06-12", damaged: 492, intact: 420 },
  { date: "2024-06-13", damaged: 81, intact: 130 },
  { date: "2024-06-14", damaged: 426, intact: 380 },
  { date: "2024-06-15", damaged: 307, intact: 350 },
  { date: "2024-06-16", damaged: 371, intact: 310 },
  { date: "2024-06-17", damaged: 475, intact: 520 },
  { date: "2024-06-18", damaged: 107, intact: 170 },
  { date: "2024-06-19", damaged: 341, intact: 290 },
  { date: "2024-06-20", damaged: 408, intact: 450 },
  { date: "2024-06-21", damaged: 169, intact: 210 },
  { date: "2024-06-22", damaged: 317, intact: 270 },
  { date: "2024-06-23", damaged: 480, intact: 530 },
  { date: "2024-06-24", damaged: 132, intact: 180 },
  { date: "2024-06-25", damaged: 141, intact: 190 },
  { date: "2024-06-26", damaged: 434, intact: 380 },
  { date: "2024-06-27", damaged: 448, intact: 490 },
  { date: "2024-06-28", damaged: 149, intact: 200 },
  { date: "2024-06-29", damaged: 103, intact: 160 },
  { date: "2024-06-30", damaged: 446, intact: 400 },
];

const chartConfig = {
  Recieved: {
    label: "Recieved",
  },
  damaged: {
    label: "Damaged",
    color: "var(--primary)",
  },
  intact: {
    label: "Intact",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function CustomChart() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Recieved Products</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="intact"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="damaged"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
