import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import { blue, green, pink, yellow } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.category === 'work') {
        return yellow[700];
      }
      if (note.category === 'money') {
        return green[500];
      }
      if (note.category === 'todos') {
        return pink[500];
      }
      return blue[500];
    },
  },
});

export default function NoteCard({ note, handleDelete }) {
  const { id, title, details, category } = note;

  const classes = useStyles(note);

  return (
    <div>
      <Card elevation={2} className={classes.cardBorder}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>{note.category[0].toUpperCase()}</Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(id)}>
              <DeleteOutline />
            </IconButton>
          }
          title={title}
          subheader={category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
