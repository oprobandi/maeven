# TERMUX WORKFLOW — MAEVEN Development Guide

Hard-won lessons from working mobile-first in Termux on Android.
Update this file every time a new gotcha is discovered.

---

## Directory Reference

| Path | What it is |
|---|---|
| `~` or `/data/data/com.termux/files/home/` | Termux home — where all your repos live |
| `$TMPDIR` | Termux's temp directory — use this, NOT `/tmp` (doesn't exist) |
| `/sdcard/Download/` | Android Downloads folder — accessible from any file manager |
| `/mnt/user-data/uploads/` | Claude upload mount — read-only, for files uploaded to Claude |

---

## Critical Rules

### 1. Never use `/tmp` — use `$TMPDIR`
```bash
# WRONG — will fail silently
unzip file.zip -d /tmp/extract

# CORRECT
unzip file.zip -d $TMPDIR/extract
```

### 2. Install zip before trying to zip
Termux doesn't ship with `zip` by default.
```bash
pkg install zip -y
```

### 3. Copy files to /sdcard/Download to upload them
Termux home (`/data/data/...`) is invisible to Android file managers and Claude.
```bash
cp ~/myproject/output.zip /sdcard/Download/output.zip
# Now visible in Files app and uploadable to Claude
```

### 4. Stray postcss.config.js in ~ will break ALL Vite projects
If you have a `postcss.config.js` in your home directory (`~`), it will be
picked up by every Vite project on the system, causing "Cannot find module
tailwindcss" errors even in projects that don't use Tailwind.
```bash
# Check for it
ls ~/postcss.config.js

# Remove it (Maeven doesn't use Tailwind — it uses plain CSS vars)
rm ~/postcss.config.js
```

### 5. Always `cd` into the repo before `git add .`
`git add .` stages files relative to your current directory.
Running it from `~` stages nothing (or worse, stages everything in home).
```bash
cd ~/maeven   # always confirm you're in the right repo
git add .
git status    # read this before committing — always
```

### 6. Verify file structure after every unzip/copy operation
```bash
# After unzipping a build from Claude:
ls src/components/   # confirm components landed
ls src/hooks/        # confirm hooks landed
ls src/data/         # confirm data files landed
```

---

## Standard Deploy Sequence

```bash
# 1. Get into the repo
cd ~/maeven

# 2. Install deps (only needed if package.json changed)
npm install

# 3. Test locally (check for build errors before pushing)
npm run dev
# Open browser to localhost:5173
# Ctrl+C to stop

# 4. Build for production (catches errors Vite dev server hides)
npm run build

# 5. Stage, commit, push
git add .
git status          # read carefully
git commit -m "feat/fix/docs: description of what changed"
git push

# 6. Deploy to Vercel
vercel --prod
```

---

## Receiving Build Updates from Claude

When Claude produces a `.zip` file:

```bash
# 1. Download zip to Android Downloads from Claude
# 2. Copy to Termux home
cp /sdcard/Download/maeven-v1.x.zip ~/

# 3. Backup current repo
cp -r ~/maeven ~/maeven-backup

# 4. Extract to $TMPDIR (NOT /tmp)
unzip -o ~/maeven-v1.x.zip -d $TMPDIR/mv

# 5. Confirm extraction worked before touching the repo
ls $TMPDIR/mv/maeven-v1.x/src/components/

# 6. Copy into repo
cp -r $TMPDIR/mv/maeven-v1.x/* ~/maeven/

# 7. Confirm files landed
ls ~/maeven/src/components/

# 8. Clean up temp
rm -rf $TMPDIR/mv

# 9. Install, test, deploy
cd ~/maeven
npm install
npm run dev
```

---

## Common Errors & Fixes

| Error | Cause | Fix |
|---|---|---|
| `cannot create extraction directory: /tmp/...` | `/tmp` doesn't exist in Termux | Use `$TMPDIR` instead |
| `Cannot find module 'tailwindcss'` | Stray `postcss.config.js` in `~` | `rm ~/postcss.config.js` |
| `cp: cannot stat '...': No such file or directory` | Unzip failed silently, nothing to copy | Re-run unzip with `$TMPDIR`, verify with `ls` first |
| `nothing to commit, working tree clean` | `git add` ran before files were copied | Copy files first, then `git add .` |
| `zip: command not found` | zip not installed | `pkg install zip -y` |
| Build pushes but Vercel still shows old version | Only `package-lock.json` was staged (files missing) | Verify `ls src/components/` then re-add |
| Images all 404 on Vercel but fine locally | Paths using `/public/` incorrectly | Use relative imports or Unsplash URLs |
