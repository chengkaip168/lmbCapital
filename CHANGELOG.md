# Changelog

Notable changes to the LMB Capital site. Newest first.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed
- Site images are now served from `public/images/` instead of an external CDN, so the
  site no longer depends on a third-party host for its logo, hero, and team photos.

### Removed
- Unused platform configuration and two unused build dependencies. Build output was
  byte-identical before and after the removal.
