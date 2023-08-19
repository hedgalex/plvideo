# Video downloader for Plex Media Server 

## Description

This Plex Media Server plugin allows you to easily download and organize movies and TV shows into your Plex library. With this application, all you need to do is update the Plex library and the media files will be automatically organized according to the recommended Plex file structure.

## Docker

Docker is required to run and deploy this application. If you don't have Docker installed, please follow the official Docker installation guide based on your operating system:

[Install Docker on Windows](https://docs.docker.com/desktop/install/windows-install/)
[Install Docker on macOS](https://docs.docker.com/desktop/install/mac-install/)
[Install Docker on Linux](https://docs.docker.com/engine/install/)
Docker enables you to package applications and their dependencies into containers, providing a consistent environment for development and production.

`cd path/to/project && docker-compose up`

## Installation

1. Clone or download this repository to your Plex Media Server server.

2. Edit the `.env` file to specify the locations for movies and TV shows on your system:

```
DOWNLOAD_PATH_MOVIES=/path/to/movies
DOWNLOAD_PATH_TVSHOWS=/path/to/tvshows
```

Replace `/path/to/movies`` with the directory where you want to store your movie files and `/path/to/tvshows`` with the directory for your TV show files.


1. Save the `.env` file after making the changes
2. Install any necessary dependencies or prerequisites required for the plugin. (If applicable)
3. To build frontend part you need to run `cd ./frontend && yarn && yarn build`
4. After completing the setup, you'll need to execute the migration process to create the necessary database tables: `cd ../backend && yarn && yarn pretypeorm && yarn migration:up`
5. The project is ready to start: `yarn start:prod`

The application will be up and running, and you can access it at [http://localhost:3000](http://localhost:3000)





