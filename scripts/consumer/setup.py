#!/usr/bin/env python3
# Initialize quantum-ui as a consumer dependency: install pnpm deps and build
# pkg/dist (gitignored in this repo, so a fresh clone has no dist).
# Idempotent and safe to re-run.

import subprocess
import sys
from pathlib import Path


def main() -> int:
    quantum_ui_root = Path(__file__).resolve().parent.parent.parent

    if not (quantum_ui_root / 'node_modules').exists():
        subprocess.run(['pnpm', 'install'], cwd=quantum_ui_root, check=True)

    if not (quantum_ui_root / 'pkg' / 'dist').exists():
        subprocess.run(['just', 'finalize'], cwd=quantum_ui_root, check=True)

    return 0


if __name__ == '__main__':
    sys.exit(main())
