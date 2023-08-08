import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import TextField from '@material-ui/core/TextField';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
});

export default function Create() {
  const classes = useStyle();
  const history = useHistory();

  const titleRef = useRef('');
  const detailsRef = useRef('');

  const [category, setCategory] = useState('money');

  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const onChangeHandler = (event) => {
    setCategory(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const title = titleRef.current.value;
    const details = detailsRef.current.value;

    setTitleError(false);
    setDetailsError(false);

    if (title.trim() === '') {
      setTitleError(true);
    }
    if (details.trim() === '') {
      setDetailsError(true);
    }

    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ title, details, category }),
      }).then(() => history.push('/'));

      // titleRef.current.value = '';
      // detailsRef.current.value = '';
      // setCategory('money');
    }
  };

  return (
    <Container>
      <Typography variant="h6" color="textSecondary" component="h2" gutterBottom>
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={onSubmitHandler}>
        <TextField
          inputRef={titleRef}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          inputRef={detailsRef}
          className={classes.field}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          minRows={5}
          fullWidth
          required
          error={detailsError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            aria-label="category"
            name="category1"
            value={category}
            onChange={onChangeHandler}
          >
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel value="reminders" control={<Radio />} label="Reminders" />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
