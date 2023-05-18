pipeline {
    agent {
        label 'kubernetes-docker-agent'
    }

    stages {
        stage('Create kube config file') {
            steps {
                withCredentials([vaultString(credentialsId: 'vault-kube-base64-config', variable: 'KUBECONFIG')]) {
                    writeFile file: 'config64', text: "$KUBECONFIG"
                }
                sh 'base64 --decode config64 > config && chmod 400 config && rm config64'
            }
        }

        stage('Run command') {
            steps {
                sh 'helm upgrade --install --kubeconfig config hello-greeter-k8s-fe-release hello-greeter-k8s-fe/'
            }
        }
    }
}
