# Publish the two repositories

The provided GitHub repositories were verified as empty on 2026-07-23. Re-check before pushing.

## Pangea OS

```bash
cd /path/to/Pangea-OS-v1.0.0
git init -b main
git remote add origin https://github.com/jossuealcacao-exe/pangea_os.git
git add .
git commit -S -m "feat: publish Pangea OS 1.0.0"
git tag -s v1.0.0 -m "Pangea OS 1.0.0"
git push -u origin main
git push origin v1.0.0
```

## AHP+

```bash
cd /path/to/AHP-Plus-v1.0.0
git init -b main
git remote add origin https://github.com/jossuealcacao-exe/ahp_plus.git
git add .
git commit -S -m "feat: publish AHP+ protocol 1.0.0"
git tag -s v1.0.0 -m "AHP+ 1.0.0"
git push -u origin main
git push origin v1.0.0
```

Review every diff before publishing. Public repositories expose source; `LICENSE` reserves rights but cannot prevent copying technically.
