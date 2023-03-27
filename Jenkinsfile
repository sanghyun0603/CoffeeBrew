pipeline {
    agent any
    options {
        timeout(time: 1, unit: 'HOURS')
    }
    environment {
        SOURCECODE_JENKINS_CREDENTIAL_ID = 'user_donghun'
        SOURCE_CODE_URL = 'https://lab.ssafy.com/s08-bigdata-recom-sub2/S08P22B305.git'
        RELEASE_BRANCH = 'release-client'
    }
    stages {

        stage('clone') {
            steps {
                git url: "$SOURCE_CODE_URL",
                    branch: "$RELEASE_BRANCH",
                    credentialsId: "$SOURCECODE_JENKINS_CREDENTIAL_ID"
                sh "ls -al"
            }
        }

        stage('frontend dockerizing') {
            steps {
                sh "pwd"
                sh "docker build -t client ./client"
            }
        }

		stage('Deploy') {
            steps{
                sh "pwd"
                sh "docker stop workspace-client-1"
                sh "docker rm workspace-client-1"
                sh "docker-compose up -f docker-compose-client.yml -d --build"
                sh "docker-compose ps"
            }
            post {
                success {
                    echo "docker-compose success"
                }

                failure {
                    echo "docker-compose failed"
                }
            }		
        }
    }
}
