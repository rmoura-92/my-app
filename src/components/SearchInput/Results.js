
function Results({ data, isLoading, handleLoadMore })  {

  if (isLoading){
    return <div>Loading...</div>
  }

  return (
    <div>
      <ul className="results">
        {data.map((result, i) => (
          <li key={i}>
            <img src={result.image} alt={result.name} />
            {result.name}
          </li>
        ))}
      </ul>
      { data && data.length ? <button onClick={handleLoadMore}>LOAD MORE</button> : null }
    </div>
  )
}

Results.defaultProps = {
  data: [],
  isLoading: false,
  handleLoadMore: () => {
    throw new Error('Missing handle more func')
  },
}

export default Results;