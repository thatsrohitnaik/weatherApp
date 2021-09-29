import React from 'react';

export default function Loading(props) {
  const { isError } = props;

  if (isError) return <div>error</div>;

  return null;
}
