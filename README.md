# Aleph Subject 5 · AI 인수인계 비교 보고서

같은 고정 검사 10개와 사용 상한을 적용하여 두 AI 세션의 순차 인수인계 결과를 비교한 공개 보고서입니다.

## 공개 결과

- 결과 페이지: <https://ai-handoff-continuity-report.anseokju02.chatgpt.site>
- AI A·AI B 고정 검사: 각각 10/10 PASS
- 결과 ZIP SHA-256: `e715e39cd9d35e4b9b575bfd0a05b1ecb67e085e1cfbe08b122aef0a262497aa`
- 인수인계 버전 ID: `2cd4a2651b382db26d14fb46df01bd3ea48235ed`

## 구성

- `index.html`: 이름을 가린 공개 비교 보고서
- `scripts/verify.mjs`: 표시 내용·비밀값·가림 구간 검사
- `evidence/AI_A_handoff.md`: AI A → AI B 인수인계 문서
- `evidence/AI_A_test_report.md`: 고정 검사 결과
- `evidence/source-manifest.json`: 시작·결과 버전 및 ZIP 해시

두 결과 ZIP은 공개 결과 페이지의 다운로드 버튼으로 받을 수 있습니다. 저장소에는 개인정보·비밀번호·토큰·API 키를 포함하지 않습니다.

## 확인

```text
node scripts/verify.mjs
```

정상 결과는 `TOTAL 12/12 PASS`입니다.
