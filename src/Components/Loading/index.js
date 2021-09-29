import React from 'react';

export default function Loading(props) {
  const { loading } = props;

  if (loading) return <div>Loading</div>;

  return null;
}
