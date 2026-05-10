import type { APIRoute } from "astro";
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

export const prerender = false;

const ALLOWED_COLLECTIONS = ["blog", "monthly", "til"];

export const POST: APIRoute = async ({ request }) => {
    if (import.meta.env.PROD) {
        return new Response(JSON.stringify({ error: "此功能仅在开发环境可用" }), {
            status: 403,
            headers: { "Content-Type": "application/json" },
        });
    }

    let body: { collection?: string; filename?: string; content?: string };
    try {
        body = await request.json();
    } catch {
        return new Response(JSON.stringify({ error: "请求体解析失败" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const { collection, filename, content } = body;

    if (!collection || !filename || content === undefined || content === null) {
        return new Response(
            JSON.stringify({ error: "缺少必填字段: collection, filename, content" }),
            { status: 400, headers: { "Content-Type": "application/json" } },
        );
    }

    if (!ALLOWED_COLLECTIONS.includes(collection)) {
        return new Response(
            JSON.stringify({ error: `无效的集合: ${collection}，允许: ${ALLOWED_COLLECTIONS.join(", ")}` }),
            { status: 400, headers: { "Content-Type": "application/json" } },
        );
    }

    const safeFilename = filename.replace(/[^a-zA-Z0-9\u4e00-\u9fff_-]/g, "");
    if (!safeFilename) {
        return new Response(
            JSON.stringify({ error: "文件名无效" }),
            { status: 400, headers: { "Content-Type": "application/json" } },
        );
    }

    const finalFilename = safeFilename.endsWith(".md") ? safeFilename : `${safeFilename}.md`;
    const contentDir = join(process.cwd(), "src", "content", collection);

    if (!existsSync(contentDir)) {
        mkdirSync(contentDir, { recursive: true });
    }

    const filePath = join(contentDir, finalFilename);

    if (existsSync(filePath)) {
        return new Response(
            JSON.stringify({ error: `文件已存在: src/content/${collection}/${finalFilename}，请先删除或更换文件名` }),
            { status: 409, headers: { "Content-Type": "application/json" } },
        );
    }

    try {
        writeFileSync(filePath, content, "utf-8");
        return new Response(
            JSON.stringify({
                success: true,
                path: `src/content/${collection}/${finalFilename}`,
                message: `文章已写入 src/content/${collection}/${finalFilename}`,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } },
        );
    } catch (err: any) {
        return new Response(
            JSON.stringify({ error: `写入文件失败: ${err.message}` }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        );
    }
};
