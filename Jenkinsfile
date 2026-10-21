
pipeline {
    agent any

    environment {
        IMAGE_NAME = 'tasktrack'
        NETLIFY_SITE_ID = '463e5169-59d9-4bf3-b6c4-73468afddc34'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                bat 'docker version'
                bat 'docker build -t %IMAGE_NAME%:%BUILD_NUMBER% .'
            }
        }

        stage('Verify Docker Image') {
            steps {
                bat 'docker run --rm --entrypoint sh %IMAGE_NAME%:%BUILD_NUMBER% -c "test -s /usr/share/nginx/html/index.html"'
            }
        }        
      
        stage('Deploy') {
            steps {
                bat '''
                    call npx --yes netlify-cli --version
                    echo "Deploying to production. Site ID: %NETLIFY_SITE_ID%"
                '''
            }
        }


    }

    post {
        success {
            echo 'Docker image built and verified successfully!'
        }
        failure {
            echo 'Pipeline failed. Check Console Output.'
        }
    }
}
