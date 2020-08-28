import React, { useState, useEffect } from "react";
import { Card, Button, Grid, Typography } from "@material-ui/core";
import { getProjects, updateProject } from "../../clients/project-client";
import { Project } from "../../../model/graphql/TypeScript/board";
import {
  BrowserRouter as Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import { ProjectForm } from "./ProjectForm";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ProjectCard } from "./ProjectCard";
import { makeStyles } from "@material-ui/core/styles";
import { clientResponseHandler } from "../../util/client.hooks";
import { toast } from "react-toastify";
import { projectStates } from "../../util/typeValues.hooks";

const useStyles = makeStyles((theme) => ({
  list: {
    padding: theme.spacing(1),
    width: 250,
    minHeight: 250,
  },
  listStationary: {
    background: "lightgrey",
  },
  listDraggingOver: {
    background: "lightblue",
  },
  item: {
    userSelect: "none",
    padding: theme.spacing(2),
    margin: `0 0 ${theme.spacing(1)}px 0`,
  },
  itemStationary: {
    background: "grey",
  },
  itemDragging: {
    background: "lightgreen",
  },
}));

export function Projects() {
  const [state, setState] = useState<Project[][]>(projectStates.map((s) => []));
  const { path, url } = useRouteMatch();
  const [trigger, setTrigger] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    getProjects().then((projects) => {
      const projectLanes = projectStates.map((state) =>
        projects.filter((project) => project.state === state)
      );
      setState(projectLanes);
    });
  }, [trigger]);

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <Button variant="contained" color="primary" href={`${url}/new`}>
            New project
          </Button>
          <DragDropContext onDragEnd={onDragEnd}>
            <Grid container spacing={3}>
              {projectStates.map((status, ind) => (
                <Droppable key={ind} droppableId={status}>
                  {(provided, snapshot) => (
                    <Grid item xs={3}>
                      <Typography variant="h4">
                        {status.replace("_", " ")}
                      </Typography>
                      <Card
                        ref={provided.innerRef}
                        className={`${classes.list} ${
                          snapshot.isDraggingOver
                            ? classes.listDraggingOver
                            : classes.listStationary
                        }`}
                      >
                        {state[ind].map((project, index) => (
                          <Draggable
                            key={project.id}
                            draggableId={project.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`${classes.item} ${
                                  snapshot.isDragging
                                    ? classes.itemDragging
                                    : classes.itemStationary
                                }`}
                              >
                                <ProjectCard
                                  key={project.id}
                                  project={project}
                                  onDelete={() => setTrigger(!trigger)}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </Card>
                    </Grid>
                  )}
                </Droppable>
              ))}
            </Grid>
          </DragDropContext>
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

  function onDragEnd(event: any) {
    const { source, destination } = event;
    // dropped outside the list
    if (!destination) {
      return;
    }

    const oldState = [...state];

    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;
    const fromLane = state[projectStates.indexOf(sourceStatus)];
    const toLane = state[projectStates.indexOf(destinationStatus)];
    const project = fromLane[source.index];
    project.state = destinationStatus;
    fromLane.splice(source.index, 1);
    toLane.splice(destination.index, 0, project);

    clientResponseHandler({
      responsePromise: updateProject(project),
      onError: () => {
        setState(oldState);
        toast.error("Failed to update project");
      },
    });
  }
}
