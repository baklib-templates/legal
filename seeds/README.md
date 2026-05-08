## Legal Hub 模板 Seeds 说明

本主题的页面结构遵循：

- **语言（URL 前缀）**：`/en/`、`/zh-CN/` …
- **栏目（分类）**：`/en/terms/`、`/en/privacy/`、`/en/security/` …
- **子页面（政策/条款/清单）**：`/en/terms/terms-of-service/` 等

### 1. 自动创建（推荐）

使用本主题自带的：

- `seeds/001_site.yml`：站点全局设置（品牌名、语言前缀、GeoIP 跳转开关等）
- `seeds/002_pages.yml`：语言/栏目/政策的示例内容

### 2. 手动创建清单（如不使用导入）

以英语为例（`/en/`）：

- `/en/`（模板：`language`）\n  - `/en/terms/`（模板：`channel`）\n    - `/en/terms/terms-of-service/`（模板：`policy`）\n    - `/en/terms/acceptable-use-policy/`（模板：`policy`）\n    - `/en/terms/sla/`（模板：`policy`）\n  - `/en/privacy/`（模板：`channel`）\n    - `/en/privacy/privacy-policy/`（模板：`policy`）\n    - `/en/privacy/cookie-policy/`（模板：`policy`）\n    - `/en/privacy/data-processing-agreement/`（模板：`policy`）\n  - `/en/compliance/`（模板：`channel`）\n    - `/en/compliance/brand-guidelines/`（模板：`policy`）\n    - `/en/compliance/dmca/`（模板：`policy`）\n    - `/en/compliance/export-controls/`（模板：`policy`）\n  - `/en/security/`（模板：`channel`）\n    - `/en/security/security-overview/`（模板：`policy`）\n  - `/en/subprocessors/`（模板：`channel`）\n    - `/en/subprocessors/list/`（模板：`policy`）

中文示例（`/zh-CN/`）在 seeds 里只放了最小样例，后续可按同样结构补齐更多栏目与政策。

### 3. 上线前必填替换清单

- **公司信息**：公司法定名称、地址\n- **邮箱**：`legal_contact_email`、`privacy_contact_email`、（可选）`dpo_contact_email`\n- **适用地区/司法辖区**：`jurisdiction`\n- **DPA/Privacy 中的子处理方与数据驻留**：请替换为真实供应商与区域信息\n- **安全与合规声明**：ISO/SOC2/漏洞披露、出口管制等文本应由法务/合规确认

