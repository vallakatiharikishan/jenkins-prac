pipeline {
    agent any

    environment {
        IMAGE_NAME = 'tasktrack'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$BUILD_NUMBER .'
            }
        }

        stage('Verify Docker image') {
            steps {
                sh 'docker run --rm --entrypoint sh $IMAGE_NAME:$BUILD_NUMBER -c "test -s /usr/share/nginx/html/index.html"'
            }
        }
    }
}
