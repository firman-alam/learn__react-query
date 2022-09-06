import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Planet from './Planet';

const fetchPlanets = async (page = 1) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);

  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, status, isPreviousData } = useQuery(
    ['planets', page],
    () => fetchPlanets(page),
    { keepPreviousData: true }
  );
  console.log(data);

  return (
    <div>
      <h2>Planets</h2>

      {status === 'error' && <div>Error fetching data</div>}
      {status === 'loading' && <div>Loading data...</div>}
      {status === 'success' && (
        <>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 0}
          >
            Previous
          </button>
          <span>{page}</span>
          <button
            onClick={() =>
              setPage((old) => (!data || !data.next ? old : old + 1))
            }
          >
            Next
          </button>
          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </>
      )}
    </div>
  );
};

export default Planets;
