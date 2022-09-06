import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Person from './Person';

const fetchPeople = async (page = 1) => {
  const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);

  return res.json();
};

const People = () => {
  const [page, setPage] = useState(1);
  const { data, status, isPreviousData } = useQuery(
    ['people', page],
    () => fetchPeople(page),
    { keepPreviousData: true }
  );
  console.log(data);

  return (
    <div>
      <h2>People</h2>

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
            disabled={!data || !data?.next}
          >
            Next
          </button>
          {data.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </>
      )}
    </div>
  );
};

export default People;
