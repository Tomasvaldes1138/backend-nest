pipeline {
    agent {
        docker {
            image 'node:22-alpine'
            args '-u root -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    environment {
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
        fullImageName = "us-west1-docker.pkg.dev/lab-agibiz/docker-repository/backend-nest-test-tvb"
        registry = "https://us-west1-docker.pkg.dev"
        registryCredentials = 'gcp-registry'
        K8S_DEPLOYMENT_NAME = 'backend-nest-test-tvb'
        K8S_CONTAINER_NAME = 'backend-nest-test-tvb'
    }

    stages {
        stage('Install Tools') {
            steps {
                echo 'Installing tools...'
                sh 'apk add --no-cache docker-cli kubectl'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm ci --cache ${NPM_CONFIG_CACHE}'
            }
        }

        stage('Testing') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                echo 'Building application...'
                sh 'npm run build'
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                script {
                    docker.withRegistry(registry, registryCredentials) {
                        def customImage = docker.build("${fullImageName}:${BUILD_NUMBER}", ".")
                        customImage.push()
                        customImage.push('latest')
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            agent {
                docker {
                    image 'alpine/k8s:1.30.2'
                    reuseNode true
                }
                steps {
                    withKubeConfig([credentialsId: 'gcp-kubeconfig']){
                        sh 'kubectl -n lab-tvb set image deployments/backend-nest-test-tvb backend-nest-test-tvb=${fullImageName}:${BUILD_NUMBER}'
                    }
                }
            }
        }
    }
}
