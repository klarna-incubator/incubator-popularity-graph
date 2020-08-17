import React, { useState } from 'react'
import Race from './Race'
import Activity from './Activity'

import {
  GitMergeIcon,
  StarIcon,
  PlusIcon,
  RocketIcon,
  GitCommitIcon,
} from '@primer/octicons-react'
import ErrorBoundary from './ErrorBoundary'

export default () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        height: '100%',
        fontFamily: 'Menlo, Consolas, monospace',
      }}
    >
      <ErrorBoundary>
        <Race />
      </ErrorBoundary>
      <ErrorBoundary>
        <Activity />
      </ErrorBoundary>
    </div>
  )
}
