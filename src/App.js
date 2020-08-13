import React, { useState } from 'react'
import Race from './Race'
import { useWindowSize } from './hooks/useWindowSize'
import useInterval from './hooks/useInterval'
import {
  GitMergeIcon,
  StarIcon,
  PlusIcon,
  RocketIcon,
  GitCommitIcon,
} from '@primer/octicons-react'

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
  return (
    <>
      <div style={{ fontSize: 10, color: '#667', paddingBottom: 5 }}>
        {event.created_at}
      </div>
      <div>
        <RocketIcon /> {event.repo.name.replace('klarna-incubator/', '')} is now
        public!
      </div>
    </>
  )
}

function PublicEvent({ event }) {
  return (
    <>
      <div style={{ fontSize: 10, color: '#667', paddingBottom: 5 }}>
        {event.created_at}
      </div>
      <div>
        <RocketIcon /> {event.repo.name.replace('klarna-incubator/', '')} is now
        public!
      </div>
    </>
  )
}

const eventComponents = {
  WatchEvent: WatchEvent,
  PushEvent: PushEvent,
  CreateEvent: CreateEvent,
  PublicEvent: PublicEvent,
}

function Commits() {
  const [data, setData] = useState([])

  useInterval(() => {
    fetch('https://api.github.com/orgs/klarna-incubator/events')
      .then((r) => r.json())
      .then((data) => {
        setData(data)
      })
  }, 60000)

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

        const Event = eventComponents[event.type] || BaseEvent

        return (
          <div
            style={{
              padding: 10,
              border: '1px solid #eeeef3',
              marginBottom: 10,
            }}
          >
            <Event event={event} />
          </div>
        )
      })}
    </div>
  )
}

export default () => {
  // const { height } = useWindowSize()
  // return <Race />

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        height: '100%',
        fontFamily: 'Menlo, Consolas, monospace',
      }}
    >
      <Race />
      <Commits />
    </div>
  )
}
