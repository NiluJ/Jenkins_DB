pipeline {
    agent any

    environment {
        ACR_LOGIN_SERVER = "acrtechstorenilu.azurecr.io"
        IMAGE_TAG = "latest"
        RESOURCE_GROUP = "rg-techstore-nilesh-si"
        CONTAINER_GROUP = "techstore-group"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    docker.build("${ACR_LOGIN_SERVER}/backend:${IMAGE_TAG}", "./backend")
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    docker.build("${ACR_LOGIN_SERVER}/frontend:${IMAGE_TAG}", "./frontend")
                }
            }
        }

        stage('Login to ACR') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'acr-techstore-cred',
                    usernameVariable: 'ACR_USER',
                    passwordVariable: 'ACR_PASS'
                )]) {

                    sh """
                    echo \$ACR_PASS | docker login ${ACR_LOGIN_SERVER} -u \$ACR_USER --password-stdin
                    """
                }
            }
        }

        stage('Push Backend Image') {
            steps {
                sh "docker push ${ACR_LOGIN_SERVER}/backend:${IMAGE_TAG}"
            }
        }

        stage('Push Frontend Image') {
            steps {
                sh "docker push ${ACR_LOGIN_SERVER}/frontend:${IMAGE_TAG}"
            }
        }

        stage('Deploy Multi-Container ACI using YAML') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'acr-techstore-cred',
                    usernameVariable: 'ACR_USER',
                    passwordVariable: 'ACR_PASS'
                )]) {

                    sh """
                    sed -i 's/PASSWORD_PLACEHOLDER/'"\$ACR_PASS"'/g' aci-deployment.yaml

                    az container delete \
                    --resource-group ${RESOURCE_GROUP} \
                    --name ${CONTAINER_GROUP} \
                    --yes || true

                    az container create \
                    --resource-group ${RESOURCE_GROUP} \
                    --file aci-deployment.yaml
                    """
                }
            }
        }

    }
}