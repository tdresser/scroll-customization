// This is required to get around some bugs which occur due to the
// lack of fractional scroll offsets.
function roundIncreasingMagnitude(x) {
  "use strict";
  return x < 0 ? Math.floor(x) : Math.ceil(x);
}
