import * as core from "@actions/core";
import { DefaultArtifactClient } from "@actions/artifact";

try {
  // Retrieve the inputs
  const token = core.getInput("token", { required: true });
  const owner = core.getInput("owner", { required: true });
  const repo = core.getInput("repo", { required: true });
  const name = core.getInput("name", { required: true });
  const run_id = core.getInput("run_id", { required: true });

  // Query the github API
  const findBy = {
    token,
    repositoryOwner: owner,
    repositoryName: repo,
    workflowRunId: parseInt(run_id),
  };

  const artifact = new DefaultArtifactClient();

  artifact
    .getArtifact(name, { findBy })
    .then(() => {
      // Set the output to true
      core.setOutput("artifact_exists", true);
    })
    .catch(() => {
      // Set the output to false
      core.setOutput("artifact_exists", false);
    });
} catch (error: any) {
  core.setFailed(error.message);
}
