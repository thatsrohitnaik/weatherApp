import React from 'react';
import Slider from 'react-slick';
import { slideSettings } from '../../settings';
import Skeleton from '@mui/material/Skeleton';

export default function Loading() {
  const set = { ...slideSettings, arrows: false };
  return (
    <div>
      <br />
      <Slider {...set}>
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
