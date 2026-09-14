import React, { useState } from 'react';

const TERMOS = [
  { t: 'Preço Médio (PM)', d: 'É o preço médio ponderado que você pagou por um ativo, considerando todas as compras (e ajustado nas vendas). Indica seu custo real por cota.' },
  { t: 'Valor de Mercado', d: 'É quanto sua carteira vale hoje, com base na cotação atual de cada ativo multiplicada pela quantidade que você possui.' },
  { t: 'Valor Aplicado', d: 'É o total em dinheiro que você efetivamente investiu na carteira (somatório de todas as compras).' },
  { t: 'L/P (Lucro/Prejuízo)', d: 'É a diferença entre o valor de mercado atual e o valor que você aplicou. Positivo = lucro; negativo = prejuízo.' },
  { t: 'Rentabilidade', d: 'É o percentual de ganho ou perda da sua carteira em relação ao valor aplicado. Mostra o desempenho do seu investimento.' },
  { t: 'Proventos', d: 'São pagamentos recebidos dos ativos: dividendos, juros sobre capital próprio (JCP) e rendimentos. É o dinheiro que o ativo te distribui.' },
  { t: 'Dividend Yield (DY)', d: 'É a relação entre os proventos recebidos e o valor de mercado da carteira. Indica o retorno em renda passiva percentual.' },
  { t: 'Segmento', d: 'É a classe do ativo: Ações, FIIs, ETFs, Cripto, etc. Ajuda a diversificar e controlar o risco por setor.' },
  { t: 'Diversificação', d: 'É distribuir seus investimentos em diferentes ativos e segmentos para reduzir o risco da carteira.' },
  { t: 'Limite por Segmento', d: 'É o percentual máximo que você define para cada segmento da carteira, evitando concentração excessiva.' },
  { t: 'Juros Compostos', d: 'É quando os juros gerados passam a também render juros. Quanto mais tempo, maior o efeito bola de neve sobre o patrimônio.' },
  { t: 'Aporte Mensal', d: 'É um valor fixo que você adiciona à carteira todo mês, ajudando a acelerar o crescimento do patrimônio.' },
  { t: 'JCP (Juros sobre Capital Próprio)', d: 'É uma forma de distribuição de lucros da empresa aos acionistas, com benefício fiscal (isento de IR na fonte).' },
  { t: 'ETF', d: 'Fundo que replica um índice (como o IBOV). Permite investir em dezenas de ativos de uma só vez, de forma simples e barata.' },
  { t: 'FII (Fundo Imobiliário)', d: 'Fundo que investe em imóveis e distribui os aluguéis aos cotistas. Oferece renda passiva isenta de IR na distribuição.' },
  { t: 'BDR', d: 'Recibo que representa ações de empresas estrangeiras na B3. Permite investir no exterior sem abrir conta fora do país.' },
];

export default function Glossario() {
  const [open, setOpen] = useState(false);
  const [busca, setBusca] = useState('');
  const filtrados = TERMOS.filter((t) => t.t.toLowerCase().includes(busca.toLowerCase()) || t.d.toLowerCase().includes(busca.toLowerCase()));

  return (
    <>
      <button className="glossario-fab" onClick={() => setOpen(true)} title="Glossário Financeiro">
        <span>📖</span>
      </button>
      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal-box" style={{ maxWidth: 560 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>📖 Glossário Financeiro</h3>
              <button className="modal-close" onClick={() => setOpen(false)}>×</button>
            </div>
            <input
              className="glossario-search"
              type="text"
              placeholder="Buscar termo…"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <div className="glossario-list">
              {filtrados.map((item, i) => (
                <div key={i} className="glossario-item">
                  <div className="glossario-term">{item.t}</div>
                  <div className="glossario-def">{item.d}</div>
                </div>
              ))}
              {filtrados.length === 0 && <p style={{ color: 'var(--muted)', fontSize: '.85rem', padding: '12px' }}>Nenhum termo encontrado.</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
