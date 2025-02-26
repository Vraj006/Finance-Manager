import React from 'react';
import { Skeleton, Box, Grid } from '@mui/material';

const SkeletonLoader = () => {
  return (
    <Box sx={{ width: '100%', animation: 'pulse 1.5s ease-in-out infinite' }}>
      {/* Statistics Cards Skeleton */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} md={4} key={item}>
            <Skeleton
              variant="rectangular"
              height={120}
              sx={{
                borderRadius: 2,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/* Content Skeleton */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Skeleton
            variant="rectangular"
            height={400}
            sx={{
              borderRadius: 2,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Skeleton
            variant="rectangular"
            height={400}
            sx={{
              borderRadius: 2,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SkeletonLoader;