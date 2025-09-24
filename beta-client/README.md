# Frontend Setup

This project uses [Astro](https://astro.build) *v2.1.4*

## 🧾 Setup Instructions:

<details>
    <summary>
    <h3>Method 1: 👩‍💻 Local development</h3>
    </summary>

```sh
yarn install && yarn run dev
```

</details>

<details>
    <summary>
    <h3>Method 2: 🚀 🧑‍🚀 Deployment</h3>
    </summary>

```sh
yarn install && yarn run build
HOST=0.0.0.0 PORT=3000 node ./dist/server/entry.mjs
```

</details>

<details>
    <summary> 
    <h3>Method 3: 🐳 Docker Setup (Recommend)</h3>
    </summary>

```sh
# Set <your_image_name> to your preferred name
# Build the image first
docker build -t <your_image_name> .

# Run the image
docker run -d --name my_db_container <your_image_name>
```

</details>



## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

<details>
<summary> 🗃️ Client Dir structure </summary>

```
beta-client/
├── 🐋 Dockerfile
├── 📄 README.md
├── 📄 astro.config.mjs
├── 📄 package.json
├── 📂 public
│   ├── 🖼️ favicon.svg
│   └── 📂 images
│       ├── 🖼️ ats01.jpg
│       ├── 🖼️ bg.jpg
│       ├── 🖼️ fast_n_easy.svg
│       ├── 🖼️ modern01.jpg
│       ├── 📂 profile-pic
│       │   ├── 🖼️ ng-1.svg
│       │   ├── 🖼️ ng-2.svg
│       │   ├── 🖼️ ng-3.svg
│       │   ├── 🖼️ ng.svg
│       │   ├── 🖼️ tw-1.svg
│       │   ├── 🖼️ tw-2.svg
│       │   ├── 🖼️ tw-3.svg
│       │   ├── 🖼️ tw-4.svg
│       │   ├── 🖼️ tw-5.svg
│       │   ├── 🖼️ tw-6.svg
│       │   ├── 🖼️ tw-7.svg
│       │   ├── 🖼️ tw-8.svg
│       │   └── 🖼️ tw-9.svg
│       ├── 🖼️ res_down.svg
│       ├── 🖼️ res_re.svg
│       └── 🖼️ writing.png
├── 📂 src
│   ├── 📂 components
│   │   ├── 📄 Auth_Input.astro
│   │   ├── 📄 Button.astro
│   │   ├── 📄 CVcard.astro
│   │   ├── 📄 EmptyCVcard.astro
│   │   ├── 📄 Footer.astro
│   │   ├── 📄 HeroSection.astro
│   │   ├── 📄 Links.astro
│   │   ├── 📄 Nav.astro
│   │   ├── 📄 NavBar.astro.back
│   │   ├── 📄 Text_input.astro
│   │   └── 📄 UserNav.astro
│   ├── 📄 env.d.ts
│   ├── 📂 layouts
│   │   ├── 📄 BaseLayout.astro
│   │   ├── 📄 CVpageLayout.astro
│   │   ├── 📄 PrintLayout.astro
│   │   └── 📄 Userlayout.astro
│   ├── 📂 pages
│   │   ├── 📄 500.astro
│   │   ├── 📄 about.astro
│   │   ├── 📂 api
│   │   │   ├── 📄 cc.json.js
│   │   │   ├── 📄 delcv.js
│   │   │   ├── 📄 passwd.js
│   │   │   ├── 📄 resetall.js
│   │   │   ├── 📄 sendcv.js
│   │   │   └── 📄 templates.json.js
│   │   ├── 📂 cv-builder
│   │   │   ├── 📄 final.astro
│   │   │   ├── 📂 genpdf
│   │   │   │   └── 📄 ats01-[id].astro
│   │   │   ├── 📄 index.astro
│   │   │   ├── preview
│   │   │   │   └── 📄 preview-ats01.astro
│   │   │   └── 📂 templates
│   │   │       ├── 📂 ats01
│   │   │       │   ├── 📂 form
│   │   │       │   │   ├── 📄 confedu.astro
│   │   │       │   │   ├── 📄 confexp.astro
│   │   │       │   │   ├── 📄 confothers.astro
│   │   │       │   │   ├── 📄 education.astro
│   │   │       │   │   ├── 📄 experience.astro
│   │   │       │   │   ├── 📄 experience.astro.back
│   │   │       │   │   ├── 📄 others.astro
│   │   │       │   │   └── 📄 personal.astro
│   │   │       │   └── 📄 index.astro
│   │   │       ├── 📄 ats01-temp.astro
│   │   │       ├── 📂 modern01
│   │   │       │   └── 📄 index.astro
│   │   │       └── 📄 modern01-temp.astro
│   │   ├── 📄 faq.astro
│   │   ├── 📂 forgotpassword
│   │   │   ├── 📄 index.astro
│   │   │   └── 📄 sucess.astro
│   │   ├── 📄 index.astro
│   │   ├── 📄 login.astro
│   │   ├── 📄 logout.astro
│   │   ├── 📄 register.astro
│   │   ├── 📂 resetpassword
│   │   │   ├── 📄 index.astro
│   │   │   └── 📄 sucess.astro
│   │   └── 📂 user
│   │       ├── 📄 cv.astro
│   │       ├── 📄 dashboard.astro
│   │       ├── 📄 index.astro
│   │       ├── 📄 profile.astro
│   │       └── 📂 viewcv
│   │           └── 📄 ats01-[id].astro
│   ├── 📂 styles
│   │   └── 📄 global.css
│   └── 📂 utils
│       ├── 📄 auth.js
│       ├── 📄 convertFormData.js
│       ├── 📄 cookie.js
│       ├── 📄 randomPic.js
│       ├── 📄 userDel.js
│       ├── 📄 userGet.js
│       ├── 📄 userPost.js
│       ├── 📄 userPut.js
│       ├── 📄 utilites.js
│       └── 📄 yearMonth.js
├── 📄 tailwind.config.cjs
├── 📄 tsconfig.json
└── 📄 yarn.lock
```

</details>

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `yarn install`          | Installs dependencies                            |
| `yarn run dev`          | Starts local dev server at `localhost:3000`      |
| `yarn run build`        | Build your production site to `./dist/`          |
| `yarn run preview`      | Preview your build locally, before deploying     |
| `yarn run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `yarn run astro --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [Astro documentation](https://docs.astro.build) or jump into our [Astro's Discord server](https://astro.build/chat).
