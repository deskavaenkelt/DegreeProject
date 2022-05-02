# Step by Step to Azure DevOps

## Table of Contents

- [DegreeProject](#degreeproject)

## Azure

## Azure DevOps

### GitHub Connection (Boards)

1. Connect to my GitHub account.
2. Click on the **Project Settings** tab.
3. Boards
4. Connect your GitHub account to your Azure DevOps account. 
5. Search for the **DegreeProject**.
6. Save
7. Confirm Access to GitHub account
8. Click Approve and install button

### GitHub Connection (Service Connections)

1. Connect to my GitHub account.
2. Click on the **Project Settings** tab.
3. Pipelines
4. Service Connections
5. Create Service Connection
6. GitHub
7. 



### Import GitHub Repository

1. Click on Repos in the left menu.
2. Click on **DegreeProject.git** and **Import Repository**.
3. Select **DegreeProject** and click **Import**.

### Create a new pipeline



## Azure

1. Create a Azure account

2. Create a Storage Account
    - Resource group: devopsAzureCourse
    - Location: Sweden Central
    - Subscription: Subscription09
    - Performance: Standard
    - Replication: Read-access geo-redundant storage (RA-GRS)
    - Account kind: StorageV2 (general purpose v2)

3. Create a Container registry
    - Resource group: devopsAzureCourse
    - Location: Sweden Central
    - Subscription: Subscription09
    - Login server: devopscourseregistrylars.azurecr.io

4. Create Access keys
    - Enable Admin user
    - Copy credentials

5. Repository's

## Azure DevOps

1. Creat new Project
    - Project name: DegreeProject
    - Description: My examination Project
    - Visibility: Private
    - Advanced =>
        - Version control: Git
        - Work item process: Agile
    - Create

2. Create a repository and upload files

## Configure the CI Pipeline

1. Create a Service connection
    1. Connection to repository
        - Azure Resource Manager
        - Service principal (automatic)
        - Scope level: Subscription
        - Subscription: Subscription9
        - Resource group: devopsAzureCourse
        - Service connection name: devops-course-service-connection
        - Security: [x] Grant access permission to all pipelines
        - Save
    2. Connection to Docker Registry
        - Docker Registry
        - Registry type: Azure Container Registry
        - Subscription: Subscription9
        - Azure container registry: devopscourceregistrylars
        - Service connection name: devops-azure-container-registry-connection
        - Security: [x] Grant access permission to all pipelines
        - Save

2. Pipelines (Classic Automated)
    - Create Pipeline
    - Use the classic editor to create a pipeline without YAML.
    - Source: Azure Repos Git
    - Team project: DevOpsCourse
    - Repository: DevOpsCourse
    - Default Branch: development
    - Template: Others: ASP.NET Core
    - Save & Queue
    - Save commit: DevOps-build-process
    - save and run

3. Push Docker image to Azure Container Registry
    - Click on Pipelines
    - Edit Pipeline: `DevOpsCourse-ASP.NET Core-CI`
    - Add new task on `Agent job 1`
    - Search for `Docker` choose `Docker - Build and push` then `Add`
    - Click on `buildAndPush`
        - Display name: buildAndPush
        - Container registry: devops-azure-container-registry-connection
        - Container repository: devops-course-repository
        - Dockerfile: Browse for the correct Dockerfile
        - Tags: Change to `latest`
        - Save and Queue
        - Save comment: docker push
        - Save and run
    - Go to Azure Container Registry
    - Click on `Repositories`
    - Click on `devopscourceregistrylars`
    - Click on `devops-course-repository`
    - Click on `latest`
    - Docker pull command: `docker pull devopscourceregistrylars.azurecr.io/devops-course-repository:latest`

4. Create Azure App Service (Manual deployment)
    - Click on `Microsoft Azure` in top left
    - Click on `All Services`
    - Click on `App Service`
    - Click on `Create App Service` or `Create`
        - Subscription: Subscription9
        - Resource group: new `devops-linux-appservices`
        - Name: `devops-course-webapp-test-lars`
        - Publish: `Docker Container`
        - Operating system: `Linux`
        - Region: `North Europe`
        - Linux Plan (North Europe): `ASP-devopslinuxappservices-aa0c (F1)`
        - Sku and size: Change size
            - Dev/Test
            - F1 `Free`
            - Apply
        - Next: Docker >
        - Docker
            - Options: `Singe Container`
            - Image Source: `Azure Container Registry`
            - Registry: `devopscourseregistrylars`
            - Image: `devops-course-repository`
            - Tag: `latest`
            - Startup Command: `docker run -p 80:80 -d devops-course-repository:latest`
        - Next: Monitoring > Nothing
        - Next: Tags > Nothing
        - Review and create > Create
    - Go to resource
        - Deployment Center
        - Continuous deployment: `on`
        - Startup File: remove `latest` the tag is used on the `Tag` field above
        - Save
    - Go to Overview
        - Click on url: server should be up and running after a while.

5. Create YAML-file
    - Go to Project settings in Azure DevOps
        - Click on Service connections
        - Click on `devops-azure-container-registry-connection` then copy name and paste in the YAML-file on
          key `dockerRegistryServiceConnection`
    - Go to Azure
        - Click on Container Registry Name `devopscourseregistrylars`
        - Click on Repositories `devops-course-repository`
        - Copy the name and paste in the YAML-file on key `imageRepository`
    - Go to Project settings in Azure DevOps
        - Click on Service connections
        - Click on New service connection
        - Click on `Azure Resource Manager`
        - Click on `Service Principal (automatic)`
        - Subscription: Subscription9
        - Resource group: `devops-linux-appservices` (from resource group in Azure App Service for
          devops-course-webapp-test-lars)
        - Service connection name: `devops-appservice-resource-course`
        - Security: [x] Grant access permission to all pipelines
        - Add `devops-appservice-resource-course` to the YAML-file on key `azureSubscription`
    - Go to Azure
        - Get the name of your App Service `devops-course-webapp-test-lars`
        - Copy the name and paste in the YAML-file on key `appName`
    - Commit file to repository
    - [Empty yaml file](yaml-files/azure-pipelines-empty.yml)
    - [Filled yaml file](yaml-files/azure-pipelines-filled.yml)

6. Adding YAML to Azure DevOps Pipeline
    - Go to Repos on Azure DevOps and verify that the yaml file is there.
    - Click on Pipelines
        - Click on New pipeline
        - Click on Azure Repos Git (YAML)
        - Click on DevOpsCourse
        - Click on `Existing Azure Pipeline YAML file`
            - Branch: `deployment`
            - Path: `/devopswebapp/azure-pipelines.yml`
            - Continue
        - Click on Run
        - Click on job

7. Edit DevOpsCourse-ASP.NET Core-CI Pipeline
    - Go to Azure DevOps
        - Click on Pipelines
        - Click on DevOpsCourse-ASP.NET Core-CI
        - Click on Edit
        - Click on Triggers
        - Click on [x] Enable continuous integration
        - Save
        - Comment: `Implement CI trigger`
    - Make changes to repository and commit changes
        - Check job in Azure DevOps under Pipelines and verify that the job is running
        - Check in App Service in Azure
        -

### Other  (Necessary?)

1. Personal Access Token (Necessary?)
    - Click on Azure DevOps icon in top left
    - Choose Organization
    - Click user settings (user icon top tight)
    - Click Personal Access Token
    - Name: TokenForAgentRemote
    - Show more scope:
        - Agent Pools: Read & manage
        - Code: Read & write
        - Deployment Groups: Read & manage
        - Packaging: Read & write
        - Release: Read, write, & execute
        - Variable Groups: Read
        - Create: `kjqj2oxgtkc7b7y5udkijpamzflqeimuqugtsmb4lx5zrj3lco6a`

2. Personal Access Token (Necessary?)
    - Click on Azure DevOps icon in top left
    - Choose Organization
    - Organization Settings
    - Agent Pools
    - Default
    - New Agent
    - Download the agent
        - macOS
        - ```shell
          # Create the agent
          mkdir myagent && cd myagent
          ~/myagent$ tar zxvf ~/Downloads/vsts-agent-osx-x64-2.202.0.tar.gz
          # Configure the agent
          ~/myagent$ ./config.sh
          # Optionally run the agent interactively
          # If you didn't run as a service above:
          ~/myagent$ ./run.sh
          ```
    - Run anyway on macOS, (simpler installation on Windows)
    - Enter server URL > `https://dev.azure.com/CodicEducation`
    - Enter authentication type (press enter for PAT) > `enter`
    - Enter personal access token > `kjqj2oxgtkc7b7y5udkijpamzflqeimuqugtsmb4lx5zrj3lco6a`
    - Enter agent pool (press enter for default) > `enter`
    - Enter agent name (press enter for Larss-Mac-Pro) > `enter`
    - Enter work folder (press enter for _work) > `enter`

## Configure the CD/Release Pipeline

### Configure the Release Pipeline to push the Docker image to QA

- Go to Azure DevOps
    - Click on Pipelines
    - Click on Releases
    - Click on new Pipeline
        - Click on `Empty job`
        - Stage name: `Prepare Realese Build`
        - Save > OK
    - Artefact > Add artefact
        - Source type: `Azure Repository`
        - Project: `DevOpsCourse`
        - Source (repository): `devopscorce`
        - Default branch: `development`
        - Add
    - Add task to `Prepare Realese Build`
        - Click on Agent job:
        - Agent pool: `Azure Pipelines`
        - Agent specification: `ubuntu-20:04`
        - Click on + on Agent job
            - Click on `Docker`
            - Choose
            - Container registry: `devops-azure-container-registry-connection`
            - Container repository: `devops-qa-repository`
            - Dockerfile: browse for file > `_DevOpsCourse/devopswebapp/Dockerfile`
            - Tags: `qa`
            - Save
        - Click on Pipeline
            - Save

### Create App Service Deploy to Release to QA

#### Create a new Resource group for QA

- Create Azure App Service (Manual deployment)
    - Click on `Microsoft Azure` in top left
    - Click on `All Services`
    - Click on `App Service`
    - Click on `Create App Service` or `Create`
        - Subscription: Subscription9
        - Resource group: new `devops-linux-appservices-qa`
        - Name: `devops-course-webapp-test-lars-qa`
        - Publish: `Docker Container`
        - Operating system: `Linux`
        - Region: `North Europe`
        - Linux Plan (North Europe): `ASP-devopslinuxappservices-aa0c (F1)`
        - Sku and size: Change size
            - Dev/Test
            - F1 `Free`
            - Apply
        - Next: Docker >
        - Docker
            - Options: `Singe Container`
            - Image Source: `Azure Container Registry`
            - Registry: `devopscourseregistrylars`
            - Image: `devops-qa-repository`
            - Tag: `qa`
            - Startup Command: `docker run -p 80:80 -d devops-course-repository:qa`
        - Next: Monitoring > Nothing
        - Next: Tags > Nothing
        - Review and create > Create
    - Go to resource
        - Deployment Center
        - Continuous deployment: `on`
        - Startup File: remove `latest` the tag is used on the `Tag` field above
        - Save
    - Go to Overview
        - Click on url: server should be up and running after a while.

#### New Release Pipeline

- Rename `New Release Pipeline` to `Release to QA`
    - Save
- Click on `Create Release`
    - Stages to trigger change from automatic to manual: `Prepare Realese Build`
    - Click on `Create`
    - Click on `Release-1`
    - Click on `Prepare Realese Build` then `Deploy` and `Deploy` again
- Click on `Release to QA` and edit
    - Add a stage on `Prepare Realese Build`
        - Click on `Add stage`
        - Click on `Empty job`
        - Stage name: `Deploy to QA`
        - Go into Job
        - Agent job
        - Agent pool: `Azure Pipelines`
        - Agent specification: `ubuntu-20:04`
    - Click on + on Agent job
        - Choose `Azure App Service deploy`
        - Subscription: Subscription9
        - App Service type: `Web App for Containers (Linux)`
        - App Service Name: `devops-course-webapp-test-lars-qa`
        - Registry or Namespace: `devopscourseregistrylars.azurecr.io`
        - Image: `devops-qa-repository`
        - Tag: `qa`
        - Startup Command: `docker run -p 80:80 -d devops-qa-repository`
        - Save > OK
    - Click on Pipeline

#### Variabels use in Pipeline tasks

[Predefined variables](https://docs.microsoft.com/en-us/azure/devops/pipelines/release/variables?view=azure-devops&tabs=batch)

- Click on Variabels
    - Click on Pipeline variabels
    - Add
    - Name: Value: Scope: `environment: qa : Prepare Realese Build`
    - Save
- Click on task and choose `Prepare Realese Build`
    - Click on buildAndPush
    - in Tags: `$(environment)`
    - Save

#### Triggers

Add a new Branch to repository `release` based on development branch.

- Go to Pipelines > Releases > Edit
    - Click on the `lightning bolt` icon `Continuous deployment trigger`
    - Enable `Continuous deployment trigger`
    - Add branch filter:
        - Type: `include`
        - Branch: `release`
    - Save

#### Deploy to QA from Release Pipeline

- Create A new release
    - Stages for a trigger change from automated to manual: `Select all`
    - Create
- Click on `Realese-2`
    - Click on `Prepare Realese Build` then `Deploy` and `Deploy` again, still manual deployment
    - When done, then
    - Click on `Deploy to QA` then `Deploy` and `Deploy` again, still manual deployment
- Go to Azure Portal
    - App service
    - `devops-course-webapp-test-lars-qa`
    -

### Infrastructure as Code

#### Terraform

- Click on the Terminal icon on Azure Portal
- Attach a storage account to the resource group if you don't have one.
- Change from PowerShell to Bash > Confirm

```shell
cd clouddrive
mkdir QuickStartTerraformTest && cd QuickStartTerraformTest
code QuickStartTerraformTest.tf
```

```team foundation
provider "azurerm" {
  version = "~> 2.9.0"
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "QuickstartTerraformTest-rg"
  location = "northeurope"
}
```

- Save (ctrl-s)
- Close Editor (ctrl-q)

```shell
terraform init
terraform plan
az group show --name "QuickstartTerraformTest-rg"
terraform apply
yes enter
az group show --name "QuickstartTerraformTest-rg"
terraform destroy
yes enter
az group show --name "QuickstartTerraformTest-rg"
exit
```

### Pipeline variabels

- In Library > Variabels
    - Name on variable group: `development`
    - Add
        - Name: `environment/port/host`
        - Value: `development/production`
    - Save

- In Pipelines (Edit)
    - Variabels
        - Variable Groups
        - Link to variable group: `development`
        - Click on tasks
    - Add Agent job: `Files transform/.env`
        - If File transform change:
        - Package or folder: $(System.DefaultWorkingDirectory)
        - Target files: `**/appsetting.json`




