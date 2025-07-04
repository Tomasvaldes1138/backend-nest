pipeline {
    agent any
    
    environment {
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
        dockerImagePrefix = "us-west1-docker.pkg.dev/lab-agibiz/docker-repository"
        registry = "https://us-west1-docker.pkg.dev"
        registryCredentials = 'gcp-registry'
    }
    
    stages {
        stage('Build and Push Docker Image') {
            steps {
                script {
                    docker.withRegistry("${registry}", registryCredentials) {
                        sh "docker build -t backend-nest-test-tvb ."
                        sh "docker tag backend-nest-test-tvb:latest ${dockerImagePrefix}/backend-nest-test-tvb"
                        sh "docker push ${dockerImagePrefix}/backend-nest-test-tvb"
                    }
                }
            }
        }
    }
}
