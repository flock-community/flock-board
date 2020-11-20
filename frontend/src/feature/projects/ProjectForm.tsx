import React, { useState } from "react";
import { ProjectState } from "../../../target/model/board";
import { Controller, useForm } from "react-hook-form";
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
import { projectStates } from "../../util/typeValues.hooks";

export interface Person {
  name: string;
}
export interface ProjectData {
  name: string;
  description: string;
  state: ProjectState;
  people: string[];
  organization: string;
  repo: string;
}
interface FormProps {
  onSubmit: (project: ProjectData) => void;
  project: ProjectData;
}

const options = [
  "Anouk",
  "Florian",
  "Goffert",
  "Jacky",
  "Jerre",
  "Julius",
  "Kasper",
  "Lukas",
  "Maureen",
  "Niels",
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

const getOptionLabel = (option: string) => {
  return option;
};

const renderOption = (option: string, state: AutocompleteRenderOptionState) => {
  return (
    <>
      <Checkbox style={{ marginRight: 8 }} checked={state.selected} />
      {getOptionLabel ? getOptionLabel(option) : ""}
    </>
  );
};

const renderInput = (params: AutocompleteRenderInputParams) => (
  <TextField {...params} variant="outlined" label={"people"} />
);

export function ProjectForm(props: FormProps) {
  const project = props.project;
  const { register, handleSubmit, control } = useForm<ProjectData>();
  const classes = useStyles();
  const [people, setPeople] = useState(project.people || []);

  return (
    <div className={classes.root}>
      <form
        onSubmit={handleSubmit((data) => props.onSubmit({ ...data, people }))}
      >
        <Grid container spacing={2}>
          <Grid container item justify="center" xs={12}>
            <TextField
              required
              className={classes.input}
              name="name"
              inputRef={register}
              label="name"
              defaultValue={project.name}
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
                  onChange={(_e, data) => setPeople(data)}
                  defaultValue={project.people || []}
                />
              )}
              name="people"
              control={control}
            />
          </Grid>

          <Grid container item justify="center" xs={12}>
            <TextField
              className={classes.input}
              name="organization"
              inputRef={register}
              defaultValue={project.organization}
              label="Github organization"
            />
          </Grid>

          <Grid container item justify="center" xs={12}>
            <TextField
              className={classes.input}
              name="repo"
              inputRef={register}
              defaultValue={project.repo}
              label="Github repository"
            />
          </Grid>

          <Grid container item justify="center" xs={12}>
            <Controller
              as={
                <TextField select label="State" className={classes.input}>
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
}
