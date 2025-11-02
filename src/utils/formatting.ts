// src/utils/formatting.ts

/**
 * Formata um número para o padrão monetário brasileiro (ex: 700.000,00).
 * @param value O número a ser formatado.
 * @returns A string formatada.
 */
export function formatCurrency(value: number): string {
  // Se o valor for NaN ou Infinito (de um cálculo que falhou), 
  // retorna "N/A"
  if (isNaN(value) || !isFinite(value)) {
    return "N/A";
  }

  // toLocaleString('pt-BR') faz exatamente a formatação que você pediu:
  // - Separador de milhar: '.'
  // - Separador decimal: ','
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}