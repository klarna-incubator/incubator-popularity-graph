import React, { useState } from 'react'
import useInterval from './hooks/useInterval'

import {
  GitMergeIcon,
  StarIcon,
  PlusIcon,
  RocketIcon,
  GitCommitIcon,
} from '@primer/octicons-react'
import ErrorBoundary from './ErrorBoundary'

const eventComponents = {
  WatchEvent: WatchEvent,
  PushEvent: PushEvent,
  CreateEvent: CreateEvent,
  PublicEvent: PublicEvent,
}

export default function Activity() {
  const [data, setData] = useState([])

  useInterval(() => {
    if (data.message) return
    fetch(
      `https://api.github.com/orgs/klarna-incubator/events?time=${new Date()}`
    )
      .then((r) => r.json())
      .then((data) => {
        setData(data)
      })
  }, 10000)

  if (data.message) return data.message

  return (
    <div>
      <h1 style={{ fontWeight: 400, color: '#334' }}>Activity</h1>

      {data.map((event) => {
        if (
          event.type === 'CreateEvent' &&
          event.payload.ref_type !== 'repository'
        ) {
          return null
        }

        const Event = eventComponents[event.type]
        if (!Event) return null

        return (
          <div
            style={{
              padding: 10,
              border: '1px solid #eeeef3',
              marginBottom: 10,
            }}
          >
            <ErrorBoundary>
              <Event event={event} />
            </ErrorBoundary>
          </div>
        )
      })}
    </div>
  )
}

function BaseEvent({ event, children, Icon }) {
  return (
    <>
      <div
        style={{
          fontSize: 10,
          color: '#667',
          float: 'right',
          lineHeight: 1,
        }}
      >
        {event.actor.login}

        <img
          src={event.actor.avatar_url}
          style={{
            width: 16,
            borderRadius: 4,
            verticalAlign: 'middle',
            marginLeft: 5,
          }}
        />
      </div>
      <div style={{ fontSize: 10, color: '#667', paddingBottom: 5 }}>
        {event.created_at}
      </div>

      <div>
        <Icon /> {event.repo.name.replace('klarna-incubator/', '')}
      </div>

      {children}
    </>
  )
}

function WatchEvent({ event }) {
  return <BaseEvent event={event} Icon={StarIcon} />
}

function PushEvent({ event }) {
  return (
    <BaseEvent event={event} Icon={GitMergeIcon}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {event.payload.commits.map((commit) => {
          return (
            <li
              style={{
                marginLeft: 20,
                fontSize: 10,
                padding: 10,
              }}
            >
              <GitCommitIcon style={{ verticalAlign: 'middle', width: 12 }} />
              <b> {commit.author.name} </b>
              <i>{commit.message}</i>
            </li>
          )
        })}
      </ul>
    </BaseEvent>
  )
}

function CreateEvent({ event }) {
  return <SimpleeBaseEvent event={event} message={'was created!'} />
}

function SimpleeBaseEvent({ event, message }) {
  return (
    <>
      <div style={{ fontSize: 10, color: '#667', paddingBottom: 5 }}>
        {event.created_at}
      </div>
      <div>
        <RocketIcon /> {event.repo.name.replace('klarna-incubator/', '')}{' '}
        {message}
      </div>
    </>
  )
}

function PublicEvent({ event }) {
  return <SimpleeBaseEvent event={event} message={'is now public!'} />
}
