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
  Box,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { deleteProject } from "../../clients/project-client";
import { Project } from "../../../target/model/board";
import { useRouteMatch, useHistory } from "react-router-dom";
import { clientResponseHandler } from "../../util/client.hooks";
import { dateFormat } from "../../util/date.format";
import { appendUrl } from "../../util/url.helper";
import { ProjectDetail } from "./ProjectDetail";

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
        avatar={
          <Avatar
            aria-label="recipe"
            style={{
              background: project.color,
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
        <Box fontStyle="italic" mb={1}>
          {project.people.join(", ")}
        </Box>
        <Typography variant="body2" component="p">
          {project.description}
        </Typography>
        <ProjectDetail project={project} />
      </CardContent>
    </Card>
  );

  async function handleDeleteProject() {
    clientResponseHandler({
      responsePromise: deleteProject(project.id),
      onSuccess: onDelete,
    });
    handleClose();
  }

  function handleEditProject() {
    history.push(appendUrl(url, `edit/${project.id}`));
    handleClose();
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleClick(event: any) {
    setAnchorEl(event.currentTarget);
  }
}
