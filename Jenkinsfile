pipeline {
    agent any

    environment {
        REGISTRY = "acrtechstorenilesh.azurecr.io"
        IMAGE_NAME = "techstore-fullstack"
    }

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main',
                url: 'https://github.com/NiluJ/Jenkins_DB.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:v1 .'
            }
        }

        stage('Tag Image for ACR') {
            steps {
                sh 'docker tag $IMAGE_NAME:v1 $REGISTRY/$IMAGE_NAME:v1'
            }
        }

        stage('Login to ACR') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'acr-login',
                    usernameVariable: 'ACR_USER',
                    passwordVariable: 'ACR_PASS'
                )]) {
                    sh 'echo $ACR_PASS | docker login $REGISTRY -u $ACR_USER --password-stdin'
                }
            }
        }

        stage('Push Image to ACR') {
            steps {
                sh 'docker push $REGISTRY/$IMAGE_NAME:v1'
            }
        }

    }
}
