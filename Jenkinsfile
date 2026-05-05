pipeline {
    agent any

    environment {
        APP_NAME = "uat-backend"
        APP_PORT = "5002"
        DEPLOY_PATH = "/var/www/html/uat"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'uat', url: 'https://github.com/NiluJ/Jenkins_DB.git'
            }
        }

        stage('Install Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Start Backend') {
            steps {
                dir('backend') {
                    sh "pm2 delete ${APP_NAME} || true"
                    sh "PORT=${APP_PORT} pm2 start server.js --name ${APP_NAME}"
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh """
                sudo mkdir -p ${DEPLOY_PATH}
                sudo rm -rf ${DEPLOY_PATH}/*
                sudo cp -r frontend/dist/* ${DEPLOY_PATH}/
                sudo systemctl restart nginx
                """
            }
        }
    }

    post {
        success {
            echo "✅ UAT Deployment Successful!"
        }
        failure {
            echo "❌ UAT Deployment Failed!"
        }
    }
}
