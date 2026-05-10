import type { Locale } from "../utils/i18n";

export const ui = {
    zh: {
        // Navigation
        "nav.home": "首页",
        "nav.blog": "文章",
        "nav.categories": "分类",
        "nav.about": "关于",
        "nav.privacy": "隐私政策",
        "nav.breadcrumb": "面包屑导航",
        "nav.editor": "编辑器",
        "nav.skipToContent": "跳转到主要内容",
        "nav.mainNav": "主导航",
        "nav.openMenu": "打开导航菜单",
        "nav.closeMenu": "关闭导航菜单",
        "nav.mobileNav": "移动端导航",

        // Blog post
        "post.readingTime": "约 {minutes} 分钟",
        "post.lastUpdated": "最近更新于",
        "post.openToc": "打开目录",
        "post.toc": "目录",
        "post.closeToc": "关闭目录",
        "post.backToTop": "回到顶部",

        // Post list
        "postList.hideDeepSearch": "隐藏 DeepSearch 文章",
        "postList.noMatchingPosts": "（暂无符合条件的文章）",

        // Misc
        "misc.noDescription": "暂无描述",
        "misc.noPreview": "暂无预览图",
        "misc.loading": "加载中...",

        // Search modal
        "search.trigger": "搜索 (Cmd+K)",
        "search.dialog": "站内搜索",
        "search.close": "关闭搜索",
        "search.label": "搜索文章",
        "search.placeholder": "搜索文章...",
        "search.emptyHint": "输入关键词开始搜索",
        "search.emptyDetail": "支持搜索所有文章、TIL 和月度总结",
        "search.noResults": "未找到相关内容",
        "search.noResultsHint": "请尝试其他关键词",
        "search.resultList": "搜索结果",
        "search.select": "选择",
        "search.navigate": "导航",
        "search.resultCount": "显示 {shown} / {total} 条结果",
        "search.showMore": "显示更多",

        // Share sidebar
        "share.twitter": "分享到 Twitter",
        "share.telegram": "分享到 Telegram",
        "share.label": "分享文章",
        "share.copyLink": "复制链接",
        "share.like": "点赞",
        "share.unlike": "取消点赞",
        "share.copied": "链接已复制",

        // Lightbox
        "lightbox.viewImage": "查看大图",
        "lightbox.close": "关闭",
        "lightbox.prev": "上一张",
        "lightbox.next": "下一张",

        // Theme
        "theme.toggle": "切换主题模式",
        "theme.light": "浅色模式",
        "theme.dark": "夜间模式",
        "theme.system": "跟随系统",
        "theme.currentSystem": "{system}（当前{active}）",
        "theme.statusMessage": "当前主题：{current}。点击切换为{next}",

        // Related posts
        "related.heading": "相关文章",

        // Footer
        "footer.ccLicense": "本站内容采用 CC BY-NC-SA 4.0 国际许可协议",

        // Spoiler
        "spoiler.reveal": "点击显示隐藏内容",

        // Table of Contents (standalone)
        "toc.heading": "目录",

        // Site metadata
        "site.title": "云梦雨的小屋",
        "site.description": "长门大明神会梦到外星羊么？",

        // Channel sidebar
        "channel.openTelegram": "在 Telegram 中打开",
        "channel.rss": "RSS 订阅",

        // About page
        "about.welcome": "欢迎来到云梦雨的小屋！这里是我的个人博客，记录技术分享、生活随笔以及一些有趣的想法。",
        "about.whoami": "我是谁",
        "about.whoami.p1": "我是一个热爱技术和创造的人。在这里，我分享所学、所感、所想。如果你对技术、生活或其他任何话题感兴趣，欢迎浏览我的文章。",
        "about.blog": "关于博客",
        "about.blog.p1": "这个博客是我个人的数字花园。我在这里记录学习笔记、技术探索和生活感悟。所有内容均为原创，除非另有说明。",
        "about.privacy.p1": "我尊重每一位访问者的隐私。本博客是一个纯静态网站，不收集、不存储、不处理任何个人数据。",
        "about.privacy.link": "查看完整隐私政策",
        "about.contact": "联系方式",
        "about.contact.p1": "如果你想和我交流、合作或有任何问题，可以通过以下方式联系我：",
        "about.email": "邮箱",

        // Privacy policy
        "privacy.effectiveDate": "生效日期",
        "privacy.version": "版本号",
        "privacy.introduction": "导言",
        "privacy.intro.p1": "本隐私政策适用于由本人（下称\"我\"）运营的个人静态博客（下称\"本博客\"）。本博客是一个纯静态网站，不包含任何服务器端程序，不具备数据收集、存储或处理功能。",
        "privacy.intro.p2": "在访问本博客的过程中，您的隐私将得到最大限度的尊重与保护。请您仔细阅读本政策，以了解相关情况。",
        "privacy.infoCollection": "一、信息收集声明",
        "privacy.infoCollection.statement": "本博客不收集您的任何个人信息。",
        "privacy.infoCollection.detail": "具体而言：",
        "privacy.infoList.comments": "本博客有评论区",
        "privacy.infoList.noLogin": "本博客没有用户注册与登录功能",
        "privacy.infoList.noContactForm": "本博客没有联系表单",
        "privacy.infoList.noTracking": "本博客不埋设任何统计代码或追踪器",
        "privacy.infoList.noCookies": "本博客不使用 Cookie（除浏览器正常运行所必需的技术性缓存外，此类缓存不属于个人数据收集行为）",
        "privacy.infoList.noIP": "本博客不主动获取、记录或存储您的 IP 地址、浏览器指纹、访问行为等任何网络身份信息或浏览数据",
        "privacy.infoCollection.hosting": "您访问本博客时，您与博客托管平台（如 GitHub Pages、Cloudflare Pages、Vercel 等）之间直接发生数据交换，相关底层技术日志可能由托管平台或内容分发网络（CDN）产生并受其各自隐私政策约束。我本人无权也无法获取、查看或利用这些原始日志，因此对此类底层数据处理不承担控制者责任。建议您查阅所用托管平台的隐私文档以了解更多信息。",
        "privacy.embeddedContent": "二、嵌入式内容与外链",
        "privacy.embeddedContent.p1": "本博客中的部分文章可能会以纯静态方式嵌入来自第三方平台的内容（例如：GitHub Gist、CodePen、视频网站播放器等），或提供指向其他网站的超链接。这些第三方资源独立运行，其行为不受本博客控制。当您与这些嵌入式内容互动或访问外链时，相应的第三方可能会按照其自身的隐私政策收集、使用您的信息。请在提供任何个人信息前，仔细阅读第三方的隐私条款。",
        "privacy.copyright": "三、知识产权与版权保护",
        "privacy.copyright.p1": "本博客所有原创文章、代码片段、图片及其他智力成果均受《中华人民共和国著作权法》及相关国际版权条约的保护。本博客内容大多采用「署名—非商业性使用—相同方式共享 4.0 中国本地化许可协议」进行授权，具体条款请参见相应页面或代码库中的声明。任何未经许可的抄袭、洗稿、搬运、代码伪原创替换等行为，均构成对本人著作权的侵害。我保留按照法律规定追究侵权方法律责任的权利。所有原创作品的作者署名、版权声明及许可标识，请勿删除或篡改。",
        "privacy.minors": "四、未成年人保护提示",
        "privacy.minors.p1": "本博客内容为技术分享与随笔，主要面向具备独立判断能力的成年人。如果您是未成年人，请在监护人陪同和指导下浏览本博客。本博客不收集任何人的个人信息，因此亦不存在单独针对未成年人的数据收集风险。",
        "privacy.updates": "五、本政策的更新",
        "privacy.updates.p1": "我可能因应法律法规或博客结构的变化而适当调整本隐私政策。更新后的政策将直接替换当前版本并发布于本页面，不设专门通知渠道。建议您在每次访问时留意本页面的最后更新日期。",
        "privacy.contact": "六、联系方式",
        "privacy.contact.p1": "如您对本隐私政策或博客版权许可有任何疑问，可通过以下方式与我取得联系：",
        "privacy.email": "邮箱",
        "privacy.contact.reply": "我会在力所能及的范围内尽快回复。",
        "privacy.corePrinciple": "核心原则：您的访问行为即被视为默认知悉 —— 这是一个不追踪、不收集、不存储任何个人数据的静态博客。而所有原创内容均受法律与协议的双重保护，请尊重创作，引用注明出处。",
    },
    en: {
        // Navigation
        "nav.home": "Home",
        "nav.blog": "Blog",
        "nav.categories": "Categories",
        "nav.about": "About",
        "nav.privacy": "Privacy Policy",
        "nav.breadcrumb": "Breadcrumb",
        "nav.editor": "Editor",
        "nav.skipToContent": "Skip to main content",
        "nav.mainNav": "Main navigation",
        "nav.openMenu": "Open navigation menu",
        "nav.closeMenu": "Close navigation menu",
        "nav.mobileNav": "Mobile navigation",

        // Blog post
        "post.readingTime": "~{minutes} min read",
        "post.lastUpdated": "Last updated",
        "post.openToc": "Open table of contents",
        "post.toc": "Contents",
        "post.closeToc": "Close table of contents",
        "post.backToTop": "Back to top",

        // Post list
        "postList.hideDeepSearch": "Hide DeepSearch posts",
        "postList.noMatchingPosts": "(No matching posts)",

        // Misc
        "misc.noDescription": "No description",
        "misc.noPreview": "No preview",
        "misc.loading": "Loading...",

        // Search modal
        "search.trigger": "Search (Cmd+K)",
        "search.dialog": "Site search",
        "search.close": "Close search",
        "search.label": "Search posts",
        "search.placeholder": "Search posts...",
        "search.emptyHint": "Type to start searching",
        "search.emptyDetail": "Search all posts, TILs, and monthly summaries",
        "search.noResults": "No results found",
        "search.noResultsHint": "Try different keywords",
        "search.resultList": "Search results",
        "search.select": "Select",
        "search.navigate": "Navigate",
        "search.resultCount": "Showing {shown} of {total} results",
        "search.showMore": "Show more",

        // Share sidebar
        "share.twitter": "Share on Twitter",
        "share.telegram": "Share on Telegram",
        "share.label": "Share article",
        "share.copyLink": "Copy link",
        "share.like": "Like",
        "share.unlike": "Unlike",
        "share.copied": "Link copied",

        // Lightbox
        "lightbox.viewImage": "View image",
        "lightbox.close": "Close",
        "lightbox.prev": "Previous",
        "lightbox.next": "Next",

        // Theme
        "theme.toggle": "Toggle theme",
        "theme.light": "Light mode",
        "theme.dark": "Dark mode",
        "theme.system": "Follow system",
        "theme.currentSystem": "{system} (currently {active})",
        "theme.statusMessage": "Current theme: {current}. Click to switch to {next}",

        // Related posts
        "related.heading": "Related Posts",

        // Footer
        "footer.ccLicense": "Content licensed under CC BY-NC-SA 4.0",

        // Spoiler
        "spoiler.reveal": "Click to reveal hidden content",

        // Table of Contents (standalone)
        "toc.heading": "Contents",

        // Site metadata
        "site.title": "Niracler's Museum",
        "site.description": "Does the Great God Nagato Dream of Alien Sheep?",

        // Channel sidebar
        "channel.openTelegram": "Open in Telegram",
        "channel.rss": "RSS Feed",
    },
} as const;

export type UIKey = keyof (typeof ui)["zh"];

/**
 * Get translated UI string. Works in Astro components.
 * For interpolation, use {key} placeholders and pass values object.
 */
export function t(
    locale: Locale | string | undefined,
    key: UIKey,
    values?: Record<string, string | number>,
): string {
    const lang = (locale === "en" ? "en" : "zh") as keyof typeof ui;
    let str: string = ui[lang][key] ?? ui.zh[key] ?? key;
    if (values) {
        for (const [k, v] of Object.entries(values)) {
            str = str.replace(`{${k}}`, String(v));
        }
    }
    return str;
}

/**
 * Get locale from Astro's currentLocale or fall back to "zh".
 */
export function getLocale(astroLocale: string | undefined): Locale {
    return astroLocale === "en" ? "en" : "zh";
}
