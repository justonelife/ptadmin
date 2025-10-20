const { execSync } = require("child_process");
const { readFileSync } = require("fs");
const path = require("path");

console.log("Reading projects from angular.json...");

// Read and parse angular.json
const angularJsonPath = path.resolve(__dirname, "../angular.json");
const angularJson = JSON.parse(readFileSync(angularJsonPath));
const projects = Object.keys(angularJson.projects);

// Filter for projects that actually have a 'test' architect target
const testableProjects = projects.filter(
  (p) => angularJson.projects[p].architect?.test
);

if (testableProjects.length === 0) {
  console.log("No testable projects found. Exiting.");
  process.exit(0);
}

console.log(`Found ${testableProjects.length} testable projects.`);

// Run tests for each project
for (const project of testableProjects) {
  console.log(`\n\n===== Running tests for: ${project} =====\n`);
  try {
    // We use --watch=false and --browsers=ChromeHeadless for CI/automation
    execSync(`ng test ${project} --watch=false --browsers=ChromeHeadless`, {
      stdio: "inherit",
    });
  } catch (err) {
    console.error(`\n\n===== Tests FAILED for: ${project} =====\n`);
    process.exit(1); // Exit with an error code to fail the CI/CD pipeline
  }
  console.log(`\n===== Tests PASSED for: ${project} =====\n`);
}

console.log("\n\nAll tests passed successfully! 🎉");
