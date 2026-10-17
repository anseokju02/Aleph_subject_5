import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const html = await readFile(join(root, "index.html"), "utf8");
const manifest = JSON.parse(await readFile(join(root, "evidence/source-manifest.json"), "utf8"));

const checks = [
  ["고정 검사 10개 표시", /T05-01[\s\S]*T05-10/.test(html)],
  ["후보 A 실제 시간 표시", html.includes("2분 47초")],
  ["후보 B 실제 시간 표시", html.includes("3분 00초")],
  ["요청 수 표시", html.includes("1회 / 12회") && html.includes("2회 / 12회")],
  ["두 후보 10/10 PASS", (html.match(/10\/10 PASS/g) || []).length >= 2],
  ["오류 0회 표시", html.includes("오류 0회")],
  ["버전 ID 일치", html.includes(manifest.result.version_id)],
  ["ZIP 해시 일치", html.includes(manifest.result.zip_sha256)],
  ["AI와 내 판단 3줄", html.includes("AI에게 맡긴 일") && html.includes("내가 직접 판단한 일") && html.includes("AI 제안을 따르지 않은 일")],
  ["재현·통과 확인 4가지", html.includes("어디로 가나요?") && html.includes("3단계 이내 무엇을 하나요?") && html.includes("무엇이 보이면 통과인가요?") && html.includes("안 될 때 무엇이 보이나요?")],
];

const blindZone = html.slice(html.indexOf('id="blind-comparison"'), html.indexOf('id="evidence"'));
checks.push(["판정 구간 모델·서비스 이름 비공개", !/(ChatGPT|Gemini|OpenAI|Google)/i.test(blindZone)]);

const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /(?:api[_-]?key|token|password)\s*[:=]\s*["'][^"']{8,}["']/i,
  /sk-[A-Za-z0-9_-]{20,}/,
];
checks.push(["비밀값 원문 0건", !secretPatterns.some((pattern) => pattern.test(html))]);

let failed = 0;
for (const [label, pass] of checks) {
  console.log(`${pass ? "PASS" : "FAIL"} ${label}`);
  if (!pass) failed += 1;
}

console.log(`TOTAL ${checks.length - failed}/${checks.length} PASS`);
if (failed) process.exit(1);
