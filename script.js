const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const subtabs = document.querySelectorAll(".subtab");
const codes = document.querySelectorAll(".code");
const runBtn = document.getElementById("run");
const preview = document.getElementById("preview");
const downloadBtn = document.getElementById("download");
const themeColor = document.getElementById("themeColor");
const fontSize = document.getElementById("fontSize");

tabs.forEach(tab => tab.addEventListener("click", () => {
  tabs.forEach(t => t.classList.remove("active"));
  panels.forEach(p => p.classList.remove("active"));
  tab.classList.add("active");
  document.getElementById(tab.dataset.target).classList.add("active");
}));

subtabs.forEach(subtab => subtab.addEventListener("click", () => {
  subtabs.forEach(s => s.classList.remove("active"));
  codes.forEach(c => c.classList.remove("active"));
  subtab.classList.add("active");
  document.getElementById(subtab.dataset.target).classList.add("active");
}));

function updatePreview() {
  const html = document.getElementById("html").value;
  const css = `<style>${document.getElementById("css").value}</style>`;
  const js = `<script>${document.getElementById("js").value}<\/script>`;
  preview.srcdoc = html + css + js;
}

runBtn.addEventListener("click", updatePreview);
["html","css","js"].forEach(id => {
  document.getElementById(id).addEventListener("input", updatePreview);
});

downloadBtn.addEventListener("click", () => {
  const zip = new JSZip();
  zip.file("index.html", document.getElementById("html").value);
  zip.file("style.css", document.getElementById("css").value);
  zip.file("script.js", document.getElementById("js").value);
  zip.generateAsync({ type: "blob" }).then(content => saveAs(content, "project.zip"));
});

themeColor.addEventListener("input", e => document.body.style.color = e.target.value);
fontSize.addEventListener("input", e => codes.forEach(c => c.style.fontSize = e.target.value + "px"));