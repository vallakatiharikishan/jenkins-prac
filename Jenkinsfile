
pipeline {
    agent any

    environment {
        IMAGE_NAME = 'tasktrack'
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
