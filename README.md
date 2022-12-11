# SQL Data Fetch

## Dependencies

- Boilerplate - [react-boilerplate-cra-template](https://github.com/react-boilerplate/react-boilerplate-cra-template)
- react.js - [v18.2](https://reactjs.org/)
- State management - [zustand](https://github.com/pmndrs/zustand)
- SQL code highlighting - [react-simple-code-editor](https://github.com/react-simple-code-editor/react-simple-code-editor) && [prismjs](https://prismjs.com/)

## Overview of the app

The app is built using **react.js**. It's a simple program to execute a SQL query. The app requires a code input from the user and on hitting the RUN button a [dummyjson.com](https://dummyjson.com) API is called which responds with some mock data which is later displayed on the app.

- To create a new query tap on the "NEW QUERY" Button.
- There are majorly two sections in the app:

  - **Sidebar** Section - The sidebar has two collapsible menu blocks: "**Saved Queries**" and "**Predefined Queries**"
    - "Saved Queries" displays the editable queries
    - "Predefined Queries" displays the predefined queries which are packed along with the app. To edit a predefined query simply tap on the EDIT button
  - **Query Results** Section - This section houses a **Title** edit field and the **SQL Code** editor. Any changes to the title and SQL code are automatically saved to the store.
    - Input a "valid" SQL code (could be anything dummy) and tap on the _RUN_ button to execute it. A mock SQL data result will be displayed in the Results Table.

- The app uses `Zuland` library for easy state management.
  - There are 3 major stores in the app:
    - **QueryStore** - contains the newly created and "editable" query entities which includes an id, title and the sql code.
    - **PredefinedQueryStore** - contains the predefined and "readonly" query entities which includes an id, title and the sql code.
    - **SqlResultsStore** - contains to logic for HTTP api data fetch, storage, result states.
- Major Data structure:
  - `selectedQueryId`: Selected query id
  - `selectedQuery`: All saved queries
  - `selectedPredefinedSelectedQueryId`: Selected predefined query id
  - `predefinedQueries`: All predefined queries

### Performance:

- Lighthouse results using Brave browser (Version 1.45.127 Chromium: 107.0.5304.110 (Official Build) (arm64))

**Let the Lighthouse score speak for itself:**

![Lighthouse Score](https://raw.githubusercontent.com/ganeshrvel/sql-data-fetch/main/public/lighhouse-score.png 'Lighthouse Score')

```
Perfomance score: **100**
Best practices score: **100**

First Contentful Paint - 0.5 s
Time to Interactive - 0.5 s
Speed Index - 0.5 s
Total Blocking Time - 0 ms
Largest Contentful Paint - 0.5 s
Cumulative Layout Shift - 0
```

- I have used minimal packages to build the app
- No external CSS frameworks were used except the SQL code editor
- No external images/icons were used
  - The icons used along with the CTAs were either locally imported or unicodes were used to reduce the page load strain
- Chunking/Splitting the output bundle files. The vendor files are moved to a separate bundle as they don't change as often as the app code. This should help in reducing subsequent page load time because the vendor bundle files are now separate, cached by the browsers and they don't often change.
- Narrowed the list of supported browsers - The browsers have evolved enough that the latest set of ECMA script specs can work on them without polyfills. This improves the code size and the startup time
- There are no routes used in the app, thence lesser code and better first load time
- I have no where used the heavy weight `require` or other `global imports`. This has helped in the efficient tree shaking of the code
- Minimal font style imports which has again reduced the network bandwidth
- The user needs to explicitly click on the RUN button to load the result, this has reduced the first load time
- 
```shell
File sizes after gzip:

  70.61 kB  build/static/js/333.a7467763.js
  5.11 kB   build/static/js/main.e26516e7.js
  2.69 kB   build/static/css/main.56f9de0c.css
```

## Building from Source

Requirements: [Node.js v14](https://nodejs.org/en/download/ 'Install Node.js v14'), [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git 'Install Git') and [Yarn package manager](https://yarnpkg.com/lang/en/docs/install/ 'Install Yarn package manager')

### Clone

```shell
$ git clone https://github.com/ganeshrvel/sql-data-fetch.git

$ cd sql-data-fetch

# install yarn
npm install -g yarn
```

```shell
$ yarn
```

```shell
# Development
$ yarn start

# Build
$ yarn build
$ serve -s build

```
