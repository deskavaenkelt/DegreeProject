# DegreeProject

## Table of Contents

- [Project Plan](#project-plan)
    - [Purpose](#purpose)
    - [Problem formulation](#problem-formulation)
    - [Method](#method)
- [Problem solving](#problem-solving)
- [](#)

# Project Plan

## Purpose

My idea is to create a full stack project with the MERN stack (MongoDB, Express.JS, React, NodeJS), written in
TypeScript which will then be entered into a CI/CD flow. Docker will be used to run the entire application in containers
that can be easily updated and scaled up and down as needed. This also places demands on a proper construction
environment as TypeScript must be compiled down to JavaScript before it can be used.

It would also be good if you could create a setup script that can be run to set up the environment for new developers, a
so-called on-boarding script that solves environmental variables and which starts up a development database for the
project.

The idea is to work according to DevOps principles where a project is taken from start with coding in development to
production operation.

## Problem formulation

As DevOps is defined differently depending on whom you ask and which company you come to, I take into account the
definition “a developer who can put the code it produces in a pipeline so that the code can be tested before the code
goes into operation and thus the developer takes responsibility for the code it produced ”.

The reason why I want to take this focus is because it fits well with my background in full stack development (web
development). It is also the usual path that code takes from start to finish when working according to DevOp's
principles according to the context I have chosen.

The problem that will be solved is to develop a standard web application from the ground up and put it into operation in
sharp mode.

## Method

I will start by developing the application locally on my computer, where a simple skeleton is built to then add Docker
functionality with Docker files and Docker-Compose. When everything Docker related works on a clean project, the work
will continue to create the application and write tests that will be needed for later steps in the CI flow. For example,
the TypeScript compilation to JavaScript must work before there is any idea to even try to develop the application.

When the foundation is laid with a few simple tests on the frontend and backend, the CI / CD chain will be built.

When there is then a flow all the way from code to test's that can be published online, the application itself with all
the functionality will be built.

Backend will have full API tests on all functionality to ensure quality before Frontend can be implemented. Frontend
will have some unit tests as well as function tests to, for example, verify login.

# Problem solving

## Step 1 - Foundation 

1. Create new GitHub project `DegreeProject`
2. Add .gitignore
3. Create React Frontend with TypeScript
    - `npx create-react-app client --template typescript`
    - Added libraries as needed
4. Create Server (API) with Express and TypeScript
    - `npm init --yes`
    - `npm i express && npm i --save-dev typescript ts-node-dev @types/express @types/node`
    - Added more libraries as needed
5. Create a simple Rest-endpoint that will respond on a port that the server is up and running. Then connect to the server via React frontend and verify on both sides:
   - `npm run build`
   - `npm test`
   - `npm start`
6. Create Docker files for backend and frontend to get the two containers to talk to each other.
   - One file for development environment
   - One file for production environment
   - Docker-compose for both:
       - Development `docker-compose -f docker-compose.dev.yml up`
       - Production `docker-compose -f docker-compose.prod.yml up`
       - If a rebuild is needed, add `--build` to the command
7. Refactor the docker-compose files to use best practices and to be more readable.

### Start commands

- Build: `npm run build`
- Start server: `npm start`
- Run tests: `npm test`


## Getting started Script

Run the script in the folder where the project should locate. 

```shell
curl -o gettingStartedScript.sh https://raw.githubusercontent.com/deskavaenkelt/DegreeProject/main/gettingStartedScript.sh
sh gettingStartedScript.sh
```
