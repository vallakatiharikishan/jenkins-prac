pipeline {
    agent any

    environment {
        NETLIFY_SITE_ID = '463e5169-59d9-4bf3-b6c4-73468afddc34'
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
        CI = 'true'
    }

    options {
        timestamps()
        disableConcurrentBuilds()
        timeout(time: 20, unit: 'MINUTES')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Docker') {
            steps {
                bat '''
                    docker --version
                    docker info
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                    docker run --rm ^
                      --mount "type=bind,source=%WORKSPACE%,target=/app" ^
                      -w /app node:22 ^
                      npm ci
                '''
            }
        }

        stage('Code Quality') {
            steps {
                bat '''
                    docker run --rm ^
                      --mount "type=bind,source=%WORKSPACE%,target=/app" ^
                      -w /app node:22 ^
                      npm run lint
                '''
            }
        }

        stage('Build') {
            steps {
            bat '''
                if exist dist (
                    rmdir /S /Q dist
                )

                if exist dist (
                    echo ERROR: Could not remove old dist directory
                    exit /b 1
                )

                docker run --rm ^
                --mount "type=bind,source=%WORKSPACE%,target=/app" ^
                -w /app node:22 ^
                npm run build
            '''
            }
        }

        stage('Verify Build Artifact') {
            steps {
                bat '''
                    if not exist dist\\index.html (
                        echo ERROR: dist\\index.html not found
                        exit /b 1
                    )

                    dir dist
                    echo Frontend build verification successful
                '''
            }
        }

        stage('Deploy to Netlify') {
            steps {
                bat '''
                    docker run --rm ^
                      --mount "type=bind,source=%WORKSPACE%,target=/app" ^
                      -e NETLIFY_SITE_ID ^
                      -e NETLIFY_AUTH_TOKEN ^
                      -w /app node:22 ^
                      npx --yes netlify-cli deploy --dir=dist --prod --site=%NETLIFY_SITE_ID% --no-build
                '''
            }
        }


        stage('Playwright Tests') {

                environment {
                    BASE_URL = 'https://boisterous-bombolone-1d9827.netlify.app/'
                }

                steps {
                    bat '''
                        docker run --rm --ipc=host ^
                        --mount "type=bind,source=%WORKSPACE%,target=/app" ^
                        -w /app ^
                        -e BASE_URL=%NETLIFY_SITE_URL% ^
                        mcr.microsoft.com/playwright:v1.56.1-noble ^
                        npx playwright test
                    '''
                }

    }

    post {
        success {
            echo 'CI/CD pipeline completed successfully.'
            echo 'Frontend deployed to Netlify.'
        }

        failure {
            echo 'Pipeline failed. Check the stage logs..'
        }

        always {
            echo 'Jenkins pipeline execution finished..'
        }
    }
}}