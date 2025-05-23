import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps } from '@mui/material/styles';

/**
 * Props interface for the StatusIndicator component.
 */
export interface StatusIndicatorProps {
  /**
   * The color of the circular indicator.
   * Can be any valid CSS color string (e.g., '#FF7043', 'green', 'rgb(0, 128, 0)').
   */
  color?: string;
  /**
   * The text label to display next to the indicator.
   */
  text: string;
  /**
   * Optional Material UI system properties for custom styling of the root Box.
   */
  sx?: SxProps;
}

/**
 * A reusable Material UI component that displays a colored circular indicator
 * next to a text label. Ideal for status legends or simple categorizations.
 */
export function StatusIndicator({ color = '#FF7043', text, sx }: StatusIndicatorProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5, // Space between the circle and the text
        ...sx, // Apply any additional custom styles
      }}
    >
      {/* The colored circular indicator */}
      <Box
        sx={{
          width: '10px', // Diameter of the circle
          height: '10px', // Diameter of the circle
          borderRadius: '50%', // Makes it a perfect circle
          bgcolor: color, // Apply the specified color
          flexShrink: 0, // Prevent the circle from shrinking
        }}
      />
      {/* The text label */}
      <Typography variant="body2" sx={{ color: '#424242', fontWeight: 500 }}>
        {text}
      </Typography>
    </Box>
  );
}

// Example usage of the StatusIndicator component
export function App() {
  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Example 1: Matching the image */}
      <StatusIndicator color="#FF7043" text="Tasks completed" />

      {/* Example 2: Different color and text */}
      <StatusIndicator color="#4CAF50" text="Active users" />

      {/* Example 3: Blue color for pending status */}
      <StatusIndicator color="#2196F3" text="Pending approvals" />

      {/* Example 4: Custom styling */}
      <StatusIndicator color="#9C27B0" text="Critical issues" sx={{ '& .MuiTypography-root': { fontSize: '1.1rem' } }} />
    </Box>
  );
}
