# Node Course

This repository contains multiple lecture-based Node.js projects created while learning backend development concepts such as Express, MVC, databases, authentication, cookies, sessions, and styling.

## Overview

The repository is organized by lecture folders. Each folder represents a separate project or learning milestone.

Examples:
- `lec10-airbnb`
- `lec13-MVC`
- `lec16-Mongodb`
- `lec19-Cookies`
- `lec20-Auth`

## Project Structure

Top-level lecture folders:

```text
lec2
lec3
lec4
lec5
lec7
lec8
lec9
lec10
lec10-airbnb
lec12-styling
lec13-MVC
lec14-DynamicPath
lec15-IntrotoSql
lec16-Mongodb
lec19-Cookies
lec20-Auth
```

Each lecture folder is its own standalone project and may have its own:
- `package.json`
- source files
- views
- public assets
- database configuration

## Prerequisites

Before running any project, make sure you have:
- [Node.js](https://nodejs.org/)
- npm

Some projects may also require:
- MongoDB
- MySQL

## Installation

Move into the project folder you want to run, then install dependencies.

```powershell
cd "<project-folder>"
npm install
```

Example:

```powershell
cd "c:\Users\Harsh\MY_FILES\Node Course\lec20-Auth"
npm install
```

## Running a Project

Since each lecture folder is separate, run commands from inside that specific folder.

Typical commands:

```powershell
npm start
```

or

```powershell
npm run dev
```

If a project uses Tailwind CSS or other build tools, run the scripts defined in that project's `package.json`.

## Usage

1. Choose a lecture folder.
2. Open a terminal in that folder.
3. Install dependencies with `npm install`.
4. Start the project using the scripts available in that folder.

## Notes

- This repository is a collection of learning projects, not a single production application.
- Different folders may use different stacks and configurations.
- Always check the `package.json` inside the specific lecture folder you want to run.

## License

This project is for learning and personal practice.
