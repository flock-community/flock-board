import React from "react";
import { ProjectForm, ProjectData } from "./ProjectForm";
import { postProject } from "../../clients/project-client";
import { useHistory } from "react-router-dom";
import { Project } from "../../../target/model/board";
import { clientResponseHandler } from "../../util/client.hooks";
import { toast } from "react-toastify";
import { ulid } from "ulid";
import {
  red,
  blue,
  deepPurple,
  green,
  pink,
  purple,
  indigo,
} from "@material-ui/core/colors";

interface NewFormProps {
  onSubmit: () => void;
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

function getNewProject(): Project {
  return {
    id: ulid(),
    name: "",
    description: "",
    state: "OPEN",
    createdAt: new Date(),
    updatedAt: new Date(),
    color: items[Math.floor(Math.random() * items.length)],
    people: [],
  };
}

export function ProjectNew(props: NewFormProps) {
  const history = useHistory();
  const project = getNewProject();

  return <ProjectForm onSubmit={onSubmit} project={project} />;

  function onSubmit(data: ProjectData) {
    const responsePromise = postProject({
      ...project,
      ...data,
    });

    clientResponseHandler({
      responsePromise,
      onSuccess: () => {
        props.onSubmit();
        history.push("/projects");
        toast.success("Successfully created new project!");
      },
      onError: () => {
        props.onSubmit();
        toast.error("Failed to create new project");
      },
    });
  }
}
