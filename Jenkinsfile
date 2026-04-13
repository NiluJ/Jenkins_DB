pipeline {
    agent any

    environment {
        REGISTRY = "acrtechstorenilesh.azurecr.io"
        IMAGE_NAME = "techstore-fullstack"

        RESOURCE_GROUP = "rg-techstore-nilesh-dev-si"
        CONTAINER_NAME = "aci-techstore-nilesh"
        DNS_NAME = "techstore-nilesh-demo"
        LOCATION = "southindia"

        SUBSCRIPTION_ID = "889f4edd-a43f-49a6-becc-8f38e3367cde"
        TENANT_ID = "370f9669-1831-4407-b8b1-0aceb88125c8"
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
                sh '''
                docker build -t $IMAGE_NAME:v1 .
                '''
            }
        }

        stage('Tag Image for ACR') {
            steps {
                sh '''
                docker tag $IMAGE_NAME:v1 $REGISTRY/$IMAGE_NAME:v1
                '''
            }
        }

        stage('Login to ACR') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'acr-login',
                    usernameVariable: 'ACR_USER',
                    passwordVariable: 'ACR_PASS'
                )]) {
                    sh '''
                    echo $ACR_PASS | docker login $REGISTRY \
                    -u $ACR_USER \
                    --password-stdin
                    '''
                }
            }
        }

        stage('Delete Old Image From ACR') {
            steps {
                sh '''
                az acr repository delete \
                --name acrtechstorenilesh \
                --image techstore-fullstack:v1 \
                --yes || true
                '''
            }
        }

        stage('Push Image to ACR') {
            steps {
                sh '''
                docker push $REGISTRY/$IMAGE_NAME:v1
                '''
            }
        }

        stage('Azure Login using Service Principal') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'azure-sp-login',
                    usernameVariable: 'AZURE_CLIENT_ID',
                    passwordVariable: 'AZURE_CLIENT_SECRET'
                )]) {
                    sh '''
                    az login \
                    --service-principal \
                    --username $AZURE_CLIENT_ID \
                    --password $AZURE_CLIENT_SECRET \
                    --tenant $TENANT_ID

                    az account set \
                    --subscription $SUBSCRIPTION_ID
                    '''
                }
            }
        }

        stage('Delete Previous ACI Container') {
            steps {
                sh '''
                az container delete \
                --resource-group $RESOURCE_GROUP \
                --name $CONTAINER_NAME \
                --yes || true
                '''
            }
        }

        stage('Deploy New Container to ACI') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'acr-login',
                    usernameVariable: 'ACR_USER',
                    passwordVariable: 'ACR_PASS'
                )]) {
                    sh '''
                    az container create \
                    --resource-group $RESOURCE_GROUP \
                    --name $CONTAINER_NAME \
                    --image $REGISTRY/$IMAGE_NAME:v1 \
                    --registry-login-server $REGISTRY \
                    --registry-username $ACR_USER \
                    --registry-password $ACR_PASS \
                    --dns-name-label $DNS_NAME \
                    --ports 5000 \
                    --os-type Linux \
                    --cpu 1 \
                    --memory 2 \
                    --environment-variables \
                    DB_HOST=20.193.134.208 \
                    DB_USER=root \
                    DB_PASSWORD=Masterchief@117 \
                    DB_NAME=techstoredb \
                    DB_PORT=3306 \
                    --location $LOCATION
                    '''
                }
            }
        }

        stage('Print Application URL') {
            steps {
                echo "Deployment Successful!"
                echo "Application URL:"
                echo "http://techstore-nilesh-demo.southindia.azurecontainer.io:5000"
            }
        }

    }
}
