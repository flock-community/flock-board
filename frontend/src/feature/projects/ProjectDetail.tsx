import React, { useState, useEffect } from "react";
import { Project } from "../../../target/model/board";
import { DiGithubBadge } from "react-icons/di";
import { GiRoundStar } from "react-icons/gi";
import { makeStyles, Typography } from "@material-ui/core";
import { getRepoData, getPullsData } from "../../clients/github-client";

interface ProjectDetailProps {
  project: Project;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
}));

export function ProjectDetail({ project }: ProjectDetailProps) {
  const classes = useStyles();

  const [repoData, setRepoData] = useState<any>(null);
  const [pullsData, setPullsData] = useState<any>([]);

  useEffect(() => {
    if (project !== null && project.repo) {
      getRepoData(project).then((repoData: any) => {
        setRepoData(repoData);
      });
    }
  }, [project]);

  useEffect(() => {
    if (project !== null && project.repo) {
      getPullsData(project).then((pullsData: any) => {
        console.log(pullsData);
        setPullsData(pullsData);
      });
    }
  }, [project]);

  if (project === null || repoData === null || pullsData === null) return null;

  if (project.repo) {
    const pullRequests = pullsData.filter((pull: any) => pull.state === "open");
    return (
      <div className={classes.root}>
        <Typography variant="body2" component="p">
          <DiGithubBadge />
          <a
            href={`https://github.com/${project.organization}/${project.repo}`}
          >
            {project.organization}/{project.repo}
          </a>
          <br />
          {pullRequests.length} open PR{pullRequests.length === 1 ? "" : "s"},{" "}
          <GiRoundStar />x{repoData.stargazers_count}
        </Typography>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Typography variant="body2" component="p">
          No Github project attached
        </Typography>
      </div>
    );
  }
}
