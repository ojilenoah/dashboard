#!/usr/bin/env python3
"""
Backdate commits so the GitHub contribution graph shows activity from
Feb 1, 2025 through today.

What this does:
  - Walks every day in the range.
  - On most days (with weighted randomness) appends one or more lines to
    .dev/log.txt and creates a commit per line, each one stamped with a
    backdated GIT_AUTHOR_DATE / GIT_COMMITTER_DATE.
  - Does NOT push by default. Pass --push to also push to origin/main.

Important:
  - The git config user.email at the time of commit must match a verified
    email on your GitHub account, or GitHub will not count the commits
    toward your contribution graph. Check with:  git config user.email
  - Don't run this twice without resetting; you'll get duplicate commits.
  - This is a one-shot script. Commit it or don't — it's harmless once run.

Usage:
  python backdate_commits.py                  # generate commits locally
  python backdate_commits.py --dry-run        # print plan without doing anything
  python backdate_commits.py --push           # generate AND push to origin/main
  python backdate_commits.py --seed 42        # change randomness seed
"""

from __future__ import annotations

import argparse
import os
import random
import subprocess
import sys
from datetime import date, datetime, timedelta
from pathlib import Path

START_DATE = date(2025, 2, 1)
END_DATE = date.today()
LOG_FILE = Path(".dev") / "log.txt"

COMMIT_MESSAGES = [
    "chore: tidy up imports",
    "fix: handle edge case in date parsing",
    "wip: experiment with layout tweaks",
    "refactor: extract shared helper",
    "docs: clarify setup steps",
    "style: tighten spacing on cards",
    "feat: explore chart variant",
    "test: cover empty-state rendering",
    "chore: bump internal version",
    "fix: typo in component name",
    "refactor: simplify state derivation",
    "feat: prototype filter UI",
    "chore: cleanup dead code",
    "docs: add inline notes",
    "perf: memoize derived value",
    "style: align icons in header",
    "fix: ensure consistent ring color",
    "wip: sketch dashboard variant",
    "chore: update local notes",
    "refactor: pull constants to module top",
    "feat: scaffold new section",
    "chore: rename internal symbol",
    "fix: respect reduced-motion preference",
    "docs: note follow-ups",
    "style: nudge avatar size",
    "refactor: collapse duplicate branches",
    "perf: skip redundant render",
    "test: snapshot edge case",
    "chore: minor housekeeping",
    "feat: try alternate animation",
]


def run(args: list[str], env: dict[str, str] | None = None, check: bool = True) -> subprocess.CompletedProcess[str]:
    return subprocess.run(args, env=env, check=check, capture_output=True, text=True)


def assert_in_repo() -> None:
    try:
        out = run(["git", "rev-parse", "--is-inside-work-tree"]).stdout.strip()
        if out != "true":
            raise RuntimeError(out)
    except (subprocess.CalledProcessError, RuntimeError, FileNotFoundError) as e:
        sys.exit(f"error: not inside a git repository ({e})")


def daily_commit_count(d: date) -> int:
    """Return how many commits to make on this day. Weighted to look natural."""
    # ~5% chance of a burst day (5–8 commits)
    if random.random() < 0.05:
        return random.randint(5, 8)
    # Weekends: lighter, often empty
    if d.weekday() >= 5:
        return random.choices([0, 1, 2], weights=[60, 30, 10])[0]
    # Weekdays: usually 1–4, occasional rest day
    return random.choices([0, 1, 2, 3, 4], weights=[12, 30, 30, 18, 10])[0]


def commit_time(d: date) -> datetime:
    """Pick a plausible time-of-day for a commit, biased to working hours."""
    hour = random.choices(
        [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 23],
        weights=[6, 10, 12, 6, 9, 11, 12, 10, 8, 6, 4, 4, 2],
    )[0]
    return datetime(d.year, d.month, d.day, hour, random.randint(0, 59), random.randint(0, 59))


def plan(seed: int) -> list[tuple[datetime, str]]:
    """Build the full list of (timestamp, message) without touching the filesystem."""
    random.seed(seed)
    out: list[tuple[datetime, str]] = []
    day = START_DATE
    while day <= END_DATE:
        n = daily_commit_count(day)
        times = sorted(commit_time(day) for _ in range(n))
        for t in times:
            out.append((t, random.choice(COMMIT_MESSAGES)))
        day += timedelta(days=1)
    return out


def make_commit(when: datetime, message: str) -> None:
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    with LOG_FILE.open("a", encoding="utf-8") as f:
        f.write(f"{when.isoformat()} {message}\n")
    run(["git", "add", str(LOG_FILE)])
    iso = when.strftime("%Y-%m-%dT%H:%M:%S")
    env = os.environ.copy()
    env["GIT_AUTHOR_DATE"] = iso
    env["GIT_COMMITTER_DATE"] = iso
    run(["git", "commit", "-m", message], env=env)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--push", action="store_true", help="push to origin/main after committing")
    parser.add_argument("--dry-run", action="store_true", help="print the plan without writing anything")
    parser.add_argument("--seed", type=int, default=20260531, help="randomness seed (default: 20260531)")
    args = parser.parse_args()

    assert_in_repo()

    schedule = plan(args.seed)
    total = len(schedule)
    days = (END_DATE - START_DATE).days + 1
    active_days = len({t.date() for t, _ in schedule})
    print(f"range:       {START_DATE} -> {END_DATE} ({days} days)")
    print(f"active days: {active_days}")
    print(f"commits:     {total}")
    print(f"seed:        {args.seed}")
    if total:
        print(f"first:       {schedule[0][0].isoformat()}  {schedule[0][1]}")
        print(f"last:        {schedule[-1][0].isoformat()}  {schedule[-1][1]}")

    if args.dry_run:
        return 0

    try:
        email = run(["git", "config", "user.email"]).stdout.strip()
    except subprocess.CalledProcessError:
        email = "(unset)"
    print(f"\ngit user.email = {email}")
    print("(must match a verified email on your GitHub account for the graph to update)\n")
    answer = input("Proceed? [y/N] ").strip().lower()
    if answer not in {"y", "yes"}:
        print("aborted")
        return 1

    for i, (when, message) in enumerate(schedule, 1):
        make_commit(when, message)
        if i % 50 == 0 or i == total:
            print(f"  {i}/{total}  {when.date().isoformat()}  {message}")

    print(f"\nDone. {total} commits created.")

    if args.push:
        print("Pushing to origin/main…")
        # No capture_output here — let the user see push progress live.
        result = subprocess.run(["git", "push", "-u", "origin", "main"])
        return result.returncode

    print("Run `git push -u origin main` to publish.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
