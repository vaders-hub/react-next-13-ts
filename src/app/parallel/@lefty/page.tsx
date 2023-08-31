import React from 'react';

export default async function Left() {
  await new Promise(resolve => setTimeout(resolve, 6000));
  return <>left</>;
}
