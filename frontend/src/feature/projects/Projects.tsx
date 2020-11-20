import React, { useState, useEffect } from "react";
import { Card, Grid, Typography, Fab } from "@material-ui/core";
import { getProjects, updateProject } from "../../clients/project-client";
import { Project } from "../../../target/model/board";
import {
  BrowserRouter as Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ProjectCard } from "./ProjectCard";
import { makeStyles } from "@material-ui/core/styles";
import { clientResponseHandler } from "../../util/client.hooks";
import { toast } from "react-toastify";
import { projectStates } from "../../util/typeValues.hooks";
import AddIcon from "@material-ui/icons/Add";
import { ProjectEdit } from "./ProjectEdit";
import { ProjectNew } from "./ProjectNew";
import { appendUrl } from "../../util/url.helper";
import { ProjectDetail } from "./ProjectDetail";

const useStyles = makeStyles((theme) => ({
  list: {
    padding: theme.spacing(1),
    width: 250,
    minHeight: "100%",
  },
  listStationary: {
    background: "lightgrey",
  },
  listDraggingOver: {
    background: "lightblue",
  },
  item: {
    userSelect: "none",
    padding: theme.spacing(0.5),
    margin: `0 0 ${theme.spacing(1)}px 0`,
  },
  itemStationary: {
    background: "unset",
  },
  itemDragging: {
    background: "lightgreen",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export function Projects() {
  const [state, setState] = useState<Project[][]>(
    projectStates.map((_s) => [])
  );
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
          <Fab
            variant="extended"
            className={classes.fab}
            color="primary"
            href={appendUrl(url, "new")}
          >
            <AddIcon />
            New project
          </Fab>
          <DragDropContext onDragEnd={onDragEnd}>
            <Grid container spacing={1}>
              <Grid item style={{ flexGrow: 1 }} />
              {projectStates.map((status, ind) => (
                <Droppable key={ind} droppableId={status}>
                  {(provided, snapshot) => (
                    <Grid item>
                      <Typography variant="h4" align="center">
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
              <Grid item style={{ flexGrow: 1 }} />
            </Grid>
          </DragDropContext>
        </Route>
        <Route path={`${path}/new`}>
          <ProjectNew onSubmit={() => setTrigger(!trigger)} />
        </Route>
        <Route path={`${path}/edit/:id`}>
          <ProjectEdit onSubmit={() => setTrigger(!trigger)} />
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
      responsePromise: updateProject(project.id, project),
      onError: () => {
        setState(oldState);
        toast.error("Failed to update project");
      },
    });
  }
}
