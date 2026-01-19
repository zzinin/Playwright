pipeline {
    agent any

    triggers {
        githubPush()
        githubPullRequest()
    }

    stages {

        stage('Test') {
            steps {
                echo "Triggered by GitHub"
            }
        }

        stage('Build') {
            steps {
                echo "Building the project"
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying the project"
            }
        }

        stage('Notify') {
            steps {
                echo "Notifying stakeholders"
            }
        }

        stage('Cleanup') {
            steps {
                echo "Cleaning up resources"
            }
        }

        stage('Report') {
            steps {
                echo "Generating report"
            }
        }

        stage('Archive') {
            steps {
                echo "Archiving artifacts"
            }
        }

        stage('Analyze') {
            steps {
                echo "Analyzing results"
            }
        }

        stage('Document') {
            steps {
                echo "Documenting the process"
            }
        }
    }
}