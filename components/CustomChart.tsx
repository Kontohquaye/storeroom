// "use client";

// import * as React from "react";
// import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

// import { useIsMobile } from "@/hooks/use-mobile";
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// export const description = "An interactive area chart";

// const chartData = [
//   { date: "2024-04-01", damaged: 222, intact: 150 },
//   { date: "2024-04-02", damaged: 97, intact: 180 },
//   { date: "2024-04-03", damaged: 167, intact: 120 },
//   { date: "2024-04-01", damaged: 222, intact: 150 },
//   { date: "2024-04-02", damaged: 97, intact: 180 },
//   { date: "2024-04-03", damaged: 167, intact: 120 },
//   { date: "2024-04-01", damaged: 222, intact: 150 },
//   { date: "2024-04-01", damaged: 222, intact: 150 },
//   { date: "2024-04-02", damaged: 97, intact: 180 },
//   { date: "2024-04-03", damaged: 167, intact: 120 },
//   { date: "2024-04-01", damaged: 222, intact: 150 },
//   { date: "2024-04-02", damaged: 97, intact: 180 },
//   { date: "2024-04-03", damaged: 167, intact: 120 },
//   { date: "2024-04-01", damaged: 222, intact: 150 },
// ];

// const chartConfig = {
//   Recieved: {
//     label: "Recieved",
//   },
//   damaged: {
//     label: "Damaged",
//     color: "var(--primary)",
//   },
//   intact: {
//     label: "Intact",
//     color: "var(--primary)",
//   },
// } satisfies ChartConfig;

// export function CustomChart() {
//   const isMobile = useIsMobile();
//   const [timeRange, setTimeRange] = React.useState("90d");

//   React.useEffect(() => {
//     if (isMobile) {
//       setTimeRange("7d");
//     }
//   }, [isMobile]);

//   const filteredData = chartData.filter((item) => {
//     const date = new Date(item.date);
//     const referenceDate = new Date("2024-06-30");
//     let daysToSubtract = 90;
//     if (timeRange === "30d") {
//       daysToSubtract = 30;
//     } else if (timeRange === "7d") {
//       daysToSubtract = 7;
//     }
//     const startDate = new Date(referenceDate);
//     startDate.setDate(startDate.getDate() - daysToSubtract);
//     return date >= startDate;
//   });

//   return (
//     <Card className="@container/card">
//       <CardHeader>
//         <CardTitle>Recieved Products</CardTitle>
//         <CardDescription>
//           <span className="hidden @[540px]/card:block">
//             Total for the last 3 months
//           </span>
//           <span className="@[540px]/card:hidden">Last 3 months</span>
//         </CardDescription>
//         <CardAction>
//           <ToggleGroup
//             type="single"
//             value={timeRange}
//             onValueChange={setTimeRange}
//             variant="outline"
//             className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
//           >
//             <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
//             <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
//             <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
//           </ToggleGroup>
//           <Select value={timeRange} onValueChange={setTimeRange}>
//             <SelectTrigger
//               className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
//               size="sm"
//               aria-label="Select a value"
//             >
//               <SelectValue placeholder="Last 3 months" />
//             </SelectTrigger>
//             <SelectContent className="rounded-xl">
//               <SelectItem value="90d" className="rounded-lg">
//                 Last 3 months
//               </SelectItem>
//               <SelectItem value="30d" className="rounded-lg">
//                 Last 30 days
//               </SelectItem>
//               <SelectItem value="7d" className="rounded-lg">
//                 Last 7 days
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </CardAction>
//       </CardHeader>
//       <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
//         <ChartContainer
//           config={chartConfig}
//           className="aspect-auto h-[250px] w-full"
//         >
//           <AreaChart data={filteredData}>
//             <defs>
//               <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
//                 <stop
//                   offset="5%"
//                   stopColor="var(--color-desktop)"
//                   stopOpacity={1.0}
//                 />
//                 <stop
//                   offset="95%"
//                   stopColor="var(--color-desktop)"
//                   stopOpacity={0.1}
//                 />
//               </linearGradient>
//               <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
//                 <stop
//                   offset="5%"
//                   stopColor="var(--color-mobile)"
//                   stopOpacity={0.8}
//                 />
//                 <stop
//                   offset="95%"
//                   stopColor="var(--color-mobile)"
//                   stopOpacity={0.1}
//                 />
//               </linearGradient>
//             </defs>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="date"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               minTickGap={32}
//               tickFormatter={(value) => {
//                 const date = new Date(value);
//                 return date.toLocaleDateString("en-US", {
//                   month: "short",
//                   day: "numeric",
//                 });
//               }}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={
//                 <ChartTooltipContent
//                   labelFormatter={(value) => {
//                     return new Date(value).toLocaleDateString("en-US", {
//                       month: "short",
//                       day: "numeric",
//                     });
//                   }}
//                   indicator="dot"
//                 />
//               }
//             />
//             <Area
//               dataKey="intact"
//               type="natural"
//               fill="url(#fillMobile)"
//               stroke="var(--color-mobile)"
//               stackId="a"
//             />
//             <Area
//               dataKey="damaged"
//               type="natural"
//               fill="url(#fillDesktop)"
//               stroke="var(--color-desktop)"
//               stackId="a"
//             />
//           </AreaChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MonthData, StockType } from "@/app/types/stock";
import { getMonthName } from "@/lib/utils";

export const description = "A multiple bar chart";

// const chartData = [
//   { month: "January", damaged: 186, intact: 80 },
//   { month: "February", damaged: 305, intact: 200 },
//   { month: "March", damaged: 305, intact: 200 },
// ];

const chartConfig = {
  damaged: {
    label: "Damaged",
    color: "var(--chart-1)",
  },
  intact: {
    label: "InTact",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function CustomChart({ stockData }: { stockData: StockType[] }) {
  // console.log(stockData);
  const rawChartData: MonthData[] =
    stockData.length > 0
      ? stockData.map((item) => {
          return {
            month: item.date
              ? getMonthName(item.date)
              : getMonthName(item._createdAt),
            damaged: item.damaged,
            intact: item.quantity,
          };
        })
      : [];

  const chartData = rawChartData.reduce<MonthData[]>((acc, item) => {
    // Try to find existing month entry
    const existing = acc.find((d) => d.month === item.month);
    // console.log(existing);
    if (existing) {
      // Add values to existing month
      existing.damaged += item.damaged;
      existing.intact += item.intact;
    } else {
      // Add new month entry
      acc.push({ ...item });
    }

    return acc;
  }, []);

  return (
    <div className="container">
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Inventory Overview</CardTitle>
            <CardDescription>Damaged and Intact Goods</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="damaged" fill="var(--color-damaged)" radius={4} />
                <Bar dataKey="intact" fill="var(--color-intact)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            {/* <div className="flex gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div> */}
            <div className="text-muted-foreground leading-none">
              Showing damaged and intact goods in the last 3 months
            </div>
          </CardFooter>
        </Card>
      )}
      {chartData.length <= 0 && (
        <div className="py-10 text-center text-sm text-muted-foreground">
          No stock data available to display the chart.
        </div>
      )}
    </div>
  );
}
