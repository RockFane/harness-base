import Link from 'next/link';
import { APP_NAME } from '@app/contracts';

export default function HomePage() {
  return (
    <main className="workspace">
      <header className="topbar">
        <Link className="brand" href="/" aria-label={`${APP_NAME}首页`}>
          <span className="brand-mark" aria-hidden="true">A</span>
          {APP_NAME}
        </Link>
        <span className="tag">monorepo 起点</span>
      </header>

      <section className="hero" aria-labelledby="welcome-title">
        <p className="eyebrow">工程已就绪，业务待实现</p>
        <h1 id="welcome-title">{APP_NAME}</h1>
        <p className="intro">
          这里只有一个可运行的骨架：Next.js 页面、NestJS 服务和前后端共享的类型包。
          需求、页面和接口都还没写。
        </p>
        <div className="actions">
          <a className="button primary" href="/api/server-health">查看后端健康检查</a>
        </div>
        <p className="hint">未启动 NestJS 时该接口返回 503，属预期行为。</p>
      </section>

      <section className="learning-path" aria-label="工程结构">
        <article className="stage">
          <span className="stage-number">01</span>
          <p className="stage-label">pnpm dev</p>
          <h2>packages/web</h2>
          <p>Next.js App Router 页面与服务端 BFF，端口 3000。不依赖数据库、凭证或 NestJS 即可运行。</p>
          <span className="stage-status">前端工程已就绪</span>
        </article>
        <article className="stage">
          <span className="stage-number">02</span>
          <p className="stage-label">pnpm dev:full</p>
          <h2>packages/server</h2>
          <p>NestJS 服务，端口 3001。与 web 同时启动后走通 Next 到 Nest 的请求；共享类型来自 contracts。</p>
          <span className="stage-status muted">后端按需启动</span>
        </article>
      </section>

      <footer>业务页面、接口、数据与部署流程按登记的需求逐步实现。</footer>
    </main>
  );
}
