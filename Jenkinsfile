pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        echo 'Building...'
      }
    }
    stage('Test') {
      steps {
        echo 'Testing...'
      }
    }
    stage('Building Docker Images') {
      steps {
        echo 'Building docker images...'
        sh "cd frontend && docker build -t anory-frontend:1.0 ."
        sh "cd backend && docker build -t anory-backend:1.0 ."
        sh "cd proxy && docker build -t anory-proxy:1.0 ."
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploying...'
      }
    }
  }
}