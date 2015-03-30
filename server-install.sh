#!/bin/bash
mkdir ./.tmp
mkdir ./data
sudo chown -R :www-data ./.tmp
sudo chown -R :www-data ./data
sudo chmod -R g+w ./data
sudo chmod -R g+w ./.tmp