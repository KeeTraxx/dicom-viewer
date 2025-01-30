# Dicom Viewer

A web-based application for viewing and storing DICOM medical images.

## Overview

Dicom Viewer is a web-based application designed to provide a user-friendly interface for viewing and exploring DICOM medical images. The application is built using modern web technologies and is designed to be scalable, secure, and easy to use.

## Features

* View and explore DICOM medical images
* Display patient information and image metadata
* Upload and manage DICOM images

## Installation

### Requirements

- `docker` and `docker-compose`

1. Clone the repository: `git clone https://github.com/KeeTraxx/dicom-viewer.git`
2. Run `docker compose up`

## Usage

### Frontend application
Open [http://localhost:5173](http://localhost:5173)

### Apollo GraphQL Sandbox
Open [http://localhost:4000/api](http://localhost:4000/api)

## Contributing
Contributions are welcome! Please submit a pull request with a clear description of the changes you've made.

## License
Dicom Viewer is licensed under the MIT License.

## Used libraries

- Frontend framework: React
- Frontend animations: D3
- Frontend DICOM Rendering: dicom.ts
- Backend Framework: Express
- Backend API: Apollo GraphQL
- Backend DICOM Parsing: daikon
