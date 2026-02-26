"use client"

import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import React from "react"

type data = {
  paid: number,
  remaining: number,
  unallocated: number
}

export const description = "A pie chart with a legend"

const chartConfig = {
  value: {
    label: "Amount",
  },
  Paid: {
    label: "Paid",
    color: "var(--chart-1)",
  },
  Remaining: {
    label: "Remaining",
    color: "var(--chart-2)",
  },
  Unallocated: {
    label: "Unallocated",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function PieChartDisplay({paid, remaining, unallocated}: data) {
    const chartData = [
      { label: "Paid", value: paid, fill: "var(--chart-2)" },
      { label: "Remaining", value: remaining, fill: "var(--chart-3)"},
      { label: "Unallocated", value: unallocated, fill: "var(--chart-5)"}
  ]

  const totalExpenses = React.useMemo(() => {
    return paid + remaining + unallocated
  }, [paid, remaining, unallocated])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Budget Status</CardTitle>
        <CardDescription>Tracking paid vs. outstanding obligations</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-64 max-h-75"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie data={chartData} dataKey="value" nameKey="label" innerRadius={70} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          ${unallocated.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          dy="20"
                          className="fill-muted-foreground text-xs"
                        >
                          Unallocated
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            
            <ChartLegend
              content={<ChartLegendContent nameKey="label" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
