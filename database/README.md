# DATABASE SETUP
This file contains the instruction to set up the database of the project

## Current folder setup

```
📂 database
├── 🐋 Dockerfile
├── 📄 README.md
├── 📄 db.pgsql
├── 📄 initdb.sql
├── 📄 resume.pgsql
└── 📄 template_data.pgsql
```

## WE ARE USING

- **PostgreSQL** *v14.2* (anything after *v14.0* is fine) as database.
  - [Download Node.js](https://www.postgresql.org/download)

## SETUP POSTGRESQL

### SETUP IN DOCKER:

```sh
# Set <your_image_name> to your preferred name
# Build the image first
docker build -t <your_image_name> .

# Run the image 
docker run -d --name my_db_container <your_image_name>
```

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
\i initdb.sql
```

For more details look into the [sql file](./initdb.sql)

## initdb.sql
This file is created by adding the `db.pgsql`, `resume.pgsql`, `template_data.pgsql` in order.

```
initdb.sql	# Final sql file
├── db.pgsql	# Initial db, dbuser, user table setup
├── resume.pgsql 	# resume table setup
└── template_data.pgsql # resume templates setup
```

### create initdb.sql in linux shell
```
cat db.pgsql resume.pgsql template_data.pgsql > initdb.sql
```

### create initdb.sql in CMD / POWERSHELL windows
```
type db.pgsql resume.pgsql template_data.pgsql > initdb.sql
```

### create initdb.sql in POWERSHELL windows
```
Get-Content -Path db.pgsql, resume.pgsql, template_data.pgsql | Out-File -FilePath initdb.sql
```
