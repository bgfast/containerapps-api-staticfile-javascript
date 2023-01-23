#!/bin/bash

# Quickstart: Deploy your code to Azure Container Apps - Cloud build
# https://learn.microsoft.com/en-us/azure/container-apps/quickstart-code-to-cloud?tabs=bash%2Ccsharp&pivots=acr-remote


#az login
#az account set --subscription $SUBSCRIPTIONID
#az upgrade

: << 'COMMENT'
This is the first line of a multiline comment
This is the second line
echo "Value of X is ${X}"
X=$((X-1))
COMMENT

# Next, install or update the Azure Container Apps extension for the CLI.
#az extension add --name containerapp --upgrade

# Register the Microsoft.App and Microsoft.OperationalInsights namespaces if you 
# haven't already registered them in your Azure subscription.
#az provider register --namespace Microsoft.App
#az provider register --namespace Microsoft.OperationalInsights

#setup environment variables
VERBOSEDEBUG=true
RESOURCE_GROUP="rg-containerapp"
LOCATION="westus"
ENVIRONMENT="env-album-containerapps"
CONTAINER_APP_NAME="album-api"
IMAGE_NAME="album-api-javascript"
FRONTEND_NAME="album-ui"
GITHUB_USERNAME="bgfast"
CUSERNAME="crbrent"
# Define a container registry name unique to you.
ACR_NAME="crbrent"

# https://github.com/Azure-Samples/azure-cli-samples/blob/master/container-registry/create-registry/create-registry-service-principal-assign-role.sh
# Get the details of the registry 
# https://stackoverflow.com/questions/43373176/store-json-directly-in-bash-script-with-variables
# asset_ID=$( curl '...' | jq --raw-output '.AssetID' )
# https://stackoverflow.com/questions/47018863/parsing-and-storing-the-json-output-of-a-curl-command-in-bash
declare -a CIE_ACR
#CIE_ACR = $(('az acr show --name $ACR_NAME --resource-group $RESOURCE_GROUP'))
if $VERBOSEDEBUG
then
    az acr show --name $ACR_NAME --resource-group $RESOURCE_GROUP
fi
CIE_ACR=$(az acr show --name $ACR_NAME --resource-group $RESOURCE_GROUP)
#echo ${CIE_ACR} # This doesn't render correctly- not sure why
if [[ $CIE_ACR = *creationDate* ]]
then
    echo "The Azure Container Registry already exists"
else
    echo "Create the Azure Container Registry"

    # https://learn.microsoft.com/en-us/powershell/module/az.containerregistry/get-azcontainerregistry?view=azps-9.2.0
    # create the container registry
    az acr create \
      --resource-group $RESOURCE_GROUP \
      --name $ACR_NAME \
      --sku Basic \
      --admin-enabled true
fi

# Build the container in Azure
# To do - how to know when the container needs to be rebuilt. Perhaps a flag on the script?
az acr build --registry $ACR_NAME --image $IMAGE_NAME --only-show-errors .

# https://learn.microsoft.com/en-us/cli/azure/containerapp/env?view=azure-cli-latest
if $VERBOSEDEBUG
then
    az containerapp env show -n $ENVIRONMENT -g $RESOURCE_GROUP
fi
CONTAINER_APP_ENV=$(az containerapp env show -n $ENVIRONMENT -g $RESOURCE_GROUP)
echo ${CONTAINER_APP_ENV}
if [[ $CONTAINER_APP_ENV = *$ENVIRONMENT* ]]
then
    echo "The Azure Container APP Environment already exists"
else
    echo "Create the Azure Container APP Environment"

    # Create the container app environment
    az containerapp env create \
      --name $ENVIRONMENT \
      --resource-group $RESOURCE_GROUP \
      --location "$LOCATION"
fi

# Check if the container app has already been created. If not, then create it. If yes, then update it
if $VERBOSEDEBUG
then
    az containerapp show -n $CONTAINER_APP_NAME -g $RESOURCE_GROUP
fi
CONTAINER_APP=$(az containerapp show -n $CONTAINER_APP_NAME -g $RESOURCE_GROUP)
if [[ $CONTAINER_APP = *$CONTAINER_APP_NAME* ]]
then
    echo "The Azure Container APP already exists. Updating the Container APP..."
    # Create the container app and deploy the image
    #az containerapp update -n $CONTAINER_APP_NAME -g $RESOURCE_GROUP --image $ACR_NAME.azurecr.io/$IMAGE_NAME
    THERESULT=$(az containerapp update -n $CONTAINER_APP_NAME -g $RESOURCE_GROUP --image $ACR_NAME.azurecr.io/$IMAGE_NAME)
    if [[ $THERESULT = *Succeeded* ]]
    then
        echo "Successfully updated container app"
    else
        echo "Failed to update container app"
    fi
else
    echo "Create the Azure Container APP"

    # to do - there's a bug on one of the following lines. bash throws and end of file error

    # Create the container app and deploy the image
    #az containerapp create \
    #  --name $CONTAINER_APP_NAME \
    #  --resource-group $RESOURCE_GROUP \
    #  --environment $ENVIRONMENT \
    #  --image $ACR_NAME.azurecr.io/$IMAGE_NAME \
    #  --target-port 3500 \
    #  --ingress 'external' \
    #  --registry-server $ACR_NAME.azurecr.io \
    #  --query properties.configuration.ingress.fqdn \
    #  --registry-password $CPASSWORD \
    #  --registry-username $CUSERNAME
fi

##docker login crbrent.azurecr.io

## https://album-api.mangowave-d948cf28.westus.azurecontainerapps.io/albums


