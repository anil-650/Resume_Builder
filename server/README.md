# 🖥️🌐 Server Setup

This file contains the instruction to set up the backend of the project

## 🗃️ Current project setup

<details>
    <summary> 📂 server structure</summary>

```
📂 server
├── 📄 APIU_TEST.rest
├── 📄 Dockerfile
├── 📄 README.md
├── 📄 cities.csv
├── 📄 cities.sql
├── 📄 db.js
├── 📄 index.js
├── 📄 index.js.back
├── 📂 middleware
│   ├── 📄 authorize.js
│   ├── 📄 validemail.js
│   └── 📄 validinfo.js
├── 📄 package.json
├── 📄 puppeteer-alpine-setup.sh
├── 📂 routes
│   ├── 📄 dashboard.js
│   ├── 📄 jwtAuth.js
│   ├── 📄 resetPassword.js
│   ├── 📄 resume.js
│   └── 📄 templates.js
├── 📂 utils
│   ├── 📄 jwtGenerator.js
│   └── 📄 mailUtils.js
└── 📄 yarn.lock
```

</details>

## WE ARE USING

| package manager | runtime | version control |
|:---------------:|:-------:|:---------------:|
| ![yarn][yarn_img] <br> **yarn** <br> *v1.22.22* | <br> ![node][node_img] <br><br> **nodejs** <br> *v22.14.0* |<br> ![git][git_img] <br> **git** <br> *v2.48.1* |

### Manual Installation for project setup.
- **Node.js** *v22.14.0*
  - [Download Node.js](https://nodejs.org/en/download)
  - Use your package manager to install on Linux
- **yarn** *v1.22.22*
  - [yarn setup](#setup-yarn)
- **Git** and **GitHub**
  - If you don't have a github acc [Create GitHub account](https://github.com/signup) here
  - [Download git for windows](https://git-scm.com/download/win)
  - Use your package manager to install on Linux

### 🔑 Important environment variables to set before starting the project

> [!TIP]
> You can either Create an `.env` file or set them directly yourself.

| env | type | example value |
|:---:|:----:|:-------------:|
| `jwtSecret` | `string` | "I_am_batman" |
| `FRONT_END_SITE` | `url` | `http://localhost:3000` |
| `MAIL` | `json_obj` | `{ "SERVICE": "gmail", "USERNAME": "MyresumeBuilder", "EMAIL": "myresumebuilder.site@gmail.com", "PASS": "<your_password>" }`


----

## 💻🚀 Steps to setup/run the project

<details>
    <summary>
    <h3>Mehtond 1: 🐳 Docker Setup (Recommended) </h3>
</summary>

```sh
# Set <your_image_name> to your preferred name
# Build the image first
docker build -t <your_image_name> .

# Run the image
docker run -d --name my_db_container <your_image_name>
```

</details>

----

<details>
    <summary>
    <h3>Mehtond 2: 👩‍💻 Manual Setup</h3>
    </summary>

#### 🧞 Puppeteer setup

> [!NOTE]
> If you are using the docker method to setup the project methods below are not needed.

There are 2 ways to setup Puppeteer.

1. ***Download*** it along with `yarn install` the package.json
    - Please remove the `executablePath` option from the function in the given
      location below [1].
    - Continue to next [step](#🚀-setup-yarn)
2. ***Pre-download*** the Browser before installing the package.json
    - Set an env variable `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` to `ture`
        - Linux bash: `export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=ture`
        - Windows cmd/poweshell: `setx /m PUPPETEER_SKIP_CHROMIUM_DOWNLOAD ture`
    - Set the `executablePath` option in the location shown in code [1].


> routes/resume.js: line no:153

```javascript
148 async function genPDF(id, cv_template){
149
150     // LAUNCH BROWSER 1020p res
151     const browser = await pup.launch({
152         defaultViewport: { width: 1280, height: 720 },
    # [1]: Change the `executablePath` to your browsers path
153         executablePath: '/usr/bin/chromium-browser',
154         args: [
155             '--no-sandbox',
```

#### 🚀 Setup YARN

Instructions for *yarn* our node package manager. ***Node.js v22.14.0*** comes with a version manager for node package managers **`corepack`** we will use it to install our packages through **`yarn`**

- Run this in windows poweshell or cmdline and ubuntu's terminal inside server folder/directory.

```sh
# install yarn and dependecies
corepack enable yarn
yarn install
```

- START THE SERVER

```sh
yarn run dev
```

</details>


<!--
Create a `.evn` file inside the root directory for jwt secret.

Inside ***.env*** file

```conf
jwtSecret="<you_screat>"
# jwtSecret="I_am_BATMAN"
```
-->

P.S.:
- At later date I will try to make an install script
- if you wanna test out something then don't touch the original files just copy the file and add `test-` in front of it, git will ignore it.

[yarn_img]: https://raw.githubusercontent.com/yarnpkg/assets/refs/heads/master/yarn-kitten-circle.svg
[node_img]: https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21~bgwhite.svg
[git_img]: https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg
