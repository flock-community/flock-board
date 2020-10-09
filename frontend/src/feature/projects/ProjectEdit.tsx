import { ProjectForm, ProjectData } from "./ProjectForm";
import React, { useState, useEffect } from "react";
import { updateProject, getProject } from "../../clients/project-client";
import { useHistory, useParams } from "react-router-dom";
import { Project } from "../../../target/model/board";
import { clientResponseHandler } from "../../util/client.hooks";
import { toast } from "react-toastify";

interface EditFormProps {
  onSubmit: () => void;
}

export function ProjectEdit(props: EditFormProps) {
  const history = useHistory();
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    getProject(id).then((project) => {
      setProject(project);
    });
  }, [id]);

  if (project == null) return null;
  return <ProjectForm onSubmit={onSubmit} project={project} />;

  function onSubmit(data: ProjectData) {
    if (project == null) return;

    const responsePromise = updateProject({
      ...project,
      ...data,
      updatedAt: new Date(),
    });

    clientResponseHandler({
      responsePromise,
      onSuccess: () => {
        props.onSubmit();
        history.push("/projects");
        toast.success("Successfully updated project!");
      },
      onError: () => {
        props.onSubmit();
        toast.error("Failed to update project");
      },
    });
  }
}
