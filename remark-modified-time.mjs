import { execSync } from "node:child_process";
import { statSync } from "node:fs";

export function remarkModifiedTime() {
    return (_tree, file) => {
        const filepath = file.history[0];
        if (!filepath) return;

        try {
            const timestamp = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`, {
                encoding: "utf-8",
                stdio: ["pipe", "pipe", "ignore"],
            });
            file.data.astro.frontmatter.lastModified = timestamp.toString().trim();

            const remoteUrl = execSync("git config --get remote.origin.url", {
                encoding: "utf-8",
                stdio: ["pipe", "pipe", "ignore"],
            }).trim();

            const githubUrl = remoteUrl
                .replace(/\.git$/, "")
                .replace(/^git@github\.com:/, "https://github.com/");

            const relativeFilepath = filepath.replace(`${process.cwd()}/`, "");
            file.data.astro.frontmatter.lastModifiedCommitUrl = `${githubUrl}/commits/master/${relativeFilepath}`;
        } catch {
            try {
                const stats = statSync(filepath);
                file.data.astro.frontmatter.lastModified = stats.mtime.toISOString();
                file.data.astro.frontmatter.lastModifiedCommitUrl = null;
            } catch (fsError) {
                console.warn(`无法获取 ${filepath} 的修改时间:`, fsError);
            }
        }
    };
}
