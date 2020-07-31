import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Menu,
  CardActions,
  MenuItem,
  IconButton,
  CardHeader,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { getProjects, deleteProject } from "../../clients/project-client";
import { Project } from "../../../model/graphql/TypeScript/board";
import {
  BrowserRouter as Switch,
  Route,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { ProjectForm } from "./ProjectForm";

interface ProjectCardProps {
  project: Project;
  onDelete: () => void;
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "long",
  day: "2-digit",
});

function ProjectCard({ project, onDelete }: ProjectCardProps) {
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
        <Typography variant="h5" component="h2">
          {project.description}
        </Typography>
        <Typography color="textSecondary">{project.state}</Typography>
        <Typography variant="body2" component="p">
          {dateFormat.format(project.createdAt)}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );

  async function handleDeleteProject() {
    const response = await deleteProject(project);
    if (response.ok) {
      onDelete();
    }
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

export function Projects() {
  const [state, setState] = useState<Project[]>([]);
  const { path, url } = useRouteMatch();
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    getProjects().then((projects) => {
      setState(projects);
    });
  }, [trigger]);

  return (
    <>
      <Switch>
        <Route exact path={path}>
          {state.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={() => setTrigger(!trigger)}
            />
          ))}
          <Button variant="contained" color="primary" href={`${url}/new`}>
            New project
          </Button>
        </Route>
        <Route path={`${path}/new`}>
          <ProjectForm onSubmit={() => setTrigger(!trigger)} />
        </Route>
        <Route path={`${path}/edit/:id`}>
          <ProjectForm onSubmit={() => setTrigger(!trigger)} />
        </Route>
      </Switch>
    </>
  );
}
