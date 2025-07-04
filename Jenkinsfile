pipeline {
    agent any
   
    environment {
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
        dockerImagePrefix = "us-west1-docker.pkg.dev/lab-agibiz/docker-repository"
        registry = "https://us-west1-docker.pkg.dev"
        registryCredentials = 'gcp-registry'
        imageName = "backend-nest-test-tvb"
    }
   
    stages {
        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node:22-alpine'
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                script {
                    echo 'Installing dependencies...'
                    sh 'npm ci --cache ${NPM_CONFIG_CACHE}'
                }
            }
        }
       
        stage('Testing') {
            agent {
                docker {
                    image 'node:22-alpine'
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                script {
                    echo 'Running tests...'
                    sh 'npm test'
                }
            }
        }
       
        stage('Build') {
            agent {
                docker {
                    image 'node:22-alpine'
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                script {
                    echo 'Building application...'
                    sh 'npm run build'
                }
            }
        }
       
        stage('Build and Push Docker Image') {
            steps {
                script {
                    docker.withRegistry("${registry}", registryCredentials) {
                        // Construir la imagen
                        def dockerImage = docker.build("${imageName}:${BUILD_NUMBER}")
                       
                        // Tag con latest
                        sh "docker tag ${imageName}:${BUILD_NUMBER} ${dockerImagePrefix}/${imageName}:latest"
                       
                        // Tag con build number
                        sh "docker tag ${imageName}:${BUILD_NUMBER} ${dockerImagePrefix}/${imageName}:${BUILD_NUMBER}"
                       
                        // Push ambas versiones
                        sh "docker push ${dockerImagePrefix}/${imageName}:latest"
                        sh "docker push ${dockerImagePrefix}/${imageName}:${BUILD_NUMBER}"
                    }
                }
            }
        }
    }
   
    post {
        always {
            // Limpiar imágenes locales para ahorrar espacio
            sh "docker rmi -f ${imageName}:${BUILD_NUMBER} || true"
            sh "docker rmi -f ${dockerImagePrefix}/${imageName}:latest || true"
            sh "docker rmi -f ${dockerImagePrefix}/${imageName}:${BUILD_NUMBER} || true"
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}