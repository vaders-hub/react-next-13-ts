'use client';

import React, { memo, useEffect, useState } from 'react';

function ActionForm(props: any) {
  return <div>ActionForm {JSON.stringify(props?.test?.test)}</div>;
}

export default ActionForm;
