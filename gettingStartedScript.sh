#!/bin/sh

# Check if git is installed, if not install it for Linux, Mac OS and Windows
if [ -z "$(which git)" ]; then
    echo "Git is not installed, installing it now."
    if [ "$(uname -s)" == "Darwin" ]; then
        brew install git
    elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
        sudo apt-get install git
    elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
        echo "Windows not supported yet."
    fi
fi

# Check if node is installed, if not install it for Linux, Mac OS and Windows
if [ -z "$(which node)" ]; then
    echo "Node is not installed, installing it now."
    if [ "$(uname -s)" == "Darwin" ]; then
        brew install node
    elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
        sudo apt-get install node
    elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
        echo "Windows not supported yet."
    fi
fi

# Check if docker is installed, if not install it for Linux, Mac OS and Windows
if [ -z "$(which docker)" ]; then
    echo "Docker is not installed, installing it now."
    if [ "$(uname -s)" == "Darwin" ]; then
        brew cask install docker
    elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
        sudo apt-get install docker.io
    elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
        echo "Windows not supported yet."
    fi
fi

# Check if docker-compose is installed, if not install it for Linux, Mac OS and Windows
if [ -z "$(which docker-compose)" ]; then
    echo "Docker-compose is not installed, installing it now."
    if [ "$(uname -s)" == "Darwin" ]; then
        brew install docker-compose
    elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
      sudo curl -L "https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
      sudo chmod +x /usr/local/bin/docker-compose
    elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
        echo "Windows not supported yet."
      fi
fi

# Clone the repository
git clone https://github.com/deskavaenkelt/DegreeProject.git

# Go into the repository
cd DegreeProject

# Setup the server environment
cd server
cp .env_template .env
npm install
cd ..

# Setup the client environment
cd client
cp .env_template .env
npm install
cd ..

# echo server start commands
echo "To start the server run the following command:"
echo "cd server"
echo "npm start"
echo "npm test"
echo "npm build"
echo ""

# echo client start commands
echo "To start the client run the following command:"
echo "cd client"
echo "npm start"
echo "npm test"
echo "npm build"
echo ""

# echo docker commands
echo "To start the docker run the following command:"
echo "docker-compose up"
echo "docker-compose up -d"
echo "docker-compose down"

echo "docker-compose up -d --build  # Force rebuild the images"
echo ""
echo "docker-compose -f docker-compose.dev.yml up --build    # Force rebuild the images"
echo "docker-compose -f docker-compose.prod.yml up --build    # Force rebuild the images"
