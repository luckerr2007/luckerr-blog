(function () {
  var TOAST_DURATION = 2500;
  var UPLOAD_API = "/api/upload-article";

  var tags = [];
  var rawContent = "";
  var originalFileName = "";
  var vditorInstance = null;
  var vditorReady = false;

  function detectTheme() {
    var theme = document.documentElement.dataset.theme;
    if (theme === "dark") return "dark";
    if (theme === "light") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff-]/g, "")
      .replace(/-+/g, "-");
  }

  function escapeYamlString(str) {
    return str.replace(/"/g, '\\"');
  }

  function formatDate(date) {
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, "0");
    var d = String(date.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  function parseFrontmatter(text) {
    var result = { metadata: {}, body: text };
    var match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    if (!match) return result;

    result.body = text.slice(match[0].length);
    var yaml = match[1];

    var lines = yaml.split(/\r?\n/);
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var colonIdx = line.indexOf(":");
      if (colonIdx === -1) continue;

      var key = line.slice(0, colonIdx).trim();
      var value = line.slice(colonIdx + 1).trim();

      if (key === "tags") {
        if (value.startsWith("[")) {
          var tagStr = value.replace(/^\[/, "").replace(/\]$/, "").trim();
          if (tagStr) {
            result.metadata.tags = tagStr
              .split(",")
              .map(function (t) { return t.trim().replace(/^["']|["']$/g, ""); })
              .filter(Boolean);
          } else {
            result.metadata.tags = [];
          }
        } else if (value === "") {
          var tagLines = [];
          for (var j = i + 1; j < lines.length; j++) {
            var tagMatch = lines[j].match(/^\s+-\s+["']?(.+?)["']?\s*$/);
            if (tagMatch) {
              tagLines.push(tagMatch[1]);
            } else {
              break;
            }
          }
          if (tagLines.length) {
            result.metadata.tags = tagLines;
            i = j - 1;
          }
        }
      } else {
        result.metadata[key] = value.replace(/^["']|["']$/g, "");
      }
    }

    return result;
  }

  function generateFrontmatter() {
    var title = (document.getElementById("fm-title").value || "").trim();
    var slug = (document.getElementById("fm-slug").value || "").trim();
    var pubDate = (document.getElementById("fm-pubDate").value || "").trim();
    var category = (document.getElementById("fm-category").value || "").trim();
    var lang = (document.getElementById("fm-lang").value || "").trim();
    var description = (document.getElementById("fm-description").value || "").trim();
    var encryptedEl = document.getElementById("fm-encrypted");
    var encrypted = encryptedEl ? encryptedEl.checked : false;
    var password = (document.getElementById("fm-password").value || "").trim();
    var passwordHint = (document.getElementById("fm-passwordHint").value || "").trim();

    var lines = [];
    lines.push("---");
    lines.push('title: "' + escapeYamlString(title) + '"');
    if (slug) lines.push('slug: "' + escapeYamlString(slug) + '"');
    lines.push("pubDate: " + pubDate);
    if (category) lines.push('category: "' + escapeYamlString(category) + '"');
    if (lang) lines.push('lang: "' + escapeYamlString(lang) + '"');
    if (tags.length > 0) {
      lines.push("tags:");
      for (var i = 0; i < tags.length; i++) {
        lines.push('  - "' + escapeYamlString(tags[i]) + '"');
      }
    }
    if (description) lines.push('description: "' + escapeYamlString(description) + '"');
    if (encrypted) {
      lines.push("encrypted: true");
      if (password) lines.push('password: "' + escapeYamlString(password) + '"');
      if (passwordHint) lines.push('passwordHint: "' + escapeYamlString(passwordHint) + '"');
    }
    lines.push("---");
    return lines.join("\n");
  }

  function buildFullContent() {
    return generateFrontmatter() + "\n" + rawContent;
  }

  function showToast(message, type) {
    var toast = document.querySelector(".editor-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "editor-toast";
      document.body.appendChild(toast);
    }
    toast.className = "editor-toast";
    if (type === "success") toast.classList.add("editor-toast--success");
    if (type === "error") toast.classList.add("editor-toast--error");

    toast.textContent = message;
    toast.classList.add("editor-toast--visible");
    setTimeout(function () {
      toast.classList.remove("editor-toast--visible");
    }, TOAST_DURATION);
  }

  function renderTags() {
    var container = document.getElementById("fm-tags-container");
    if (!container) return;
    var input = document.getElementById("fm-tags-input");
    container.innerHTML = "";
    for (var i = 0; i < tags.length; i++) {
      var tag = document.createElement("span");
      tag.className = "frontmatter-tag";
      tag.setAttribute("data-tag", tags[i]);
      tag.textContent = tags[i];
      var removeBtn = document.createElement("span");
      removeBtn.className = "frontmatter-tag-remove";
      removeBtn.textContent = "\u00d7";
      tag.appendChild(removeBtn);
      container.appendChild(tag);
    }
    if (input) container.appendChild(input);
  }

  function updatePreview() {
    var previewEl = document.getElementById("preview-content");
    if (!previewEl) return;

    if (vditorReady && vditorInstance) {
      vditorInstance.setValue(rawContent);
      previewEl.innerHTML = vditorInstance.getHTML();
    } else {
      previewEl.innerHTML = "<pre>" + rawContent.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</pre>";
    }
  }

  function populateFields(metadata) {
    var fieldMap = {
      "fm-title": metadata.title || "",
      "fm-slug": metadata.slug || "",
      "fm-pubDate": metadata.pubDate || formatDate(new Date()),
      "fm-category": metadata.category || "",
      "fm-lang": metadata.lang || "zh",
      "fm-description": metadata.description || "",
      "fm-password": metadata.password || "",
      "fm-passwordHint": metadata.passwordHint || "",
    };

    var keys = Object.keys(fieldMap);
    for (var i = 0; i < keys.length; i++) {
      var el = document.getElementById(keys[i]);
      if (el) el.value = fieldMap[keys[i]];
    }

    if (metadata.encrypted === "true" || metadata.encrypted === true) {
      var encryptedEl = document.getElementById("fm-encrypted");
      var fieldsDiv = document.getElementById("fm-encryption-fields");
      if (encryptedEl) encryptedEl.checked = true;
      if (fieldsDiv) fieldsDiv.style.display = "grid";
    }

    if (metadata.tags && Array.isArray(metadata.tags)) {
      tags = metadata.tags.slice();
      renderTags();
    }

    if (!metadata.pubDate) {
      var dateEl = document.getElementById("fm-pubDate");
      if (dateEl) dateEl.value = formatDate(new Date());
    }
  }

  function handleFile(file) {
    if (!file) return;
    if (!file.name.match(/\.(md|mdx)$/i)) {
      showToast("仅支持 .md / .mdx 格式文件", "error");
      return;
    }

    originalFileName = file.name.replace(/\.(md|mdx)$/i, "");
    var reader = new FileReader();
    reader.onload = function (e) {
      var text = e.target.result;
      var parsed = parseFrontmatter(text);
      rawContent = parsed.body;
      populateFields(parsed.metadata);

      if (!document.getElementById("fm-slug").value) {
        document.getElementById("fm-slug").value = slugify(document.getElementById("fm-title").value || originalFileName);
      }

      document.getElementById("upload-zone").style.display = "none";
      document.getElementById("editor-body").style.display = "";
      document.getElementById("file-info").style.display = "";
      document.getElementById("file-name").textContent = file.name;
      document.getElementById("btn-upload").disabled = false;

      updatePreview();
      updateCollectionHint();
    };
    reader.readAsText(file);
  }

  function clearFile() {
    rawContent = "";
    originalFileName = "";
    tags = [];
    renderTags();

    var fields = ["fm-title", "fm-slug", "fm-pubDate", "fm-category", "fm-description", "fm-password", "fm-passwordHint"];
    for (var i = 0; i < fields.length; i++) {
      var el = document.getElementById(fields[i]);
      if (el) el.value = "";
    }
    var langEl = document.getElementById("fm-lang");
    if (langEl) langEl.value = "zh";
    var collEl = document.getElementById("fm-collection");
    if (collEl) collEl.value = "blog";
    var encEl = document.getElementById("fm-encrypted");
    if (encEl) encEl.checked = false;
    var encFields = document.getElementById("fm-encryption-fields");
    if (encFields) encFields.style.display = "none";

    document.getElementById("upload-zone").style.display = "";
    document.getElementById("editor-body").style.display = "none";
    document.getElementById("file-info").style.display = "none";
    document.getElementById("btn-upload").disabled = true;
    document.getElementById("preview-content").innerHTML = "";
  }

  function updateCollectionHint() {
    var collection = (document.getElementById("fm-collection").value || "blog");
    var slug = (document.getElementById("fm-slug").value || "article").trim();
    var hint = document.getElementById("fm-collection-hint");
    if (hint) hint.textContent = "src/content/" + collection + "/" + slug + ".md";
  }

  function initUploadZone() {
    var zone = document.getElementById("upload-zone");
    var fileInput = document.getElementById("file-input");
    if (!zone || !fileInput) return;

    zone.addEventListener("click", function () {
      fileInput.click();
    });

    fileInput.addEventListener("change", function () {
      if (fileInput.files && fileInput.files[0]) {
        handleFile(fileInput.files[0]);
      }
    });

    zone.addEventListener("dragover", function (e) {
      e.preventDefault();
      zone.classList.add("is-dragover");
    });

    zone.addEventListener("dragleave", function (e) {
      e.preventDefault();
      zone.classList.remove("is-dragover");
    });

    zone.addEventListener("drop", function (e) {
      e.preventDefault();
      zone.classList.remove("is-dragover");
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    });
  }

  function initTagInput() {
    var container = document.getElementById("fm-tags-container");
    var input = document.getElementById("fm-tags-input");
    if (!container || !input) return;

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        var val = input.value.trim();
        if (val && tags.indexOf(val) === -1) {
          tags.push(val);
          renderTags();
          updatePreview();
        }
        input.value = "";
      } else if (e.key === "Backspace" && input.value === "" && tags.length > 0) {
        tags.pop();
        renderTags();
        updatePreview();
      }
    });

    container.addEventListener("click", function (e) {
      if (e.target.classList.contains("frontmatter-tag-remove")) {
        var tagEl = e.target.parentElement;
        var tagText = tagEl.getAttribute("data-tag");
        var idx = tags.indexOf(tagText);
        if (idx !== -1) {
          tags.splice(idx, 1);
          renderTags();
          updatePreview();
        }
      }
    });
  }

  function initEncryptionToggle() {
    var checkbox = document.getElementById("fm-encrypted");
    var fieldsDiv = document.getElementById("fm-encryption-fields");
    if (!checkbox || !fieldsDiv) return;

    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        fieldsDiv.style.display = "grid";
      } else {
        fieldsDiv.style.display = "none";
        var pw = document.getElementById("fm-password");
        var hint = document.getElementById("fm-passwordHint");
        if (pw) pw.value = "";
        if (hint) hint.value = "";
      }
    });
  }

  function initCollectionSelector() {
    var select = document.getElementById("fm-collection");
    if (!select) return;
    select.addEventListener("change", function () {
      updateCollectionHint();
    });
  }

  function initSlugSync() {
    var slugInput = document.getElementById("fm-slug");
    if (!slugInput) return;
    slugInput.addEventListener("input", function () {
      updateCollectionHint();
    });
  }

  function initFrontmatterCollapse() {
    var btn = document.querySelector(".frontmatter-collapse-btn");
    var section = document.querySelector(".frontmatter-section");
    if (!btn || !section) return;

    var isOpen = true;
    btn.setAttribute("aria-expanded", "true");

    btn.addEventListener("click", function () {
      isOpen = !isOpen;
      if (isOpen) {
        section.classList.remove("frontmatter-section--collapsed");
      } else {
        section.classList.add("frontmatter-section--collapsed");
      }
      btn.setAttribute("aria-expanded", String(isOpen));
    });
  }

  function initUploadButton() {
    var btn = document.getElementById("btn-upload");
    if (!btn) return;

    btn.addEventListener("click", function () {
      var title = (document.getElementById("fm-title").value || "").trim();
      if (!title) {
        showToast("请填写文章标题", "error");
        return;
      }

      var slug = (document.getElementById("fm-slug").value || "").trim();
      if (!slug) {
        showToast("请填写 Slug / 文件名", "error");
        return;
      }

      var collection = (document.getElementById("fm-collection").value || "blog");
      var content = buildFullContent();

      btn.disabled = true;
      btn.textContent = "上传中...";

      fetch(UPLOAD_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collection: collection,
          filename: slug,
          content: content,
        }),
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success) {
            showToast(data.message || "上传成功", "success");
          } else {
            showToast(data.error || "上传失败", "error");
          }
        })
        .catch(function (err) {
          showToast("网络错误: " + err.message, "error");
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = "上传至文件夹";
        });
    });
  }

  function initClearButton() {
    var btn = document.getElementById("btn-clear");
    if (!btn) return;
    btn.addEventListener("click", clearFile);
  }

  function initLivePreview() {
    var fields = ["fm-title", "fm-slug", "fm-category", "fm-description", "fm-password", "fm-passwordHint"];
    for (var i = 0; i < fields.length; i++) {
      var el = document.getElementById(fields[i]);
      if (el) {
        el.addEventListener("input", updatePreview);
      }
    }
  }

  function initVditor() {
    if (typeof Vditor === "undefined") return;
    var theme = detectTheme();
    vditorInstance = new Vditor("vditor-render", {
      mode: "ir",
      theme: theme === "dark" ? "dark" : "classic",
      preview: {
        theme: {
          current: theme === "dark" ? "dark" : "light",
        },
      },
      toolbar: [],
      cache: { enable: false },
      height: "auto",
      after: function () {
        vditorReady = true;
      },
    });
  }

  function initThemeObserver() {
    var observer = new MutationObserver(function () {
      if (!vditorInstance) return;
      var theme = detectTheme();
      vditorInstance.setTheme(
        theme === "dark" ? "dark" : "classic",
        theme === "dark" ? "dark" : "light"
      );
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }

  function init() {
    initVditor();
    initThemeObserver();
    initUploadZone();
    initTagInput();
    initEncryptionToggle();
    initCollectionSelector();
    initSlugSync();
    initFrontmatterCollapse();
    initUploadButton();
    initClearButton();
    initLivePreview();
  }

  if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
