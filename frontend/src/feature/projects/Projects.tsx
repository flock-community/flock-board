import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Button } from '@material-ui/core';
import { getProjects } from '../../clients/project-client';
import { Project } from '../../../model/graphql/TypeScript/board';
import { BrowserRouter as Switch, Route, useRouteMatch } from 'react-router-dom';
import { CreateProjectForm } from './CreateProjectForm';

interface ProjectCardProps {
  project: Project;
}

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
});

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {project.name}
        </Typography>
        <Typography variant="h5" component="h2">
          {project.description}
        </Typography>
        <Typography color="textSecondary">{project.state}</Typography>
        <Typography variant="body2" component="p">
          {dateFormat.format(project.createdAt)}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
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
            <ProjectCard key={project.id} project={project} />
          ))}
          <Button variant="contained" color="primary" href={`${url}/new`}>
            New project
          </Button>
        </Route>
        <Route path={`${path}/new`}>
          <CreateProjectForm onSubmit={() => setTrigger(!trigger)} />
        </Route>
      </Switch>
    </>
  );
}
