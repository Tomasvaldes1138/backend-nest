pipeline {
    agent {
        docker {
            image 'node:22-alpine'
            args '-v /var/run/docker.sock:/var/run/docker.sock -v /opt/sa-registry.json:/opt/sa-registry.json'
        }
    }
    
    environment {
        PROJECT_NAME = 'backend-nest-test-tvb'  
        GOOGLE_PROJECT_ID = 'lab-agibiz'
        GOOGLE_REGISTRY = 'us-west1-docker.pkg.dev'
        
        // Ruta del archivo de credenciales
        GOOGLE_SA_KEY = '/opt/sa-registry.json'
        
        // Variables dinámicas
        IMAGE_TAG = "${BUILD_NUMBER}"
        FULL_IMAGE_NAME = "${GOOGLE_REGISTRY}/${GOOGLE_PROJECT_ID}/${PROJECT_NAME}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Instalación de Dependencias') {
            steps {
                script {
                    echo "Instalando dependencias de Node.js..."
                    sh '''
                        node --version
                        npm --version
                        npm ci --only=production
                    '''
                }
            }
        }
        
        stage('Testing') {
            steps {
                script {
                    echo "Ejecutando pruebas..."
                    sh '''
                        npm install --dev
                        npm run test
                        npm run test:e2e
                    '''
                }
            }
            post {
                always {
                    script {
                        if (fileExists('test-results.xml')) {
                            publishTestResults testResultsPattern: 'test-results.xml'
                        }
                        if (fileExists('coverage/index.html')) {
                            publishHTML([
                                allowMissing: false,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: 'coverage',
                                reportFiles: 'index.html',
                                reportName: 'Coverage Report'
                            ])
                        }
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    echo "Construyendo la aplicación..."
                    sh '''
                        npm run build
                    '''
                }
            }
        }
        
        stage('Construcción de Imagen Docker') {
            steps {
                script {
                    echo "Construyendo imagen Docker: ${PROJECT_NAME}:${IMAGE_TAG}"
                    sh '''
                        docker build -t ${PROJECT_NAME}:${IMAGE_TAG} .
                        docker tag ${PROJECT_NAME}:${IMAGE_TAG} ${FULL_IMAGE_NAME}:${IMAGE_TAG}
                        docker tag ${PROJECT_NAME}:${IMAGE_TAG} ${FULL_IMAGE_NAME}:latest
                    '''
                }
            }
        }
        
        stage('Autenticación Google Artifact Registry') {
            steps {
                script {
                    echo "Configurando autenticación con Google Artifact Registry..."
                    sh '''
                        # Verificar que el archivo de credenciales existe
                        if [ ! -f "${GOOGLE_SA_KEY}" ]; then
                            echo "Error: No se encontró el archivo de credenciales en ${GOOGLE_SA_KEY}"
                            exit 1
                        fi
                        
                        echo "Archivo de credenciales encontrado: ${GOOGLE_SA_KEY}"
                        
                        # Autenticación directa con Docker usando el service account JSON
                        cat "${GOOGLE_SA_KEY}" | docker login -u _json_key --password-stdin https://${GOOGLE_REGISTRY}
                        
                        if [ $? -eq 0 ]; then
                            echo "Autenticación exitosa con Artifact Registry"
                        else
                            echo "Error en la autenticación con Artifact Registry"
                            exit 1
                        fi
                        
                        # Verificar configuración
                        echo "Registry configurado: ${GOOGLE_REGISTRY}"
                        echo "Proyecto: ${GOOGLE_PROJECT_ID}"
                        echo "Imagen completa: ${FULL_IMAGE_NAME}"
                    '''
                }
            }
        }
        
        stage('Upload Imagen - Tag Latest') {
            steps {
                script {
                    echo "Subiendo imagen con tag latest al Artifact Registry..."
                    echo "Imagen: ${FULL_IMAGE_NAME}:latest"
                    sh '''
                        # Verificar que la imagen existe localmente
                        docker images ${FULL_IMAGE_NAME}:latest
                        
                        # Subir imagen con tag latest
                        docker push ${FULL_IMAGE_NAME}:latest
                        
                        if [ $? -eq 0 ]; then
                            echo "Imagen subida exitosamente: ${FULL_IMAGE_NAME}:latest"
                        else
                            echo "Error subiendo imagen: ${FULL_IMAGE_NAME}:latest"
                            exit 1
                        fi
                    '''
                }
            }
        }
        
        stage('Upload Imagen - Tag Build Number') {
            steps {
                script {
                    echo "Subiendo imagen con tag ${BUILD_NUMBER} al Artifact Registry..."
                    echo "Imagen: ${FULL_IMAGE_NAME}:${IMAGE_TAG}"
                    sh '''
                        # Verificar que la imagen existe localmente
                        docker images ${FULL_IMAGE_NAME}:${IMAGE_TAG}
                        
                        # Subir imagen con tag del build number
                        docker push ${FULL_IMAGE_NAME}:${IMAGE_TAG}
                        
                        if [ $? -eq 0 ]; then
                            echo "Imagen subida exitosamente: ${FULL_IMAGE_NAME}:${IMAGE_TAG}"
                            echo "BUILD COMPLETADO HASTA EL PUNTO H"
                        else
                            echo "Error subiendo imagen: ${FULL_IMAGE_NAME}:${IMAGE_TAG}"
                            exit 1
                        fi
                    '''
                }
            }
        }
    }
    
    post {
        always {
            script {
                // Limpiar imágenes locales para ahorrar espacio
                sh '''
                    docker rmi ${PROJECT_NAME}:${IMAGE_TAG} || true
                    docker rmi ${FULL_IMAGE_NAME}:${IMAGE_TAG} || true
                    docker rmi ${FULL_IMAGE_NAME}:latest || true
                '''
            }
        }
        
        success {
            echo "Pipeline ejecutado exitosamente hasta el punto H! 🎉"
            echo "Imagen desplegada: ${FULL_IMAGE_NAME}:${IMAGE_TAG}"
            echo "Imagen latest: ${FULL_IMAGE_NAME}:latest"
        }
        
        failure {
            echo "Pipeline falló"
            echo "Revisar logs para identificar el problema"
        }
        
        cleanup {
            // Limpieza del workspace
            cleanWs()
        }
    }
}