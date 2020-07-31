import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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
  const { register, handleSubmit } = useForm<ProjectData>();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  const [project, setProject] = useState<Project>(newProject);
  console.log(project);
  useEffect(() => {
    if (id) {
      getProject(id).then((project) => {
        setProject(project);
      });
    }
  }, [id]);

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
        <Select
          className={classes.input}
          defaultValue={project.state}
          inputRef={register}
        >
          <MenuItem value={"OPEN"}>Open</MenuItem>
          <MenuItem value={"IN_PROGRESS"}>In progress</MenuItem>
          <MenuItem value={"DONE"}>Done</MenuItem>
        </Select>
        <Button type="submit" color={"primary"}>
          Submit
        </Button>
      </form>
    </div>
  );

  async function onSubmit(data: ProjectData) {
    let response;
    if (id) {
      response = await updateProject({
        ...project,
        ...data,
        updatedAt: new Date(),
      });
    } else {
      response = await postProject({
        ...project,
        ...data,
      });
    }
    props.onSubmit();
    if (response.ok) {
      history.push("/projects");
    } else {
      // TODO: error handling
    }
  }
}
