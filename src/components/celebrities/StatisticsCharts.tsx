
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip, Legend } from "recharts";

interface StatisticsChartsProps {
  pageViewsData: Array<{
    name: string;
    views: number;
    visits: number;
  }>;
  trendingContentData: Array<{
    date: string;
    films: number;
    series: number;
    music: number;
  }>;
}

export const StatisticsCharts = ({ pageViewsData, trendingContentData }: StatisticsChartsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <Card className="bg-stream-darker text-white">
        <CardHeader>
          <CardTitle>Vues par page</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer
            config={{
              views: {
                label: "Vues",
                theme: {
                  light: "#7c3aed",
                  dark: "#8b5cf6",
                },
              },
              visits: {
                label: "Visites",
                theme: {
                  light: "#10b981",
                  dark: "#34d399",
                },
              },
            }}
          >
            <BarChart
              data={pageViewsData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="views" name="Vues" fill="var(--color-views)" />
              <Bar dataKey="visits" name="Visites" fill="var(--color-visits)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="bg-stream-darker text-white">
        <CardHeader>
          <CardTitle>Tendances Hebdomadaires</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer
            config={{
              films: {
                label: "Films",
                theme: {
                  light: "#7c3aed",
                  dark: "#8b5cf6",
                },
              },
              series: {
                label: "Séries",
                theme: {
                  light: "#10b981",
                  dark: "#34d399",
                },
              },
              music: {
                label: "Musique",
                theme: {
                  light: "#f59e0b",
                  dark: "#fbbf24",
                },
              },
            }}
          >
            <LineChart
              data={trendingContentData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="films"
                name="Films"
                stroke="var(--color-films)"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="series" name="Séries" stroke="var(--color-series)" />
              <Line type="monotone" dataKey="music" name="Musique" stroke="var(--color-music)" />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
