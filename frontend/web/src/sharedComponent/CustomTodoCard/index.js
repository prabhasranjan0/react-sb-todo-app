import * as React from "react";
import { Card, CardActions, Typography, CardContent, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CustomTodoCard(props) {
  const {
    title = "",
    description = ``,
    todoStatus = ``,
    onHandleEdit = () => {},
    onHandleDelete = () => {},
  } = props;

  return (
    <Card
      sx={{
        boxShadow: `0px 0px 4px 3px rgba(0,0,0,0.2)`,
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 1.5 }}
        >
          {todoStatus}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Fab
          color="primary"
          aria-label="edit"
          size="small"
          onClick={onHandleEdit}
        >
          <EditIcon />
        </Fab>
        <Fab
          color="primary"
          aria-label="edit"
          size="small"
          onClick={onHandleDelete}
        >
          <DeleteIcon />
        </Fab>
      </CardActions>
    </Card>
  );
}
