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
    }

    stages {
        // ETAPA NUEVA: Instala las herramientas necesarias que no vienen en la imagen base.
        stage('Install Tools') {
            steps {
                echo 'Installing Docker CLI...'
                // Usa el gestor de paquetes de Alpine (apk) para añadir el cliente de Docker.
                sh 'apk add --no-cache docker-cli'
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

        // ETAPA CORREGIDA Y OPTIMIZADA
        stage('Build and Push Docker Image') {
            steps {
                script {
                    docker.withRegistry(registry, registryCredentials) {
                        // Construye la imagen directamente con el nombre completo y la etiqueta del build number.
                        def customImage = docker.build("${fullImageName}:${BUILD_NUMBER}", ".")

                        // Sube la imagen con la etiqueta del build number.
                        customImage.push()

                        // Agrega la etiqueta 'latest' a la imagen ya subida y la empuja al registry.
                        customImage.push('latest')
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                // Limpia las imágenes locales para ahorrar espacio.
                // El '|| true' evita que el pipeline falle si la imagen no existe.
                echo 'Cleaning up local Docker images...'
                sh "docker rmi -f ${fullImageName}:${BUILD_NUMBER} || true"
                sh "docker rmi -f ${fullImageName}:latest || true"
            }
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}