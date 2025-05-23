'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { SxProps } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { MetricCard } from './metric-card';
import RouterLink from 'next/link';

import { StatusIndicator } from './status-indicator';
import { Grid } from '@mui/material';


/**
 * Props interface for the ProjectProgressCard component.
 */
export interface ProjectProgressCardProps {
  /**
   * The percentage of project completion (0-100).
   */
  progressPercentage: number;
  /**
   * The count of completed tasks/milestones.
   */
  tasksCompletedCount: number;
  /**
   * The number of workers involved.
   */
  workersCount: number;
  /**
   * The count of milestones not completed.
   */
  milestonesNotCompletedCount: number;
  /**
   * Optional Material UI system properties for custom styling.
   */
  sx?: SxProps;
}

/**
 * ProjectProgressCard component displays an overview of project progress,
 * including a progress circle, status legend, and key metrics.
 */
export function ProjectProgressCard({
  progressPercentage,
  tasksCompletedCount,
  workersCount,
  milestonesNotCompletedCount,
  sx,
}: ProjectProgressCardProps): React.JSX.Element {
  // Calculate the circumference and dash offset for the SVG circle to represent progress
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <Card sx={{ ...sx, borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
      <CardHeader title="Project Progress" sx={{ pb: 0, pt: 1,  }} />
      {/* <Divider /> */}

      
        <Grid
          
          spacing={1}
          sx={{ p: 0, display: 'flex', alignItems: 'center' }}
        >
          <Grid item xs={2} lg={2}>
            <svg width="120" height="120">
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#E0E0E0"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#FF7043"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            {/* <Typography variant="h4" component="div" sx={{ mt: 1, textAlign: 'center' }}>
              {progressPercentage}%
            </Typography> */}
          </Grid>

          <Grid item xs={12} lg={4}>
            <Stack spacing={0} sx={{ textAlign: 'center' }}>
              <StatusIndicator color="#FF7043" text={`${tasksCompletedCount} Tasks Completed`} />
              <StatusIndicator color="#FFAB91" text={`${workersCount} Workers`} />
              <StatusIndicator color="#BDBDBD" text={`${milestonesNotCompletedCount} Milestones Not Completed`} />
            </Stack>
          </Grid>

          <Grid item xs={12} lg={5} sx={{ p: 2, display: 'flex', alignItems: 'center',}}>
            
              <Grid item xs={12} lg={4}>
                <MetricCard
                    bgColor="#FF7043"
                    value={tasksCompletedCount}
                    label="milestones completed"
                    sx={{ marginRight: '5px' }} // Responsive width
                />
              </Grid>
                <Grid item xs={12} lg={4}>
                    <MetricCard
                        bgColor="#FFAB91"
                        value={workersCount}
                        label="workers"
                        sx={{ marginRight: '5px' }} // Responsive width
                    />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <MetricCard
                        bgColor="#BDBDBD"
                        value={milestonesNotCompletedCount}
                        label="milestones not completed"
                        sx={{ marginRight: '5px' }} // Responsive width
                    />
                </Grid>
           
          </Grid>

          
        </Grid>
     
      
      
      {/* <Divider /> */}
      {/* "All milestones" link */}
      <Box sx={{ px: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          component={RouterLink}
          href="#" // Placeholder href
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
          sx={{ color: '#FF7043', '&:hover': { textDecoration: 'underline' } }}
        >
          All milestones
        </Button>
      </Box>
    </Card>
  );
}