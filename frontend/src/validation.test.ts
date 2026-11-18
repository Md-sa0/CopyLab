import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  formatProductValidationError,
  parseAttributes,
  productSchema,
} from "./validation.ts";

const valid = {
  sku: "SKU-01",
  name: "Produto teste",
  category: "Eletrônicos",
  target_audience: "Estudantes",
  technical_attributes: { cor: "azul" },
  key_benefits: ["Portátil"],
};
describe("contrato do catálogo", () => {
  it("normaliza espaços e Unicode", () =>
    assert.equal(
      productSchema.parse({ ...valid, name: " Cafe\u0301 " }).name,
      "Café",
    ));
  it("rejeita campos em branco", () =>
    assert.equal(
      productSchema.safeParse({ ...valid, name: "  " }).success,
      false,
    ));
  it("rejeita coerção de números e campos extras", () => {
    assert.equal(productSchema.safeParse({ ...valid, sku: 12 }).success, false);
    assert.equal(productSchema.safeParse({ ...valid, unexpected: 1 }).success, false);
  });
  it("exige atributos e benefícios únicos", () => {
    assert.equal(
      productSchema.safeParse({ ...valid, technical_attributes: {} }).success,
      false,
    );
    assert.equal(
      productSchema.safeParse({
        ...valid,
        key_benefits: ["Portátil", " Portátil "],
      }).success,
      false,
    );
  });
  it("preserva dois pontos nos valores e rejeita chaves duplicadas", () => {
    assert.deepEqual(parseAttributes("horário: 10:30"), { horário: "10:30" });
    assert.throws(
      () => parseAttributes("cor: azul\n cor: verde"),
      { message: /Há atributos repetidos\./ },
    );
    assert.throws(
      () => parseAttributes("cor: azul\nsem separador"),
      { message: /Linha 2:/ },
    );
    assert.throws(() => parseAttributes("cor: "), { message: /informe o valor depois/ });
  });
  it("explica erros do cadastro sem expor mensagens técnicas", () => {
    const invalid = productSchema.safeParse({ ...valid, sku: "SKU inválido" });
    if (invalid.success) throw new Error("O SKU deveria ser rejeitado.");
    assert.match(formatProductValidationError(invalid.error), /Confira o SKU/);
  });
});
