# MeshDash

Dashboard website for manufacture log monitoring. -- by mesh.ch

## Install

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

### Install package and run
If not using `pnpm`, use `npm` instead.

#### Install packages
```bash
pnpm i 
```

#### Run Dev
```bash
pnpm dev
```

#### Run Production
```bash
pnpm build
```
