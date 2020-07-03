import React from 'react';
import { useForm } from 'react-hook-form';
import { postProject } from '../../clients/project-client';
import { ulid } from 'ulid';
import { makeStyles, FormLabel, Input, Button } from '@material-ui/core';
import { useHistory } from 'react-router';

interface ProjectData {
  name: string;
  description: string;
}

interface FormProps {
  onSubmit: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    'align-items': 'center',
    'flex-direction': 'column',
  },
  input: {
    display: 'block',
  },
}));

export function CreateProjectForm(props: FormProps) {
  const { register, handleSubmit } = useForm<ProjectData>();
  const history = useHistory();
  const onSubmit = async (data: ProjectData) => {
    const response = await postProject({
      ...data,
      id: ulid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      state: 'OPEN',
    });
    props.onSubmit();
    if (response.ok) {
      history.push('/projects');
    } else {
      // TODO: error handling
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel>Project name</FormLabel>
        <Input className={classes.input} name="name" inputRef={register} />
        <FormLabel>Project description</FormLabel>
        <Input className={classes.input} name="description" inputRef={register} />
        <Button type="submit" color={'primary'}>
          Submit
        </Button>
      </form>
    </div>
  );
}
