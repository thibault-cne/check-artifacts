"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const artifact_1 = require("@actions/artifact");
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
    const artifact = new artifact_1.DefaultArtifactClient();
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
}
catch (error) {
    core.setFailed(error.message);
}
