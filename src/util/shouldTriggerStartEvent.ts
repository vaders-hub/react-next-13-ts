import React from 'react';
import { addBasePath } from 'next/dist/client/add-base-path';

function getURL(href: string): URL {
  return new URL(addBasePath(href), location.href);
}

// https://github.com/vercel/next.js/blob/400ccf7b1c802c94127d8d8e0d5e9bdf9aab270c/packages/next/src/client/link.tsx#L169
function isModifiedEvent(e: React.MouseEvent): boolean {
  const eventTarget = e.currentTarget as HTMLAnchorElement | SVGAElement;
  const target = eventTarget.getAttribute('target');
  return (
    (target && target !== '_self') ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey || // triggers resource download
    (e.nativeEvent && e.nativeEvent.button === 1)
  );
}

export function shouldTriggerStartEvent(href: string, clickEvent?: React.MouseEvent) {
  const current = window.location;
  const target = getURL(href);

  if (clickEvent && isModifiedEvent(clickEvent)) return false; // modified events: fallback to browser behaviour
  if (current.origin !== target.origin) return false; // external URL
  if (current.pathname === target.pathname && current.search === target.search) return false; // same URL

  return true;
}
