// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import pagefind from "astro-pagefind";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeFigure from "rehype-figure";
import rehypeImgSize from "rehype-img-size";
import rehypeKatex from "rehype-katex";
import rehypeMermaid from "rehype-mermaid";
import rehypePicture from "rehype-picture";
import rehypeSlug from "rehype-slug";
import { remarkAlert } from "remark-github-blockquote-alert";
import remarkMath from "remark-math";
import Icons from "unplugin-icons/vite";
import { remarkModifiedTime } from "./remark-modified-time.mjs";

// https://astro.build/config
export default defineConfig({
    site: "https://luckerr2007.github.io",
    base: "/luckerr-blog",
    trailingSlash: "never",
    output: "static",
    integrations: [
        mdx(),
        sitemap({
            i18n: {
                defaultLocale: "zh",
                locales: {
                    zh: "zh-CN",
                    en: "en-US",
                },
            },
        }),
        pagefind(),
    ],

    markdown: {
        remarkPlugins: [remarkMath, remarkAlert, remarkModifiedTime],
        shikiConfig: {
            themes: {
                light: "github-light",
                dark: "catppuccin-mocha",
            },
            defaultColor: false,
        },
        syntaxHighlight: {
            excludeLangs: ["mermaid"],
        },
        rehypePlugins: [
            rehypeSlug,
            [
                rehypeAutolinkHeadings,
                {
                    behavior: "prepend",
                    properties: {
                        class: "anchor-link",
                        ariaHidden: true,
                        tabIndex: -1,
                    },
                },
            ],
            [
                rehypeMermaid,
                {
                    strategy: "pre-mermaid",
                },
            ],
            rehypePicture,
            [rehypeImgSize, { dir: "./public" }],
            rehypeFigure,
            rehypeKatex,
        ],
    },

    i18n: {
        defaultLocale: "zh",
        locales: ["zh", "en"],
        routing: {
            prefixDefaultLocale: false,
        },
    },

    vite: {
        plugins: [
            tailwindcss(),
            Icons({
                compiler: "astro",
                autoInstall: false,
            }),
        ],
    },
});
