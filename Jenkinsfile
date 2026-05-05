pipeline {
    agent any

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
                    sh 'pm2 delete uat-backend || true'
                    sh 'PORT=5002 pm2 start server.js --name uat-backend'
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
                sh 'sudo mkdir -p /var/www/html/uat'
                sh 'sudo rm -rf /var/www/html/uat/*'
                sh 'sudo cp -r frontend/dist/* /var/www/html/uat/'
                sh 'sudo systemctl restart nginx'
            }
        }
    }
}
