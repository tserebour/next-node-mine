'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  FunnelSimple as FunnelSimpleIcon, // For Priority filter
  DownloadSimple as DownloadSimpleIcon, // For Download button
  Plus as PlusIcon, // For Assign Task button
} from '@phosphor-icons/react/dist/ssr';
import dayjs from 'dayjs';
import { Stack, Typography } from '@mui/material';

/**
 * Defines the mapping for task statuses to their display label and Material UI color.
 */
const statusMap = {
  completed: { label: 'Completed', color: 'success' },
  ongoing: { label: 'Ongoing', color: 'warning' },
  notStarted: { label: 'Not Started', color: 'error' },
} as const;

/**
 * Interface for defining the structure of a single task.
 */
export interface Task {
  id: string;
  taskName: string;
  taskDescription: string;
  assignedTo: string;
  deadline: Date;
  status: 'completed' | 'ongoing' | 'notStarted';
}

/**
 * Props interface for the AssignedTasksTable component.
 */
export interface AssignedTasksTableProps {
  tasks?: Task[];
  sx?: SxProps;
}

/**
 * AssignedTasksTable component displays a list of assigned tasks in a Material UI table.
 * It includes a header with action buttons and pagination controls.
 */
export function AssignedTasksTable({ tasks = [], sx }: AssignedTasksTableProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      {/* Card Header with Title and Action Buttons */}
      <CardHeader
        title="List of Assigned Tasks"
        action={
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button
              variant="contained"
              sx={{ bgcolor: '#FF7043', '&:hover': { bgcolor: '#E65100' } }} // Orange button styling
              startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            >
              Assign Task
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#E0E0E0',
                color: '#424242',
                '&:hover': { borderColor: '#BDBDBD', bgcolor: '#F5F5F5' },
              }}
              startIcon={<FunnelSimpleIcon fontSize="var(--icon-fontSize-md)" />}
            >
              Priority
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#E0E0E0',
                color: '#424242',
                '&:hover': { borderColor: '#BDBDBD', bgcolor: '#F5F5F5' },
              }}
              startIcon={<DownloadSimpleIcon fontSize="var(--icon-fontSize-md)" />}
            >
              Download
            </Button>
          </Stack>
        }
      />
      <Divider /> {/* Divider below the header */}

      {/* Table Container for Horizontal Scrolling */}
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          {/* Table Head */}
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Task Description</TableCell>
              <TableCell>Assigned to</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          {/* Table Body */}
          <TableBody>
            {tasks.map((task) => {
              // Get the label and color for the status chip
              const { label, color } = statusMap[task.status] ?? { label: 'Unknown', color: 'default' };

              return (
                <TableRow hover key={task.id}>
                  <TableCell>{task.taskName}</TableCell>
                  <TableCell sx={{ maxWidth: '300px', whiteSpace: 'normal' }}>{task.taskDescription}</TableCell>
                  <TableCell>{task.assignedTo}</TableCell>
                  <TableCell>{dayjs(task.deadline).format('DD/MM/YYYY')}</TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider /> {/* Divider above the pagination */}

      {/* Card Actions for Pagination */}
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Button
          color="inherit"
          size="small"
          variant="outlined"
          sx={{
            borderColor: '#E0E0E0',
            color: '#424242',
            '&:hover': { borderColor: '#BDBDBD', bgcolor: '#F5F5F5' },
          }}
        >
          Previous
        </Button>
        <Typography variant="body2" color="text.secondary">
          Page 1 of 3
        </Typography>
        <Button
          color="inherit"
          size="small"
          variant="outlined"
          sx={{
            borderColor: '#E0E0E0',
            color: '#424242',
            '&:hover': { borderColor: '#BDBDBD', bgcolor: '#F5F5F5' },
          }}
        >
          Next
        </Button>
      </CardActions>
    </Card>
  );
}

// Mock data for demonstration purposes


// Example usage of the component (for demonstration)

