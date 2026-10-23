
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

            post {
                always {
                    archiveArtifacts artifacts: 'playwright-report/**, test-results/**',
                                     allowEmptyArchive: true
                }
            }
        }
