# SERVER SETUP

This file contains the instruction to set up the backend of the project

**⚠️BACK-END IS NOW FUNCTIONAL⚠️**
## Current project setup

```
📂 server
├── 📄 APIU_TEST.rest
├── 📄 db.js
├── 📄 db.pgsql
├── 📄 index.js
├── 📄 package.json
├── 📄 pnpm-lock.yaml
├── 📄 README.md
├── 📄 .env
├── 📂 middleware
│  ├── 📄 authorize.js
│  └── 📄 validinfo.js
├── 📂 routes
│   ├── 📄 dashboard.js
│   └── 📄 jwtAuth.js
└── 📂 utils
    └── 📄 jwtGenerator.js
```

## WE ARE USING

- **Node.js** *v18.15.0* as server backend.
  - [Download Node.js](https://nodejs.org/en/download)
- **PostgreSQL** *v14.2* (anything after *v14.0* is fine) as database.
  - [Download Node.js](https://www.postgresql.org/download)
- **pnpm** *v7.30.0* as the node package manager.
  - [pnpm setup](#setup-pnpm)
- **Git** and **GitHub** for version control.
  - [Download Node.js](https://git-scm.com/download/win)

## SETUP POSTGRESQL

### SETUP IN WINDOWS:
***Do it yourself or google***

### SETUP IN UBUNTU *v20.04* or WSL(UBUNTU):
1. First update the repositories

```sh
sudo apt update -y && sudo apt upgrade -y
```

2. Install git, curl/wget, PostgreSQL

```sh
sudo apt install git wget curl postgresql ca-certificates -y
```

⚠️**IF** you haven't downloaded the git repo yet, `git clone` it and set branch to **devlopment** (it's not a spelling error) or you can also download the zip files.⚠️

### Modify PostgreSQL's pg_hba.conf and postgresql.conf file

These files should be inside your DATABASE folder.

1. **pg_hba.conf** add to the end of file

```
# ALLOW FOR REMOTE CONNECTIONS
host    all     all         0.0.0.0/0   scram-sha-256
host    all     all         ::/0        scram-sha-256
```

2. **postgresql.conf** find this setting in file and change it.

```conf
# -Connection settings-
# listening_addresses = 'localhost' # < this one

# to

# This allows remote managment 
# MIGHT CLOSE IT IN FINAL VERSION
listening_addresses = '*'
```

**After Installation Restart your PostgreSQL server.**

Check if PostgreSQL is running and restart it for changes to take effect.

#### UBUNTU

```sh
sudo systemctl status spostgresql
sudo systemctl restart spostgresql
```

#### WSL (UBUNTU)

```sh
sudo service postgresql status
sudo service postgresql restart
```

#### WINDOWS

**Idk🗿** figure it out.

### Create role, database and table

If you have done everything correctly you should be able to run `psql` and get into the PostgreSQL's prompt. Run the below cmd inside the `psql` prompt and you should probably be fine.

```
\i db.pgsql
```

For more details look into the [pgsql file](./db.pgsql)

## SETUP PNPM

Instructions for *pnpm* our node package manager. ***Node.js v18.15.0*** comes with a version manager for node package managers **`corepack`** we will use it to install our packages through **`pnpm`**

- Run this in windows poweshell or cmdline and ubuntu's terminal inside server folder/directory.

```sh
corepack enable
pnpm install
```

## START THE SERVER

<!--
Create a `.evn` file inside the root directory for jwt secret.

Inside ***.env*** file

```conf
jwtSecret="<you_screat>"
# jwtSecret="I_am_BATMAN"
```
-->

We are finally here just run this and it will be started

```
pnpm dev
```

P.S.:
- At later date I will try to make an install script
- if you wanna test out something then don't touch the original files just copy the file and add `test-` in front of it, git will ignore it.
