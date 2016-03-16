# Change Log
All notable changes to [belmgr][belmgr] will be documented in this file. The curated log begins at changes to version 0.1.0.

This project adheres to [Semantic Versioning](http://semver.org/).

## [0.2.0][0.2.0] - 2016-03-16
### Fixed
- Checkboxes in faceted browser of *Search page* move around when toggled ([Issue #38][38]).
- BEL statement computed as "undefined" when nanopub is saved as new ([Issue #40][40]).
- Cannot select an autocomplete suggestion ([Issue #41][41]).
- The spinner icon in the "Upload" button of the *Datasets page* continually spins on load ([Issue #43][43]).

### Added
- User guides were added to the *Help* page.
- Configure OpenBEL API URL in gulp build using `BASE_URL` environment variable.
- Allow configuration of PubMed URL in gulp build ([Issue #49][49]).

### Changed
- Accept the HAL media type (`application/hal+json`) from the OpenBEL API.

## [0.1.0][0.1.0] - 2015-12-15
### Added
- Added *New BEL* page that allows creating/updating nanopubs.
  - Popup PubMed citation information based on PubMed ID.
- Added *Search* page that offers a faceted nanopub browser.
- Added *Datasets* page that allows a user to import/export BEL datasets to the nanopub store.

[38]:     https://github.com/OpenBEL/belmgr/issues/38
[40]:     https://github.com/OpenBEL/belmgr/issues/40
[41]:     https://github.com/OpenBEL/belmgr/issues/41
[43]:     https://github.com/OpenBEL/belmgr/issues/43
[49]:     https://github.com/OpenBEL/belmgr/issues/49
[0.2.0]:  https://github.com/OpenBEL/belmgr/compare/0.1...0.2.0
[0.1.0]:  https://github.com/OpenBEL/belmgr/compare/a845b45...0.1
[belmgr]: https://github.com/OpenBEL/belmgr
