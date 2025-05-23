import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import type { SxProps } from '@mui/material/styles';

/**
 * Props interface for the MetricCard component.
 */
export interface MetricCardProps {
  /**
   * The background color of the card.
   * Can be any valid CSS color string (e.g., '#FF7043', 'orange', 'rgb(255, 112, 67)').
   */
  bgColor?: string;
  /**
   * The main, larger text to display on the card (e.g., a number or a short phrase).
   */
  value: string | number;
  /**
   * The smaller, descriptive text to display below the value (e.g., a label or status).
   */
  label: string;
  /**
   * Optional Material UI system properties for custom styling.
   */
  sx?: SxProps;
}

/**
 * A reusable Material UI Card component to display a key metric with a value and a label.
 * It accepts a background color, a larger text (value), and a smaller text (label).
 */
export function MetricCard({ bgColor = '#FF7043', value, label, sx }: MetricCardProps): React.JSX.Element {
  return (
    <Card
      sx={{
        // Base styling for the card
        borderRadius: '10px', // Rounded corners as seen in the image
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1, // Padding around the content
        textAlign: 'center',
        // minHeight: '120px', // Minimum height to ensure consistent size
        width: '100px', // Adjust width to content
        maxWidth: '200px', // Maximum width to prevent overflow
        height: '100px', // Fixed height for uniformity
        // Apply the background color passed in props
        bgcolor: bgColor,
        // Ensure text color is white for contrast against colored backgrounds
        color: 'white',
        ...sx, // Apply any additional custom styles
      }}
    >
      {/* Typography for the larger value text */}
      <Typography variant="h6" component="div" sx={{ fontWeight: 600, lineHeight: 1 }}>
        {value}
      </Typography>
      {/* Typography for the smaller descriptive label text */}
      <Typography variant="body2" sx={{ mt: 1, lineHeight: 1.2 }}>
        {label}
      </Typography>
    </Card>
  );
}

// Example usage of the MetricCard component
export function App() {
  return (
    <Box sx={{ display: 'flex', gap: 2, p: 3, flexWrap: 'wrap' }}>
      {/* Example 1: Matching the image */}
      <MetricCard
        bgColor="#FF7043" // Orange color from the image
        value="66"
        label="milestones completed"
      />

      {/* Example 2: Another color and different text */}
      <MetricCard
        bgColor="#4CAF50" // Green color
        value="120"
        label="tasks finished"
      />

      {/* Example 3: Blue color and different text */}
      <MetricCard
        bgColor="#2196F3" // Blue color
        value="8"
        label="projects active"
      />

      {/* Example 4: Custom styling with a larger card */}
      <MetricCard
        bgColor="#9C27B0" // Purple color
        value="95%"
        label="satisfaction rate"
        sx={{ minHeight: '150px', p: 4 }}
      />
    </Box>
  );
}
