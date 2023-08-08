import { useEffect, useState } from 'react';

import Container from '@material-ui/core/Container';
import Masonry from 'react-masonry-css';

import NoteCard from '../components/NoteCard';

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch('http://localhost:8000/notes/' + id, {
        method: 'DELETE',
      });
      const newNotes = notes.filter((note) => note.id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.log('%c-> developmentConsole: error= ', 'color:#77dcfd', error);
    }
  };

  const renderNotes = notes.map((note) => (
    <div key={note.id}>
      <NoteCard note={note} handleDelete={handleDelete} />
    </div>
  ));

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {renderNotes}
      </Masonry>
    </Container>
  );
}
