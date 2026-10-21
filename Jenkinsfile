
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

            

            // stage('Install Dependencies') {
            //     steps {
            //         bat '''
            //             node --version
            //             npm --version
            //             call npm ci
            //         '''
            //     }
            // }

            stage('Code Quality') {
                agent {
                    docker {
                        image 'node:18'
                        reuseNode true
                    }
                }
                steps {
                    bat 'call npm run lint'
                }
            }

            stage('Build') {
                agent {
                    docker {
                        image 'node:18'
                        reuseNode true
                    }
                }
                steps {
                    bat 'call npm run build'
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
                agent {
                    docker {
                        image 'node:18'
                        reuseNode true
                    }
                }
                steps {
                    bat '''
                        call npx --yes netlify-cli deploy --dir=dist --prod --site=%NETLIFY_SITE_ID% --no-build
                    '''
                }
            }
        }

        post {
            success {
                echo 'CI/CD pipeline completed successfully.'
                echo 'Frontend deployed to Netlify.'
            }

            failure {
                echo 'Pipeline failed. Check the stage logs.'
            }

            always {
                echo 'Jenkins pipeline execution finished.'
            }
        }
    }
