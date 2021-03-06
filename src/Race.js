import React, { useState, useEffect } from 'react'
import { Bar } from '@nivo/bar'
import useDimensions from 'react-use-dimensions'
import { useWindowSize } from './hooks/useWindowSize'

function take(n, arr) {
  return arr.slice(0, n)
}

const BarComponent = (props) => {
  const [ref, { width }] = useDimensions()

  const isTextBig = width > props.width - 20
  const x = isTextBig ? 10 : props.width - 16

  return (
    <g transform={`translate(${props.x},${props.y})`}>
      <rect
        x={-3}
        y={7}
        width={props.width}
        height={props.height}
        fill="rgba(0, 0, 0, .07)"
      />
      <rect width={props.width} height={props.height} fill={props.color} />
      <rect
        x={props.width - 8}
        width={8}
        height={props.height}
        fill={`rgba(0,0,0,0.2)`}
      />
      <text
        x={x}
        y={props.height / 4.5}
        textAnchor={isTextBig ? 'start' : 'end'}
        dominantBaseline="central"
        fill={'rgba(0,0,0,0.75)'}
        style={{
          fontSize: props.height / 3,
        }}
        ref={ref}
      >
        {props.data.indexValue}
      </text>
      <text
        x={x}
        y={props.height / 1.5}
        textAnchor={isTextBig ? 'start' : 'end'}
        dominantBaseline="central"
        fill={'black'}
        style={{
          fontSize: props.height / 2.1,
        }}
      >
        {props.data.value}
      </text>
    </g>
  )
}

const Race = () => {
  const { height } = useWindowSize()
  const [ref, size] = useDimensions()
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('https://api.github.com/orgs/klarna-incubator/repos')
      .then((r) => r.json())
      .then((data) => {
        setData(data)
      })
  }, [])

  if (data.message) return data.message
  console.log({ data })

  const state = data.map((repo) => {
    return {
      id: repo.name,
      value: repo.stargazers_count,
    }
  })

  const barData = take(
    18,
    [...state].sort((a, b) => a.value - b.value).reverse()
  ).reverse()

  return (
    <div ref={ref}>
      <h1 style={{ marginLeft: 60, fontWeight: 400, color: '#334' }}>
        Repos popularity
      </h1>

      <Bar
        width={size.width}
        height={height - 130}
        layout="horizontal"
        margin={{ top: 26, right: 120, bottom: 26, left: 60 }}
        data={barData}
        indexBy="id"
        keys={['value']}
        colors={{ scheme: 'spectral' }}
        colorBy="indexValue"
        borderColor={{ from: 'color', modifiers: [['darker', 2.6]] }}
        enableGridX
        // enableGridY={false}
        axisTop={{
          format: '~s',
        }}
        axisBottom={{
          format: '~s',
        }}
        axisLeft={null}
        padding={0.3}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.4]] }}
        isInteractive={false}
        barComponent={BarComponent}
        motionStiffness={170}
        motionDamping={26}
      />
    </div>
  )
}

export default Race
