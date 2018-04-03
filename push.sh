#!/bin/sh
# this assumes you created the openshift directory in your home directory
# modify the script if this is not the case

if [ $# -eq 0 ]
  then
    echo "Error : you need to precise the path to your application local repo as first argument"
    exit 0
fi

DEPLOY_PROJECT_FOLDER=$1
TODAY=`date +%d-%m-%Y`
APP_NAME=${PWD##*/}
BUNDLE_NAME=${APP_NAME}.tar.gz
BUNDLE_EXTRACT_FOLDER="bundle"

echo "-> App local Git repo directory to use : $1 "
echo '-> Start building the application'

meteor build ${DEPLOY_PROJECT_FOLDER}

cd ${DEPLOY_PROJECT_FOLDER}

echo "-> Delete the old $BUNDLE_EXTRACT_FOLDER folder to prepare extract"
rm -rf ${BUNDLE_EXTRACT_FOLDER}

echo "-> Clean repo from deleted files"
git rm -r ${BUNDLE_EXTRACT_FOLDER}

echo '-> Start extracting the application bundle to deploy project folder'
tar -xvf ${BUNDLE_NAME} ${BUNDLE_EXTRACT_FOLDER}

echo '-> Delete the generated bundle'
rm ${BUNDLE_NAME}

echo '-> Generate app_packages_npm_deps file containing the list of app packages NPM dependencies to use in app build'
node loadNpmModules.js > app_packages_npm_deps

echo '-> Create a file with last deploy date ( also to force deploy even if nothing changed )'
date -u > last_build_date

echo '-> Commit new version to local repo'
git add .
git commit -am "Deploy ${APP_NAME} on ${TODAY}"

echo '-> Push new bundle to app remote Repo on openshift'
git push