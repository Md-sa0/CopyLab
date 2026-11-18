# Situação de segurança em 17/11/2026

O npm audit identificou GHSA-fc5q-39xc-vjpf (picomatch <=4.0.7, dependência transitiva das ferramentas Vite/Vitest). O aviso foi atualizado em 17/11 e não lista versão corrigida. Não foi aplicado downgrade automático nem desabilitada a auditoria.

Fonte: https://github.com/advisories/GHSA-fc5q-39xc-vjpf

A execução GitHub Actions 44216388478 aprovou backend, integração Compose e demonstração localhost. O job frontend aprovou testes/build e falhou na auditoria. A tag final identifica uma entrega acadêmica reproduzível, não certifica prontidão para produção nem ausência de vulnerabilidades.

A demonstração compose.local.yml está vinculada a 127.0.0.1. Não exponha o servidor de desenvolvimento Vite publicamente. A análise de explorabilidade específica e a atualização da dependência quando houver correção permanecem pendentes. A ausência de falhas funcionais não elimina esse risco.
