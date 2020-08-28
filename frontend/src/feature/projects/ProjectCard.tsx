import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Menu,
  MenuItem,
  IconButton,
  CardHeader,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { deleteProject } from "../../clients/project-client";
import { Project } from "../../../model/graphql/TypeScript/board";
import { useRouteMatch, useHistory } from "react-router-dom";
import { clientResponseHandler } from "../../util/client.hooks";
import { dateFormat } from "../../util/date.format";

interface ProjectCardProps {
  project: Project;
  onDelete: () => void;
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const { url } = useRouteMatch();

  return (
    <Card variant="outlined">
      <CardHeader
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
      />
      <CardContent>
        <Typography variant="h5">{project.description}</Typography>
        <Typography color="textSecondary">{project.state}</Typography>
        <Typography variant="body2" component="p">
          {dateFormat.format(project.createdAt)}
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
