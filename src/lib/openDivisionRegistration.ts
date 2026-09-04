// One switch for the Open Division's registration state. The nav banner and
// the page's CTA both read it, so flipping this back to false reopens
// registration everywhere at once — the same reason AD_DEADLINE lives in
// src/lib/adDeadline.ts rather than being retyped in each component.
export const REGISTRATION_FULL = true;
