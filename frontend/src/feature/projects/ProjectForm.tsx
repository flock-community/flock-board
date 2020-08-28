import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  updateProject,
  getProject,
  postProject,
} from "../../clients/project-client";
import {
  makeStyles,
  FormLabel,
  Input,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { ProjectState, Project } from "../../../model/graphql/TypeScript/board";
import { ulid } from "ulid";
import { clientResponseHandler } from "../../util/client.hooks";
import { toast } from "react-toastify";

interface ProjectData {
  name: string;
  description: string;
  state: ProjectState;
}

interface FormProps {
  onSubmit: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "align-items": "center",
    "flex-direction": "column",
  },
  input: {
    display: "block",
  },
}));

const newProject: Project = {
  id: ulid(),
  name: "",
  description: "",
  state: "OPEN",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export function ProjectForm(props: FormProps) {
  const { register, handleSubmit, control } = useForm<ProjectData>();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  const [project, setProject] = useState<Project | null>(
    id == null ? newProject : null
  );
  useEffect(() => {
    if (id) {
      getProject(id).then((project) => {
        setProject(project);
      });
    }
  }, [id]);

  if (project == null) return null;
  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel>Project name</FormLabel>
        <Input
          className={classes.input}
          name="name"
          inputRef={register}
          defaultValue={project.name}
        />
        <FormLabel>Project description</FormLabel>
        <Input
          className={classes.input}
          name="description"
          inputRef={register}
          defaultValue={project.description}
        />
        <Controller
          as={
            <Select className={classes.input}>
              <MenuItem value={"OPEN"}>Open</MenuItem>
              <MenuItem value={"IN_PROGRESS"}>In progress</MenuItem>
              <MenuItem value={"DONE"}>Done</MenuItem>
            </Select>
          }
          name="state"
          control={control}
          defaultValue={project.state}
        />
        <Button type="submit" color={"primary"}>
          Submit
        </Button>
      </form>
    </div>
  );

  function onSubmit(data: ProjectData) {
    if (project == null) return;
    let responsePromise;
    if (id) {
      responsePromise = updateProject({
        ...project,
        ...data,
        updatedAt: new Date(),
      });
    } else {
      responsePromise = postProject({
        ...project,
        ...data,
      });
    }

    clientResponseHandler({
      responsePromise,
      onSuccess: () => {
        props.onSubmit();
        history.push("/projects");
        toast.success("Successfully created/updated project!");
      },
      onError: () => {
        props.onSubmit();
        toast.error("Failed to create/update project");
      },
    });
  }
}
