export const HERO_SPEED = 1.5

// AboutMe timings (global scroll progress 0..1)
export const ABOUT_START = 0.08 // AboutMe begins while Hero is visible
export const ABOUT_VISIBLE = 0.12 // starts to be visible
export const ABOUT_FADE_IN_END = 0.22
export const ABOUT_FADE_OUT_START = 0.46
export const ABOUT_END = 0.54 // fully gone; Projects can appear

// Projects timings (start shortly before ABOUT_END for smoother handoff)
export const PROJECTS_START = ABOUT_END - 0.015 // 0.525
export const PROJECTS_FULL = ABOUT_END + 0.06 // 0.60
