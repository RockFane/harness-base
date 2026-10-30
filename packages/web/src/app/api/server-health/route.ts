import { isHealthResponse } from '@app/contracts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const apiUrl = process.env.SERVER_API_URL ?? 'http://127.0.0.1:3001/api';
    const response = await fetch(`${apiUrl.replace(/\/+$/, '')}/health`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(2500),
    });

    if (!response.ok) throw new Error('Upstream unavailable');

    const health: unknown = await response.json();
    if (!isHealthResponse(health)) throw new Error('Unexpected health response');

    return Response.json(health);
  } catch {
    return Response.json(
      {
        status: 'unavailable',
        message: '无法连接后端。请启动 NestJS 服务（pnpm dev:server），并检查 SERVER_API_URL 配置。',
      },
      { status: 503 },
    );
  }
}
