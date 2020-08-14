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

const STATES = ["OPEN", "IN_PROGRESS", "DONE"];
const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
  minHeight: 250,
});

export function Projects() {
  const [state, setState] = useState<Project[][]>(STATES.map((s) => []));
  const { path, url } = useRouteMatch();
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    getProjects().then((projects) => {
      const projectLanes = STATES.map((state) =>
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
              {STATES.map((status, ind) => (
                <Droppable key={ind} droppableId={status}>
                  {(provided, snapshot) => (
                    <Grid item xs={3}>
                      <Typography variant="h4" component="h2">
                        {status.replace("_", " ")}
                      </Typography>
                      <Card
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
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
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
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

    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;

    // TODO: persist index as well
    const fromLane = state[STATES.indexOf(sourceStatus)];
    const toLane = state[STATES.indexOf(destinationStatus)];
    const project = fromLane[source.index];
    project.state = destinationStatus;
    fromLane.splice(source.index, 1);
    toLane.splice(destination.index, 0, project);
    setTrigger(!trigger);

    // TODO: error handling
    updateProject(project);
  }
}
