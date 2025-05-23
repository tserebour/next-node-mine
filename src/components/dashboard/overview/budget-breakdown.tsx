'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'; // Added for legend color circles
import Typography from '@mui/material/Typography';
import type { SxProps } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles'; // For chart options
import type { ApexOptions } from 'apexcharts';
import {
  ChatCircle as ChatIcon,
  ShareNetwork as ShareIcon,
  DownloadSimple as DownloadIcon,
} from '@phosphor-icons/react/dist/ssr';

// Mock Chart component for self-contained example
// In a real project, you would import this from '@/components/core/chart';
const Chart = ({ options, series, type, height, width }: any) => {
  // This is a simplified mock. In a real application, you'd integrate ApexCharts here.
  // For demonstration, we'll just show a placeholder or a simple representation.
  return (
    <Box
      sx={{
        width: width,
        height: height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Basic visual representation of a donut chart
        borderRadius: '50%',
        background: `conic-gradient(
          ${options?.colors?.[0] || 'gray'} 0% ${series?.[0] || 25}%,
          ${options?.colors?.[1] || 'orange'} ${series?.[0] || 25}% ${
          (series?.[0] || 25) + (series?.[1] || 25)
        }%,
          ${options?.colors?.[2] || 'lightgray'} ${
          (series?.[0] || 25) + (series?.[1] || 25)
        }% ${
          (series?.[0] || 25) + (series?.[1] || 25) + (series?.[2] || 25)
        }%,
          ${options?.colors?.[3] || 'lightgreen'} ${
          (series?.[0] || 25) + (series?.[1] || 25) + (series?.[2] || 25)
        }% 100%
        )`,
        mask: 'radial-gradient(transparent 40%, black 40%)', // Creates the donut hole
        WebkitMask: 'radial-gradient(transparent 40%, black 40%)', // For Webkit browsers
      }}
    />
  );
};

/**
 * Hook to define chart options for ApexCharts, similar to the reference `useChartOptions`.
 * It customizes colors and disables labels/legend within the chart itself, as they are
 * displayed externally in the legend.
 */
function useChartOptions(colors: string[]): ApexOptions {
  const theme = useTheme(); // Mock useTheme for self-contained example

  // Mock useTheme if not running in a full MUI environment
  const mockTheme = {
    palette: {
      mode: 'light',
      primary: { main: '#FF7043' },
      success: { main: '#4CAF50' },
      warning: { main: '#FFAB91' },
      error: { main: '#F44336' },
      text: { secondary: '#757575' },
    },
  };
  const currentTheme = theme || mockTheme;

  return {
    chart: { background: 'transparent' },
    colors: colors, // Use custom colors for the slices
    dataLabels: { enabled: false }, // Hide data labels on the chart slices
    legend: { show: false }, // Hide the default chart legend
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '60%', // Size of the donut hole
        },
      },
    },
    states: { active: { filter: { type: 'none' } }, hover: { filter: { type: 'none' } } },
    stroke: { width: 0 }, // No stroke between slices
    theme: { mode: currentTheme.palette.mode },
    tooltip: { fillSeriesColor: false },
  };
}

/**
 * Props interface for the BudgetBreakdown component.
 */
export interface BudgetBreakdownProps {
  /**
   * The series data for the donut chart, representing budget categories.
   * Values should be numbers that sum up to 100 for percentages.
   */
  chartSeries: number[];
  /**
   * Labels corresponding to each series item (e.g., "Total Budget", "Used Funds").
   */
  labels: string[];
  /**
   * Optional Material UI system properties for custom styling.
   */
  sx?: SxProps;
}

/**
 * BudgetBreakdown component displays a budget overview using a donut chart
 * and a detailed legend.
 */
export function BudgetBreakdown({ chartSeries, labels, sx }: BudgetBreakdownProps): React.JSX.Element {
  // Define custom colors for the budget categories based on the image
  const customColors = ['#757575', '#FF7043', '#FFAB91', '#FFE0B2']; // Gray, Dark Orange, Light Orange, Very Light Orange

  const chartOptions = useChartOptions(customColors);

  return (
    <Card sx={{ ...sx, borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
      {/* Card Header with Title and Action Icons */}
      <CardHeader
        title="Budget Breakdown"
        action={
          <Stack direction="row" spacing={1} sx={{ color: '#FF7043' }}>
            <ChatIcon fontSize="var(--icon-fontSize-md)" />
            <ShareIcon fontSize="var(--icon-fontSize-md)" />
            <DownloadIcon fontSize="var(--icon-fontSize-md)" />
          </Stack>
        }
        sx={{ pb: 1 }}
      />
      <CardContent>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ alignItems: 'center' }}>
          {/* Chart Section */}
          <Box sx={{ flexShrink: 0, width: '200px', height: '200px' }}>
            <Chart height={200} options={chartOptions} series={chartSeries} type="donut" width="100%" />
          </Box>

          {/* Legend Section */}
          <Stack spacing={1} sx={{ flexGrow: 1, minWidth: '150px' }}>
            {labels.map((label, index) => (
              <Stack key={label} direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    bgcolor: customColors[index], // Use custom color for each legend item
                    flexShrink: 0,
                  }}
                />
                <Typography variant="body2" sx={{ color: '#424242', fontWeight: 500 }}>
                  {label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

// Example usage of the BudgetBreakdown component
export function App() {
  // Example data based on the image proportions
  const budgetSeries = [40, 25, 20, 15]; // Used Funds, Total Budget, Others, Balance (approximate percentages)
  const budgetLabels = ['Total Budget', 'Used Funds', 'Others', 'Balance'];

  return (
    <Box sx={{ p: 3 }}>
      <BudgetBreakdown chartSeries={budgetSeries} labels={budgetLabels} />
    </Box>
  );
}
