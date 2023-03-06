import { useEffect, useState } from 'react'

function Account({ loggedInPlayer, playerInfo, setPlayerInfo }) {
    
    // const fetchPlayerInfo = () => {
    //     fetch (`/players/${loggedInPlayer.id}`)
    //     .then (r => r.json())
    //     .then(data => setPlayerInfo(data))
    // }
    // useEffect(() => {
    //     fetchPlayerInfo();
    // },[])

    console.log(playerInfo)

  return (
    <div>
        <h3>Your Profile:</h3>
        <p>{`${loggedInPlayer?.first_name} ${loggedInPlayer?.last_name}`}</p>
        <p>{loggedInPlayer?.email}</p>
        <h3>Your Meet Ups</h3>
        <p>{loggedInPlayer.meet_ups.map((meetUp) => (<div>{meetUp.field.name}</div>))}</p>

    </div>
  )
}

export default Account