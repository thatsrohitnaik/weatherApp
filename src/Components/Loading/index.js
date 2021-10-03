import React from 'react';
import Slider from 'react-slick';
import { slideSettings } from '../../settings';
import Skeleton from '@mui/material/Skeleton';

export default function Loading() {
  return (
    <div>
      <br />
      <Slider {...slideSettings}>
        <div>
          <Skeleton variant="rectangular" width={'95%'} height={118} />
          <Skeleton width="95%" />
          <Skeleton width="60%" />
        </div>
        <div>
          <Skeleton variant="rectangular" width={'95%'} height={118} />
          <Skeleton width="95%" />
          <Skeleton width="60%" />
        </div>
        <div>
          <Skeleton variant="rectangular" width={'95%'} height={118} />
          <Skeleton width="95%" />
          <Skeleton width="60%" />
        </div>
      </Slider>
    </div>
  );
}
