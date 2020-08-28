import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Menu,
  MenuItem,
  IconButton,
  CardHeader,
  Avatar,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { deleteProject } from "../../clients/project-client";
import { Project } from "../../../model/graphql/TypeScript/board";
import { useRouteMatch, useHistory } from "react-router-dom";
import { clientResponseHandler } from "../../util/client.hooks";
import { dateFormat } from "../../util/date.format";
import {
  red,
  blue,
  deepPurple,
  green,
  pink,
  purple,
  indigo,
} from "@material-ui/core/colors";

interface ProjectCardProps {
  project: Project;
  onDelete: () => void;
}

const items = [
  red[500],
  blue[500],
  green[500],
  pink[500],
  purple[500],
  deepPurple[500],
  indigo[500],
];

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const { url } = useRouteMatch();

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            style={{
              background: items[Math.floor(Math.random() * items.length)],
            }}
          >
            {project.name[0].toUpperCase()}
          </Avatar>
        }
        action={
          <>
            <IconButton onClick={handleClick} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleEditProject}>Edit</MenuItem>
              <MenuItem onClick={handleDeleteProject}>Delete</MenuItem>
            </Menu>
          </>
        }
        title={project.name}
        subheader={dateFormat.format(project.createdAt)}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {project.description}
        </Typography>
      </CardContent>
    </Card>
  );

  async function handleDeleteProject() {
    clientResponseHandler({
      responsePromise: deleteProject(project),
      onSuccess: onDelete,
    });
    handleClose();
  }

  function handleEditProject() {
    history.push(`${url}/edit/${project.id}`);
    handleClose();
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleClick(event: any) {
    setAnchorEl(event.currentTarget);
  }
}
