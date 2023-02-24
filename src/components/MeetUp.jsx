import React from 'react'

function MeetUp({ meetUp }) {
    

  return (
      <div>
        <div>{meetUp.date}</div>
        <div>{meetUp.field.name}</div>
        <div>{meetUp.player.name}</div>
      </div>
  )
}

export default MeetUp