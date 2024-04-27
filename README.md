<h1 align="center">MeshDash: Manufacture Log Monitor</h1>

![](https://github.com/Mesh-ch/meshDash/blob/main/.github/preview.png)

## Prerequisite

### Install nodejs

#### NVM (Node Version Manager)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

#### NodeJS LTM

```bash
# first do: source ~/.nvm/nvm.sh
nvm install --lts
```

### Install pnpm (optional)

```bash
iwr https://get.pnpm.io/install.ps1 -useb | iex

```

## Link Log Folder (Important)

You need to create a softlink to the `log` folder under the **project root folder** to run the website properly:

```bash
ln -s <location-of-your-log-folder> log
```

## Run the website

### Install package and run
If not using `pnpm`, use `npm` instead.

#### Install packages
```bash
pnpm i
````

#### Run Dev

```bash
pnpm dev
```

#### Run Production

```bash
pnpm build
```
