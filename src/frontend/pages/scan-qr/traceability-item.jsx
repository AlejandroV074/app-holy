/* eslint-disable react/prop-types */
const TraceabilityItem = ({point, onClick}) => {
  return (
    <div className='traceability-item' onClick={onClick}>
        <span className={`${point?.type_user}-icon icon-point`}></span>
        <div className='traceability-text' >
            <span> {point?.name} </span>
            <span> {point?.traceability_date} </span>
        </div>
    </div>
  )
}

export default TraceabilityItem