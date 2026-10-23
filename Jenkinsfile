pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy to Netlify') {
            steps {
                echo 'Deploy your application here'
            }
        }

        stage('Playwright Tests') {
            environment {
                BASE_URL = 'https://boisterous-bombolone-1d9827.netlify.app'
            }

            steps {
                bat '''
                    docker run --rm --ipc=host ^
                      --mount "type=bind,source=%WORKSPACE%,target=/app" ^
                      -w /app ^
                      -e BASE_URL ^
                      mcr.microsoft.com/playwright:v1.56.1-noble ^
                      npx playwright test
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Check the logs.'
        }
    }
}