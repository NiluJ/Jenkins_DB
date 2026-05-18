pipeline {
    agent any

    environment {
        APP_NAME = "uat-backend"
        APP_PORT = "5002"
    }

    stages {

        stage('Checkout Repository') {
            steps {
                git branch: 'uat',
                url: 'https://github.com/NiluJ/Jenkins_DB.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Create Environment File') {
            steps {
                dir('backend') {
                    sh '''
                    cat > .env <<EOF
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Masterchief@117
DB_NAME=techstoredb
DB_PORT=3306
PORT=5002
EOF
                    '''
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

        stage('Copy Frontend Build') {
            steps {
                sh 'rm -rf backend/dist'
                sh 'cp -r frontend/dist backend/'
            }
        }

        stage('Restart PM2 Application') {
            steps {
                dir('backend') {
                    sh '''
                    pm2 restart uat-backend --update-env || pm2 start server.js --name uat-backend
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "UAT Deployment Successful!"
        }

        failure {
            echo "UAT Deployment Failed!"
        }
    }
}
