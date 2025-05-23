'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box'; // For the mock chart
import Typography from '@mui/material/Typography'; // For the mock chart labels
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import type { ApexOptions } from 'apexcharts';

// Mock Chart component for self-contained example
// In a real project, you would import this from '@/components/core/chart';
const Chart = ({ options, series, type, height, width }: any) => {
  // This is a simplified mock for a bar chart.
  // In a real application, you'd integrate ApexCharts or a similar library.
  const categories = options?.xaxis?.categories || [];
  const colors = options?.colors || ['#BDBDBD', '#FFAB91', '#FF7043', '#FFE0B2']; // Default colors

  const barHeightScale = 50; // Scale factor for visual bar height

  return (
    <Box
      sx={{
        width: width,
        height: height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        p: 2,
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {/* Mock Y-axis labels */}
      <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pb: '20px', pt: '20px' }}>
        <Typography variant="caption" sx={{ color: options?.yaxis?.labels?.style?.colors, alignSelf: 'flex-end' }}>Best</Typography>
        <Typography variant="caption" sx={{ color: options?.yaxis?.labels?.style?.colors, alignSelf: 'flex-end' }}>Better</Typography>
        <Typography variant="caption" sx={{ color: options?.yaxis?.labels?.style?.colors, alignSelf: 'flex-end' }}>Good</Typography>
        <Typography variant="caption" sx={{ color: options?.yaxis?.labels?.style?.colors, alignSelf: 'flex-end' }}>0</Typography>
      </Box>

      {/* Bars */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '100%', pl: '40px' }}>
        {series?.[0]?.data.map((value: number, index: number) => (
          <Box
            key={index}
            sx={{
              width: options?.plotOptions?.bar?.columnWidth || '40px',
              height: `${value * barHeightScale}px`, // Scale height based on value
              bgcolor: colors[value - 1] || colors[0], // Map value to color
              borderRadius: '4px 4px 0 0', // Rounded top corners
              mx: 0.5,
            }}
          />
        ))}
      </Box>
      {/* Mock X-axis labels */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 1, pl: '40px' }}>
        {categories.map((category: string) => (
          <Typography key={category} variant="caption" sx={{ color: options?.xaxis?.labels?.style?.colors, width: options?.plotOptions?.bar?.columnWidth || '40px', textAlign: 'center' }}>
            {category}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

/**
 * Props interface for the ProjectTracking component.
 */
export interface ProjectTrackingProps {
  /**
   * The series data for the bar chart.
   * Each data point should be a number representing a performance level:
   * 1 for 'Good', 2 for 'Better', 3 for 'Best'.
   */
  chartSeries: { name: string; data: number[] }[];
  /**
   * Optional Material UI system properties for custom styling.
   */
  sx?: SxProps;
}

/**
 * Hook to define chart options for ApexCharts, customized for the Project Tracking chart.
 * It sets up the X and Y axes, colors, and other chart properties.
 */
function useChartOptions(): ApexOptions {
  const theme = useTheme(); // Mock useTheme for self-contained example

  // Mock useTheme if not running in a full MUI environment
  const mockTheme = {
    palette: {
      mode: 'light',
      primary: { main: '#FF7043' },
      success: { main: '#4CAF50' },
      warning: { main: '#FFAB91' },
      error: { main: '#F44336' },
      divider: '#E0E0E0',
      text: { secondary: '#757575' },
    },
  };
  const currentTheme = theme || mockTheme;

  // Custom colors for the bars: Gray, Light Orange, Orange, Very Light Orange
  const barColors = ['#BDBDBD', '#FFAB91', '#FF7043', '#FFE0B2'];

  return {
    chart: { background: 'transparent', stacked: false, toolbar: { show: false } },
    colors: barColors, // Apply custom colors
    dataLabels: { enabled: false },
    fill: { opacity: 1, type: 'solid' },
    grid: {
      borderColor: currentTheme.palette.divider,
      strokeDashArray: 2,
      xaxis: { lines: { show: false } }, // Hide vertical grid lines
      yaxis: { lines: { show: true } }, // Show horizontal grid lines
    },
    legend: { show: false }, // No legend needed as labels are on Y-axis
    plotOptions: { bar: { columnWidth: '40px', borderRadius: 4 } }, // Rounded top corners for bars
    stroke: { colors: ['transparent'], show: true, width: 2 }, // No stroke between bars
    theme: { mode: currentTheme.palette.mode },
    xaxis: {
      axisBorder: { color: currentTheme.palette.divider, show: true },
      axisTicks: { color: currentTheme.palette.divider, show: true },
      categories: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'], // Days of the week
      labels: { offsetY: 5, style: { colors: currentTheme.palette.text.secondary } },
    },
    yaxis: {
      labels: {
        // Custom formatter for Y-axis labels
        formatter: (value) => {
          if (value === 1) return 'Good';
          if (value === 2) return 'Better';
          if (value === 3) return 'Best';
          return ''; // Hide other numerical labels
        },
        offsetX: -10,
        style: { colors: currentTheme.palette.text.secondary },
      },
      min: 0, // Ensure Y-axis starts at 0
      max: 3, // Max value for Y-axis based on our 1, 2, 3 scale
      tickAmount: 3, // Show 3 ticks for Good, Better, Best
    },
  };
}

/**
 * ProjectTracking component displays a bar chart representing project performance
 * over a week, with qualitative performance levels.
 */
export function ProjectTracking({ chartSeries, sx }: ProjectTrackingProps): React.JSX.Element {
  const chartOptions = useChartOptions();

  return (
    <Card sx={{ ...sx, borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
      <CardHeader title="Project 1 Tracking" sx={{ pb: 1 }} />
      <CardContent>
        <Chart height={350} options={chartOptions} series={chartSeries} type="bar" width="100%" />
      </CardContent>
    </Card>
  );
}

// Example usage of the ProjectTracking component
export function App() {
  // Mock data for chart series based on the image's bar heights
  // 1 = Good, 2 = Better, 3 = Best
  const mockChartSeries = [
    {
      name: 'Performance',
      data: [1, 3, 2, 3, 1, 2], // Mon (Good), Tue (Best), Wed (Better), Thurs (Best), Fri (Good), Sat (Better)
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <ProjectTracking chartSeries={mockChartSeries} />
    </Box>
  );
}
