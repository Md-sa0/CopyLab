# Situação de segurança

## Correção posterior à entrega acadêmica

O frontend passou a usar Rsbuild para compilar e servir a aplicação e o executor nativo do Node.js para rodar os testes unitários. A troca removeu o picomatch da árvore de dependências. Após uma instalação limpa (`npm ci`), `npm audit --audit-level=high` reportou zero vulnerabilidades conhecidas nas dependências npm. O GitHub Actions continua executando a auditoria completa do frontend.

A tag `tcc-2026.2-final` continua identificando a versão avaliada no artigo. O registro histórico abaixo descreve o estado daquela versão.

## Situação registrada em 17/11/2026

O npm audit identificou GHSA-fc5q-39xc-vjpf (picomatch <=4.0.7, dependência transitiva das ferramentas Vite/Vitest). O aviso foi atualizado em 17/11 e não lista versão corrigida. Não foi aplicado downgrade automático nem desabilitada a auditoria.

Fonte: https://github.com/advisories/GHSA-fc5q-39xc-vjpf

A execução GitHub Actions 44216388478 aprovou backend, integração Compose e demonstração localhost. O job frontend aprovou testes/build e falhou na auditoria. A tag final identifica uma entrega acadêmica reproduzível, não certifica prontidão para produção nem ausência de vulnerabilidades.

A demonstração compose.local.yml está vinculada a 127.0.0.1. Não exponha o servidor de desenvolvimento Vite publicamente. A análise de explorabilidade específica e a atualização da dependência quando houver correção permanecem pendentes. A ausência de falhas funcionais não elimina esse risco.
