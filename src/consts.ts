// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_URL = "https://niracler.com";
export const SITE_TITLE = "云梦雨的小屋";
export const SITE_DESCRIPTION = "长门大明神会梦到外星羊么？";
export const SITE_SOCIAL_IMAGE =
    "https://image.niracler.com/2025/11/310d7fe6f129e0beae659033fbba30a8.jpeg";

// 默认文章预览/社交分享图
export const DEFAULT_POST_SOCIAL_IMAGE =
    "https://image.niracler.com/2025/03/2e3bf667bb2c02aa253c16a0aae5b762.png";

// 社交媒体链接
export const SOCIAL_LINKS = {
    github: "https://github.com/luckerr2007",
    email: "mailto:3225567838@qq.com",
};

// Meting API base URL (用于音乐播放器自动获取歌曲信息)
// Override via PUBLIC_METING_API_BASE env var for self-hosted instances
export const METING_API_BASE = import.meta.env.PUBLIC_METING_API_BASE || "/api/meting";
