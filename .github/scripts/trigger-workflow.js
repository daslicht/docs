const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
    auth: process.env.PERSONAL_ACCESS_TOKEN,
});

async function triggerWorkflow() {
    try {
        const response = await octokit.rest.actions.createWorkflowDispatch({
            owner: 'shopware',
            repo: 'developer-portal',
            ref: `main`,
            workflow_id: process.env.WORKFLOW,
            inputs: process.env.WORKFLOW === 'checkout-test-build-deploy.yml'
                ? {}
                : {
                branch: process.env.DEV_HUB_BRANCH,
                repo: process.env.DEV_HUB_REPO,
                sha: process.env.DEV_HUB_SHA,
                check: process.env.CHECK_ID,
            },
        });

        console.log("Workflow triggered successfully:", response.data);
    } catch (error) {
        console.error("Error triggering workflow:", error.message, error);
    }
}

triggerWorkflow();