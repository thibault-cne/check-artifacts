import * as core from '@actions/core'
import { DefaultArtifactClient } from '@actions/artifact'

export async function run(): Promise<void> {
  try {
    // Retrieve the inputs
    const token = core.getInput('token', { required: true })
    const owner = core.getInput('owner', { required: true })
    const repo = core.getInput('repo', { required: true })
    const name = core.getInput('name', { required: true })
    const run_id = core.getInput('run_id', { required: true })

    // Query the github API
    const findBy = {
      token,
      repositoryOwner: owner,
      repositoryName: repo,
      workflowRunId: parseInt(run_id)
    }

    const artifact = new DefaultArtifactClient()

    try {
      await artifact.getArtifact(name, { findBy })
      core.setOutput('artifact_exists', true)
    } catch (error) {
      core.setOutput('artifact_exists', false)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
