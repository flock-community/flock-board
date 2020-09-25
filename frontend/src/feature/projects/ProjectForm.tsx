import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  updateProject,
  getProject,
  postProject,
} from "../../clients/project-client";
import {
  makeStyles,
  Button,
  MenuItem,
  TextField,
  Grid,
  Checkbox,
} from "@material-ui/core";
import Autocomplete, {
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
} from "@material-ui/lab/Autocomplete";
import { useHistory, useParams } from "react-router-dom";
import { ProjectState, Project } from "../../../target/model/board";
import { ulid } from "ulid";
import { clientResponseHandler } from "../../util/client.hooks";
import { toast } from "react-toastify";
import { projectStates } from "../../util/typeValues.hooks";
import {
  red,
  blue,
  deepPurple,
  green,
  pink,
  purple,
  indigo,
} from "@material-ui/core/colors";

interface ProjectData {
  name: string;
  description: string;
  state: ProjectState;
  people: string[];
}

interface FormProps {
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

const options = [
  "Anouk",
  "Florian",
  "Goffert",
  "Jacky",
  "Jerre",
  "Julius",
  "Kasper",
  "Lucas",
  "Maureen",
  "Nils",
  "Reinier",
  "Tobias",
  "Vincent",
  "Willem",
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  input: {
    width: 350,
  },
}));

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

const getOptionLabel = (option: string) => {
  return option;
};

const renderOption = (option: string, state: AutocompleteRenderOptionState) => (
  <>
    <Checkbox
      // icon={icon}
      // checkedIcon={checkedIcon}
      style={{ marginRight: 8 }}
      checked={state.selected}
    />
    {getOptionLabel ? getOptionLabel(option) : ""}
  </>
);

const renderInput = (params: AutocompleteRenderInputParams) => (
  <TextField {...params} variant="outlined" label={"people"} />
);

export function ProjectForm(props: FormProps) {
  const { register, handleSubmit, control } = useForm<ProjectData>();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  const [project, setProject] = useState<Project | null>(
    id == null ? getNewProject() : null
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
        <Grid container spacing={2}>
          <Grid container item justify="center" xs={12}>
            <TextField
              required
              className={classes.input}
              name="name"
              inputRef={register}
              defaultValue={project.name}
              label="name"
            />
          </Grid>
          <Grid container item justify="center" xs={12}>
            <TextField
              className={classes.input}
              name="description"
              inputRef={register}
              defaultValue={project.description}
              multiline={true}
              label="description"
            />
          </Grid>
          <Grid container item justify="center" xs={12}>
            <Controller
              render={(_props) => (
                <Autocomplete
                  autoComplete
                  multiple
                  filterSelectedOptions
                  disableCloseOnSelect
                  className={classes.input}
                  options={options}
                  renderOption={renderOption}
                  renderInput={renderInput}
                  getOptionLabel={getOptionLabel}
                  getOptionSelected={(option, value) => option === value}
                  onChange={(_e, data) => {
                    project.people = data;
                    setProject(project);
                  }}
                />
              )}
              name="people"
              // rules={rules}
              control={control}
              defaultValue={project.people}
            />
          </Grid>

          <Grid container item justify="center" xs={12}>
            <Controller
              as={
                <TextField select label="Select" className={classes.input}>
                  {projectStates.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state.replace("_", " ")}
                    </MenuItem>
                  ))}
                </TextField>
              }
              name="state"
              control={control}
              defaultValue={project.state}
            />
          </Grid>

          <Grid container item justify="center" xs={12}>
            <Button variant="contained" type="submit" color={"primary"}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );

  function onSubmit(data: ProjectData) {
    if (project == null) return;

    data.people = project.people;
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
