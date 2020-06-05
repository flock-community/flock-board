import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, CardActions } from "@material-ui/core";
import { getProjects } from "../../clients/project-client";
import { Project, ProjectState } from "../../model/graphql/TypeScript/board";

function ProjectCard(project: Project) {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {project.name}
        </Typography>
        <Typography variant="h5" component="h2">
          {project.description}
        </Typography>
        <Typography color="textSecondary">{project.state}</Typography>
        <Typography variant="body2" component="p">
          {project.timestamp.toString()}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export function Projects() {
  const [state, setState] = useState<Project[]>();

  useEffect(() => {
    getProjects().then(projects => {
      setState(projects);
    });
  });

  return (
    <>
      <Typography>Projects</Typography>
      {state && state.map(project => ProjectCard(project))}
    </>
  );
}
