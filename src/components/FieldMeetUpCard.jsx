

function FieldMeetUpCard({meetUp}) {
  return (
    <div>
        <h3>{meetUp.sport}</h3>
        <h4>{meetUp.date}</h4>
        <p>{meetUp.player.name}</p>
        <p>{meetUp.teammates.map((teammate) => (<div>{teammate}</div>))}</p>
    </div>
  )
}

export default FieldMeetUpCard;